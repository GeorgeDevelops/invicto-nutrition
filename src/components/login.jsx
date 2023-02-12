import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import http from "../services/httpService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import store from "../store";
import jwtDecode from "jwt-decode";
import { getLoginUser } from "../features/userSlice";
import { ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(null);
  const navigate = useNavigate();

  function handleInputChange({ currentTarget: input }) {
    if (input.name === "email") return setEmail(input.value);
    if (input.name === "password") return setPassword(input.value);
  }

  async function login(e) {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/api`;

    let data = {
      password,
      email,
    };

    let response = await http.post(`${url}/login`, data);

    if (response.status && response.status === 200) {
      setIsLogin(true);
      toast.success(response.data, { position: toast.POSITION.TOP_CENTER });
      localStorage.setItem("token", response.headers["x-auth-token"]);

      let decoded = jwtDecode(response.headers["x-auth-token"]);

      let user = await http.get(`${url}/users/${decoded._id}`, {
        headers: { "x-auth-token": response.headers["x-auth-token"] },
      });

      store.dispatch(getLoginUser(user.data));

      setTimeout(() => {
        setIsLogin(null);
        return navigate("/");
      }, 2000);
    }
  }

  return (
    <div id={"signup"}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <h2>Iniciar seccion</h2>
      <Form>
        <Row className="mb-3">
          <Form.Group controlId="formGridEmail">
            <Form.Label>Correo Elctronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduzca su correo electronico"
              name="email"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introduzca una contraseña"
              name="password"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
        </Row>

        <Row>
          <Button className="button" type="submit" onClick={(e) => login(e)}>
            Iniciar seccion&nbsp; {!isLogin ? null : <Spinner />}
          </Button>
        </Row>
        <Row>
          <Form.Label>No tienes una cuenta?</Form.Label>
          <Button
            className="button"
            type="submit"
            onClick={() => navigate("/registrarse")}
          >
            Registrarse
          </Button>
        </Row>
        <br />
        <Row>
          <Button className="button" onClick={(e) => navigate("/")}>
            Regresar
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
