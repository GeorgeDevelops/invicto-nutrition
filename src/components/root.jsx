import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navegation from "./navegation";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Root = (props) => {
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/iniciar-seccion");
    return;
  }

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <div className="top" onClick={goToLogin}>
        Registrate o Ingresa aqui - Obten un 10% de descuento por tu primera
        compra
      </div>
      <Navegation />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Root;
