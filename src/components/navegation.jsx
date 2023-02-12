import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import store from "../store";
import { addFilter } from "../features/productFilterSlice";
import SearchResultItem from "./searchResultItem";
import jwtDecode from "jwt-decode";
import http from "./../services/httpService";
import logo from "./../images/invicto-logo-gray.png";

export default function Navegation() {
  const [isSearching, setIsSearching] = useState(false);
  const navigateTo = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(store.getState().userSlice.value);
  const [search, setSearch] = useState("");
  const [searchResultPreview, setSearchResultPreview] = useState([]);

  function filterByCategory(e) {
    let filters = store.getState().productFilter.value;
    if (filters.length > 2 && filters.length < 4) return;
    store.dispatch(
      addFilter({ id: e.target.id, name: e.target.innerText.trim() })
    );
    return navigateTo("/tienda");
  }

  async function handleSearchChange({ currentTarget: input }) {
    setSearch(input.value);
    let URL = process.env.REACT_APP_API_URL;

    if (input.value === "") return setSearchResultPreview([]);

    let matched = [];
    let { data } = await http.get(`${URL}/api/products`);

    data.forEach((product) => {
      let name = product.name.toLowerCase();
      let match = name.includes(input.value.toLowerCase());
      if (match) matched.push(product);
    });
    return setSearchResultPreview(matched);
  }

  store.subscribe(() => {
    setCart(store.getState().cartReducer.value);
  });

  useEffect(() => {
    let AUTH_TOKEN = localStorage.getItem("token");
    if (!AUTH_TOKEN || AUTH_TOKEN === "") return;
    let decoded = jwtDecode(AUTH_TOKEN);
    setUser(decoded);
  }, []);

  useEffect(() => {
    setCart(store.getState().cartReducer.value);
  }, []);

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            className="title"
            onClick={() => (window.location = "/")}
          >
            <img src={logo} width="40px" alt="Invicto Nutrition Logo" />
            &nbsp; Invicto Nutrition
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto m-auto">
              <Nav.Link
                onClick={() => navigateTo("/")}
                className="textTransform"
              >
                Inicio
              </Nav.Link>
              <NavDropdown title="Categorias" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => navigateTo("/tienda")}
                  className="textTransform"
                >
                  proteinas
                </NavDropdown.Item>
                <NavDropdown.Item
                  id={15}
                  onClick={(e) => filterByCategory(e)}
                  className="textTransform"
                >
                  vitaminas & suplementos
                </NavDropdown.Item>
                <NavDropdown.Item
                  id={1}
                  onClick={(e) => filterByCategory(e)}
                  className="textTransform"
                >
                  accesorios
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                onClick={() => navigateTo("/tienda")}
                className="textTransform"
              >
                tienda
              </Nav.Link>
              <Nav.Link
                onClick={() => navigateTo("/marcas")}
                className="textTransform"
              >
                marcas
              </Nav.Link>
              <Nav.Link
                onClick={() => navigateTo("/contacto")}
                className="textTransform"
              >
                contacto
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                {isSearching ? (
                  <FontAwesomeIcon
                    onClick={() => setIsSearching(false)}
                    icon="fa-solid fa-xmark"
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={() => setIsSearching(true)}
                    icon="fa-solid fa-magnifying-glass"
                  />
                )}
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <FontAwesomeIcon
                  onClick={() => navigateTo("/perfil")}
                  icon="fa-solid fa-user"
                />
                &nbsp;
                {user.firstName && `${user.firstName}`}
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <FontAwesomeIcon
                  onClick={() => navigateTo("/carrito")}
                  icon="fa-solid fa-cart-shopping"
                />
                &nbsp;
                <span>{cart.length}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isSearching ? (
        <div className="navbar-search">
          <div className="wrap">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Que estas buscando?..."
              value={search}
              onChange={(e) => handleSearchChange(e)}
            />
            <div>
              Buscar &nbsp;
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </div>
          </div>
          <ul>
            <li className="results">
              Resultados de busqueda {searchResultPreview.length}
            </li>
            {searchResultPreview.length < 1
              ? null
              : searchResultPreview.map((product) => (
                  <SearchResultItem
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    brand={product.brand}
                    images={product.images}
                    weight={product.weight}
                    searching={setIsSearching}
                  />
                ))}
          </ul>
        </div>
      ) : null}
    </React.Fragment>
  );
}
