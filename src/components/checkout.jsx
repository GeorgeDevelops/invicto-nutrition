import React, { useEffect, useState } from "react";
import store from "../store";
import { setFormat } from "../utils/useful";
import http from "./../services/httpService";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { emptyCart } from "../features/cartSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Checkout = (props) => {
  const [merchants, setMerchants] = useState([]);
  const [user, setUser] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  const [spinner, setSpinner] = useState(null);
  const [applying, setApplying] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  async function handleNewOrder(data, payment_details) {
    let url = `${API}/api/orders/new`;
    let emailUrl = `${API}/api/thank-you-for-your-purchase`;
    let cart = [];
    setSpinner(true);
    let user = store.getState().userSlice.value;

    function calculateData() {
      return new Promise((resolve, reject) => {
        data.forEach((merchant) => {
          let m = _.pick(merchant, ["_id", "quantity", "index", "weight"]);
          cart.push(m);
          if (cart.length === data.length) return resolve(cart);
        });
      });
    }

    let result = await calculateData();

    let token = localStorage.getItem("token");
    let decoded = jwtDecode(token);

    let details = {
      customerId: decoded._id,
      content: result,
      payment_details,
    };

    let response = await http.post(url, details);

    if (response.status && response.status === 200) {
      setSpinner(true);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      let id = response.data.order_details.orderId;

      let purchase_details = {
        email: user.email,
        orderId: id,
        name: user.first_name,
      };

      await http.post(emailUrl, purchase_details);

      store.dispatch(emptyCart());

      return navigate(`/success/${id}`);
    }
  }

  async function createOrder(data) {
    return new Promise(async (resolve, reject) => {
      let url = `${API}/api/paypal/create-order`;
      let cart = [];

      function calculateData() {
        return new Promise((resolve, reject) => {
          data.forEach((merchant) => {
            let m = _.pick(merchant, ["_id", "quantity", "index"]);
            cart.push(m);
            if (cart.length === data.length) return resolve(cart);
          });
        });
      }

      let result = await calculateData();

      let token = localStorage.getItem("token");

      let details = {
        content: result,
      };

      let response = await http.post(url, details, {
        headers: { "x-auth-token": token },
      });
      if (response.status && response.status === 200) resolve(response.data.id);
    });
  }

  async function capturePayment(orderId) {
    let url = `${API}/api/paypal/capture-payment`;
    let token = localStorage.getItem("token");

    let details = { orderId: orderId };

    let response = await http.post(url, details, {
      headers: { "x-auth-token": token },
    });

    if (
      response.status &&
      response.status === 200 &&
      response.data.status === "COMPLETED"
    ) {
      handleNewOrder(merchants, response.data);
    }
  }

  async function getUser() {
    let AUTH_TOKEN = localStorage.getItem("token");

    if (!AUTH_TOKEN || AUTH_TOKEN === "") return navigate("/iniciar-seccion");

    let decoded = jwtDecode(AUTH_TOKEN);

    if (!decoded._id || decoded._id === "") return navigate("/iniciar-seccion");

    let URL = `${API}/api/users/${decoded._id}`;

    let headers = { headers: { "x-auth-token": AUTH_TOKEN } };

    let response = await http.get(URL, headers);

    if (response.status && response.status === 200) {
      setUser(response.data);
    }
  }

  async function handlePromotionApplication() {
    setApplying(true);

    let URL = `${API}/api/promotions/${promoCode}`;

    let AUTH_TOKEN = localStorage.getItem("token");

    if (!AUTH_TOKEN || AUTH_TOKEN === "") {
      toast.info("Intentelo nuevamente.");
      setApplying(null);
      return;
    }

    let headers = { headers: { "x-auth-token": AUTH_TOKEN } };

    let response = await http.get(URL, headers);

    if (response.status && response.status === 200) {
      setApplying(null);

      setPromo(response.data.promotion);

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      setPromoCode("");
      return;
    }

    setPromoCode("");
    setApplying(null);
    return;
  }

  store.subscribe(() => {
    setMerchants(store.getState().cartReducer.value);
    setSubtotal(store.getState().cartReducer.subtotal);
  });

  useEffect(() => {
    let cart = store.getState().cartReducer.value;
    if (cart.length < 1) return navigate("/tienda");
  }, []);

  useEffect(() => {
    getUser();
    setMerchants(store.getState().cartReducer.value);
    setSubtotal(store.getState().cartReducer.subtotal);
  }, []);

  return (
    <React.Fragment>
      <div id="checkout">
        <div className="checkout-content">
          <div className="purchaseContent">
            <div className="title_holder">
              <h3>resumen del carrito</h3>
            </div>
            <div>
              <ul>
                {merchants.length < 1
                  ? null
                  : merchants.map((merchant) => (
                      <li key={merchant._id}>
                        <p>
                          {merchant.name} - {merchant.weight.weight}&nbsp;
                          {merchant.weight.measure}
                        </p>
                        <p style={{ textTransform: "lowercase" }}>
                          x{merchant.quantity}
                        </p>
                        <p>RD${setFormat(merchant.weight.price)}</p>
                      </li>
                    ))}
              </ul>
            </div>
            <div className="subtotal">
              <p>Subtotal RD$ {subtotal}</p>
            </div>
          </div>
          <div className="paymentMethods">
            <div id="shipping_address">
              <h3>Informacion de envio</h3>
              {!user ? null : (
                <ul
                  style={{
                    color: "#616a6b",
                    listStyle: "none",
                    fontFamily: "Regular",
                  }}
                >
                  <li>{`${user.first_name} ${user.last_name}`}</li>
                  <li>{user.phone}</li>
                  <li>{user.email}</li>
                  <li>{user.address.street}</li>
                  <li>{user.address.sector}</li>
                  <li>{user.address.city}</li>
                </ul>
              )}
            </div>
            <div id="promotions">
              <Form>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="Codigo de promocion"
                      type="text"
                      onChange={(e) => setPromoCode(e.currentTarget.value)}
                      value={promoCode}
                    />
                  </Col>
                  <Col>
                    <Button id="apply_btn" onClick={handlePromotionApplication}>
                      {applying ? <Spinner /> : "Aplicar"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="payment-methods">
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.REACT_APP_CLIENT_ID,
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={async (data, actions) => {
                    let orderID = await createOrder(merchants);
                    return orderID;
                  }}
                  onApprove={async (data, actions) => {
                    capturePayment(data);
                  }}
                />
              </PayPalScriptProvider>
            </div>
            <div>
              {spinner ? <Spinner /> : null}
              {/* <button
                onClick={() => handleOrderCreation(merchants)}
                className="placeOrderButton"
              >
                Realizar pedido&nbsp;{spinner ? <Spinner /> : null}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
