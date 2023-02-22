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
import mio from "./../images/Mio-logo.png";
import { v4 } from "uuid";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./checkoutForm";

// const stripePromise = loadStripe(
//   "pk_test_51MBTikFgUifPBWavCWOyEaBFwHguoy9EWCdFdjDgEV2EWwI3pxoOzUZee8hBMzl6AMaQWMj6I6N2GAwgtZLaXZu900VAsV1BbR"
// );
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
  // const [clientSecret, setClientSecret] = useState("");

  function calculateData(data) {
    return new Promise((resolve, reject) => {
      let cart = [];

      data.forEach((merchant) => {
        let m = _.pick(merchant, ["_id", "quantity", "index", "weight"]);
        cart.push(m);
        if (cart.length === data.length) return resolve(cart);
      });
    });
  }

  async function sendEmail(purchase_details) {
    await http.post(`${API}/api/thank-you-for-your-purchase`, purchase_details);
  }

  async function handleNewOrder(data, payment_details, paid) {
    setSpinner(true);

    let result = await calculateData(data);

    let details = {
      customerId: user._id,
      content: result,
      paid,
      payment_details,
      promotionId: !promo ? null : promo._id,
    };

    let response = await http.post(`${API}/api/orders/new`, details);

    if (response && response.status && response.status === 200) {
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

      sendEmail(purchase_details);

      store.dispatch(emptyCart());

      return navigate(`/success/${id}`);
    }
  }

  async function createOrder(data) {
    let url = `${API}/api/paypal/create-order`;

    let result = await calculateData(data);

    let AUTH_TOKEN = localStorage.getItem("token");

    let details = {
      content: result,
    };

    let response = await http.post(url, details, {
      headers: { "x-auth-token": AUTH_TOKEN },
    });

    if (response.status && response.status === 200) return response.data.id;
  }

  async function capturePayment(orderId) {
    setSpinner(true);
    let url = `${API}/api/paypal/capture-payment`;
    let token = localStorage.getItem("token");

    let details = { orderId: orderId };

    let response = await http.post(url, details, {
      headers: { "x-auth-token": token },
    });

    if (response.status && response.data.status !== "COMPLETED") {
      return toast.error("Entidad no pudo ser procesada.");
    } else {
      response.data.source = "Paypal";

      handleNewOrder(merchants, response.data);
      return;
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
    if (promo)
      return toast.info("No puedes aplicar mas de una promocion.", {
        position: toast.POSITION.TOP_CENTER,
      });

    setApplying(true);

    let AUTH_TOKEN = localStorage.getItem("token");

    if (!AUTH_TOKEN || AUTH_TOKEN === "") {
      toast.info("Intentelo nuevamente.");
      setApplying(null);
      return;
    }

    let decoded = jwtDecode(AUTH_TOKEN);

    if (!decoded._id || decoded._id === "") {
      toast.info("Intentelo nuevamente.");
      setApplying(null);
      return;
    }

    let customerId = decoded._id;

    let URL = `${API}/api/promotions/${promoCode}/${customerId}`;

    let headers = { headers: { "x-auth-token": AUTH_TOKEN } };

    let response = await http.get(URL, headers);

    if (response.status && response.status === 200) {
      setApplying(null);

      setPromo(response.data.promotion[0]);

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

  function orderNowPayLater() {
    let sure = window.confirm("Deseas ordenar ahora y pagar mas tarde?");

    if (!sure) return;

    let payment_id = v4();

    let details = {
      id: payment_id,
      status: "PENDING",
      source: "Mio",
    };

    handleNewOrder(merchants, details, false);

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

  // async function createPaymentIntent() {
  //   let url = `${API}/api/create-payment-intent`;
  //   fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: merchants }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }

  // useEffect(() => {
  //   if (merchants.length < 1) return;
  //   createPaymentIntent();
  // }, [merchants]);

  // const appearance = {
  //   theme: "night",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

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
              <p>Envio RD$ 250</p>
              {promo && (
                <p>
                  Promocion aplicada {`(${promo.name})`} -$
                  {(promo.discount / 100) * subtotal}
                </p>
              )}
              <p>
                Total a pagar RD${" "}
                {!promo
                  ? subtotal + 250
                  : subtotal - (promo.discount / 100) * subtotal + 250}
              </p>
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
              {/* {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )} */}
              <button id="submit" onClick={orderNowPayLater}>
                Ordenar ahora, Pagar mas tarde&nbsp;|&nbsp;
                <img src={mio} width={"40px"} alt="Mio" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
