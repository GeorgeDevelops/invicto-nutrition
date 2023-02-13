import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import EditProfile from "./edit-profile";
import store from "../store";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import http from "../services/httpService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const API = process.env.REACT_APP_API_URL;
  const [showPopUp, setShowPopUp] = useState(null);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(null);
  const navigate = useNavigate();

  function logout() {
    setLoggingOut(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Esta seccion ya ha sido cerrada.");
      return (window.location = "/");
    }

    localStorage.removeItem("token");
    toast.info("Seccion cerrada, redirigiendo...");

    return setTimeout(() => {
      setLoggingOut(null);
      window.location = "/";
    }, 2000);
  }

  store.subscribe(() => {
    setUser(store.getState().userSlice.value);
  });

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

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <React.Fragment>
      {!user ? (
        <span style={{ padding: "50px" }}>
          "Cargando..."&nbsp;
          <Spinner />
        </span>
      ) : (
        <>
          <EditProfile showPopUp={[showPopUp, setShowPopUp]} />
          <Alert variant="success" className="mt-4 profileHolder">
            <Alert.Heading>
              Hola,&nbsp;{`${user.first_name} ${user.last_name}`}
            </Alert.Heading>
            <p>
              <strong>Correo:&nbsp;</strong>
              {user.email}
            </p>
            <p>
              <strong>Telefono:&nbsp;</strong>
              {user.phone}
            </p>
            <p>
              <strong>Direccion:&nbsp;</strong>
              {`${user.address.street} ${user.address.sector}`}
            </p>
            <p>
              <strong>Ciudad:&nbsp;</strong>
              {user.address.city}
            </p>
            <hr />
            <p className="mb-0">
              <button id="edit-profile-btn" onClick={() => setShowPopUp(true)}>
                editar datos de cuenta
              </button>
              &nbsp;
              <button
                id="update-btn"
                onClick={() => setUser(store.getState().userSlice.value)}
              >
                Actualizar
              </button>
              &nbsp;
              <button id="logout-btn" onClick={logout}>
                Cerrar seccion&nbsp;{loggingOut ? <Spinner /> : null}
              </button>
            </p>
          </Alert>
        </>
      )}
    </React.Fragment>
  );
}

export default ProfileInfo;
