import React, { useEffect, useState } from "react";
import Welcome from "./welcome.jsx";
import Cards from "./cards.jsx";
import store from "../store.js";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Feed = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(
    store.getState().productsSlice.value
  );

  store.subscribe(() => {
    setProducts(store.getState().productsSlice.value);
  });

  useEffect(() => {
    setProducts(store.getState().productsSlice.value);
  }, []);

  return (
    <React.Fragment>
      <div className="landingPageImage">
        <Welcome />
      </div>
      <div className="ourProductsBanner">
        <h2>nuestros productos</h2>
      </div>
      <div className="productsWrap">
        {products.length < 1 ? (
          <Spinner />
        ) : (
          products.map((product) => (
            <Cards
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
