import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import store from "../store";
import http from "../services/httpService";
import { toast } from "react-toastify";
import { getLoginUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
let url = process.env.REACT_APP_API_URL;

const EditProfile = ({ showPopUp }) => {
  const API = process.env.REACT_APP_API_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [sector, setSector] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  async function saveChanges() {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      address: {
        street: address,
        sector,
        city,
      },
    };

    let token = localStorage.getItem("token");

    let response = await http.put(`${url}/api/users/${id}/update`, data, {
      headers: { "x-auth-token": token },
    });

    if (response.status && response.status === 200) {
      toast.success(response.data, { position: toast.POSITION.TOP_CENTER });

      let res = await http.get(`${url}/api/users/${id}`, {
        headers: { "x-auth-token": token },
      });

      store.dispatch(getLoginUser(res.data));

      setTimeout(() => {
        showPopUp[1](null);
      }, 1000);
    }
    return;
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
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setAddress(response.data.address.street);
      setSector(response.data.address.sector);
      setCity(response.data.address.city);
      setId(response.data._id);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return !showPopUp[0] ? null : (
    <React.Fragment>
      <div className="edit">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre/s</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido/s</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              value={phone}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              value={address}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sector</Form.Label>
            <Form.Control
              onChange={(e) => setSector(e.target.value)}
              type="text"
              value={sector}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              onChange={(e) => setCity(e.target.value)}
              type="text"
              value={city}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button onClick={saveChanges} className="mt-3" variant="primary">
          Guardar
        </Button>
        <Button
          onClick={() => showPopUp[1](null)}
          className="mt-3"
          variant="danger"
        >
          Cerrar
        </Button>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;
