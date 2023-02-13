import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./cart-item";
import store from "../store";
import { setFormat } from "../utils/useful";
import { getSubtotal } from "../features/cartSlice";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const Cart = (props) => {
  const navigateTo = useNavigate();
  const [products, setProducts] = useState(store.getState().cartReducer.value);
  const [subtotal, setSubtotal] = useState(
    store.getState().cartReducer.subtotal
  );

  store.subscribe(() => {
    setProducts(store.getState().cartReducer.value);
    setSubtotal(store.getState().cartReducer.subtotal);
  });

  function go_to_checkout() {
    let AUTH_TOKEN = localStorage.getItem("token");

    if (!AUTH_TOKEN || AUTH_TOKEN === "")
      return toast.info("Debes iniciar seccion o registrarte");

    let decoded = jwtDecode(AUTH_TOKEN);

    if (!decoded._id || decoded._id === "")
      return toast.info("Debes iniciar seccion o registrarte");

    let products = store.getState().cartReducer.value;
    if (products.length < 1)
      return toast.info("Debes agregar al menos un articulo al carrito", {
        position: toast.POSITION.TOP_CENTER,
      });
    return navigateTo("/checkout");
  }

  useEffect(() => {
    store.dispatch(getSubtotal());
  }, [products]);

  return (
    <React.Fragment>
      <div id="cart">
        <h2>Carrito</h2>
        <ul className="cartContainer">
          {products.length < 1 ? (
            <p>No hay articulos en el carrito</p>
          ) : (
            products.map((p) => (
              <CartItem
                key={p._id}
                id={p._id}
                name={p.name}
                images={p.images}
                brand={p.brand}
                quant={p.quantity}
                weight={p.weight}
              />
            ))
          )}
        </ul>
        <div>
          <button onClick={go_to_checkout} className="pay">
            Pagar
          </button>
          &nbsp; &nbsp;{" "}
          <span className="subtotal">Subtotal RD$ {setFormat(subtotal)}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
