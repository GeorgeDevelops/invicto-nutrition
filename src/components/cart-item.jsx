import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { remove, update } from "../features/cartSlice";
import store from "../store";
import { setFormat } from "../utils/useful";

const CartItem = ({ id, name, images, brand, quant, weight }) => {
  const [quantity, setQuantity] = useState(quant);
  ////
  function handleCartItemDeletion(e) {
    let _id = e.currentTarget.id;
    store.dispatch(remove({ _id }));
    return;
  }

  function handleDecrement() {
    if (quantity < 2) return;
    setQuantity(quantity - 1);
    return;
  }

  function handleQuantityChange() {
    store.dispatch(update({ _id: id, quantity }));
  }

  useEffect(() => {
    handleQuantityChange();
  }, [quantity]);

  return (
    <li id="cartItem">
      <div className="productInfo">
        {images ? <img src={images[0].url} alt="product image" /> : null}
        <div>
          <p className="brand">{brand.name}</p>
          <p>
            {name}&nbsp;-&nbsp;{weight.weight}&nbsp;{weight.measure}
          </p>
          <p className="pounds">RD$ {setFormat(weight.price)}</p>
        </div>
      </div>
      <div className="amountControl">
        <div>
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>
      <div className="actions">
        <button id={id} onClick={(e) => handleCartItemDeletion(e)}>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
