import React, { useEffect, useState } from "react";
import Welcome from "./welcome.jsx";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import http from "../services/httpService.js";
import Card from "./card.jsx";

const Feed = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  async function getProducts() {
    let url = `${URL}/api/products`;

    let response = await http.get(url);

    if (response.status && response.status === 200) {
      setProducts(response.data);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <div className="landingPageImage">
        <Welcome />
      </div>
      <div className="ourProductsBanner">
        <h2>nuestros productos</h2>
      </div>
      <div>
        {!products ? (
          <Spinner className="m-auto" />
        ) : (
          <div className="productsWrap">
            {products.length < 1 ? (
              <p>No hay productos disponibles</p>
            ) : (
              products.map((product) => (
                <Card
                  id={product._id}
                  key={product._id}
                  images={product.images}
                  name={product.name}
                  weight={product.weight}
                  brand={product.brand}
                />
              ))
            )}
          </div>
        )}
      </div>
      <div className="ropesShakeBanner">
        <div className="ropesShakeContent">
          <h2>Invicto Nutrition</h2>
          <h3>Obten 10% de descuento en tu primera compra.</h3>
          <p>
            *Solo debes ingresar a nuestra tienda virtual o pagina web y hacer
            tu primera compra, si no tiene una cuenta con nosotros haga click en
            el siguiente enlace{" "}
            <span
              style={{ color: "#00FF19", cursor: "pointer" }}
              onClick={() => navigate("/registrarse")}
            >
              REGISTRATE
            </span>
            *
          </p>
        </div>
        <div className="ropesShakeOpacityShell"></div>
      </div>
    </React.Fragment>
  );
};

export default Feed;
