import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import http from "./../services/httpService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [sector, setSector] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [registered, setRegistered] = useState(null);
  const navigate = useNavigate();
  const privacy_policy_url =
    "https://firebasestorage.googleapis.com/v0/b/invicto-nutrition.appspot.com/o/policies%2FPol%C3%ADticas%20de%20Privacidad%20-%20Invicto%20Nutrition.pdf?alt=media&token=6b238cfc-ed79-46bb-b113-ad239a5fa7c7";

  function handleInputChange({ currentTarget: input }) {
    if (input.name === "firstName") return setFirstName(input.value);
    if (input.name === "lastName") return setLastName(input.value);
    if (input.name === "phone") return setPhone(input.value);
    if (input.name === "email") return setEmail(input.value);
    if (input.name === "street") return setStreet(input.value);
    if (input.name === "sector") return setSector(input.value);
    if (input.name === "city") return setCity(input.value);
    if (input.name === "password") return setPassword(input.value);
    if (input.name === "privacyPolicy") {
      if (input.checked) return setPrivacyPolicy(true);
      return setPrivacyPolicy(false);
    }
  }

  async function register(e) {
    e.preventDefault();
    let URL = `${process.env.REACT_APP_API_URL}`;

    if (!privacyPolicy)
      return toast.error("Debe aceptar las politicas de privacidad", {
        position: toast.POSITION.TOP_CENTER,
      });

    let data = {
      first_name: firstName,
      last_name: lastName,
      phone,
      password,
      email,
      address: {
        street,
        sector,
        city,
      },
      privacy_policy: privacyPolicy,
    };

    let response = await http.post(`${URL}/api/signup`, data);

    if (response.status && response.status === 200) {
      setRegistered(true);
      toast.success(response.data, { position: toast.POSITION.TOP_CENTER });
      localStorage.setItem("token", response.headers["x-auth-token"]);

      let coupon = `INVICTO2023`;

      let reply = {
        name: firstName,
        coupon: coupon,
        email,
      };

      await http.post(`${URL}/api/thank-you-for-your-registration`, reply);

      setTimeout(() => {
        setRegistered(null);
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
      <h2>Registrarse</h2>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre/s</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca su nombre"
              name="firstName"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLatsName">
            <Form.Label>Apellido/s</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca su apellido"
              name="lastName"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca su numero de telefono"
              name="phone"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduzca su correo electronico"
              name="email"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introduzca una contraseña"
              name="password"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            placeholder="Introduzca su direccion"
            name="street"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridSector">
            <Form.Label>Sector</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca su sector"
              name="sector"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca su ciudad"
              name="city"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            style={{ display: "inline-block" }}
            type="checkbox"
            label={`Acepto las politicas de privacidad`}
            name="privacyPolicy"
            onChange={(e) => handleInputChange(e)}
          />
          &nbsp;
          <a
            style={{ textDecoration: "none" }}
            target={"_blank"}
            href={privacy_policy_url}
          >
            Politicas de privacidad
          </a>
        </Form.Group>

        <Row>
          <Button className="button" type="submit" onClick={(e) => register(e)}>
            Registrarse&nbsp; {!registered ? null : <Spinner />}
          </Button>
        </Row>
        <Row>
          <Form.Label>Ya tienes una cuenta?</Form.Label>
          <Button
            className="button"
            type="submit"
            onClick={() => navigate("/iniciar-seccion")}
          >
            Iniciar seccion
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

export default SignupForm;
