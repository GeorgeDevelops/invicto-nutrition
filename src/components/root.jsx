import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navegation from "./navegation";
import httpService from "../services/httpService";
import store from "../store";
import { addProducts } from "../features/productsSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getLoginUser } from "../features/userSlice";
import jwtDecode from "jwt-decode";
import http from "../services/httpService";
let url = process.env.REACT_APP_API_URL;

const Root = (props) => {
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  async function getUser() {
    let token = localStorage.getItem("token");
    if (!token || token === "") return;
    let decoded = jwtDecode(token);

    if (!decoded._id) return;

    let response = await http.get(`${url}/api/users/${decoded._id}`, {
      headers: { "x-auth-token": token },
    });

    if (!response.status) return;

    store.dispatch(getLoginUser(response.data));
    return;
  }

  function goToLogin() {
    navigate("/iniciar-seccion");
    return;
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    httpService.get(`${API}/api/products`).then((response) => {
      store.dispatch(addProducts(response.data));
    });
  }, []);

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
