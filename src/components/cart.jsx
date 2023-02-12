import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./cart-item";
import store from "../store";
import { setFormat } from "../utils/useful";
import { getSubtotal } from "../features/cartSlice";

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
    let products = store.getState().cartReducer.value;
    if (products.length < 1) return;
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
