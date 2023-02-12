import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import axios from "axios";

const Success = (props) => {
  let { orderId } = useParams();
  const [order, setOrder] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  function copyToClipboard(text) {
    let result = copy(text);
    if (result) setSuccess(result);
  }

  async function confirmOrderExistence() {
    let URL = `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/confirm`;
    let token = localStorage.getItem("token");

    let response = await axios.get(URL, { headers: { "x-auth-token": token } });

    if (response.status && response.status === 200) {
      setOrder(orderId);
      return;
    }

    navigate("/");
    return;
  }

  useEffect(() => {
    if (!orderId || orderId === "") return;

    confirmOrderExistence();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  }, [success]);

  return (
    <React.Fragment>
      <div id="success">
        <div className="top">Invicto Nutrition</div>
        <div className="wrap">
          <div className="message_wrap">
            <p className="circle">
              <FontAwesomeIcon
                className="check"
                icon="fa-solid fa-circle-check"
              />
            </p>
            <p className="thanks">Gracias por preferirnos</p>
            <p className="brand">Invicto Nutrition</p>
            <div className="order_num">
              <span>
                Numero de pedido:
                <h3>
                  {order ? order : "Invalido"}&nbsp;&nbsp;
                  {success ? (
                    <p className="clipboard-success">Copiado!</p>
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => copyToClipboard(order)}
                      icon="fa-solid fa-clipboard"
                      className="clipboard"
                      alt={"copy to clipboard"}
                    />
                  )}
                </h3>
              </span>
            </div>
            <div className="info">
              <p>
                El tiempo estimado para la entrega de su pedido es de 24 a 48
                horas, nuestro delivery se estara comunicando con usted durante
                dicho periodo de tiempo con el fin de gestionar el lugar de
                entrega.
              </p>
            </div>
            <div className="button">
              <button onClick={() => navigate("/tienda")}>
                Continuar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Success;
