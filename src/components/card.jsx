import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "./../store";
import { add } from "../features/cartSlice";
import { setFormat } from "../utils/useful";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Card = ({ id, images, weight, name, brand }) => {
  const navigateTo = useNavigate();
  const [available, setAvailable] = useState(0);

  function getStock() {
    weight.forEach((w) => {
      setAvailable(available + w.quantity);
    });
  }

  function addToCart(e) {
    if (available < 1)
      return toast.error("Producto no disponible (Out of stock)", {
        position: toast.POSITION.TOP_CENTER,
      });

    const _id = e.currentTarget.id;
    let object = {
      index: 0,
      _id,
      images,
      name,
      weight: weight[0],
      brand,
      quantity: null,
    };

    store.dispatch(add(object));
    toast.success("Articulo agregado al carrito.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return;
  }

  function goToProductDetail(e) {
    navigateTo(`/productos/${e.currentTarget.id}/detalles`);
    return;
  }

  useEffect(() => {
    getStock();
  }, []);

  return (
    <div
      className="card"
      id={id}
      name="detail"
      onClick={(e) => goToProductDetail(e)}
    >
      {available < 1 ? (
        <div className="OutOfStockLabel">
          <p>Out of Stock</p>
        </div>
      ) : null}

      <div className="image-wrap">
        <img id="card-image" src={images[0].url} alt="Image" />
      </div>

      <div className="info">
        <p className="bold">{name}</p>
        <p>
          {weight[0].weight}&nbsp;{weight[0].measure}
        </p>
        <p>RD$ {setFormat(weight[0].price)}.00</p>
      </div>

      <button
        className="cart-button"
        id={id}
        onClick={(e) => addToCart(e)}
        name={"button"}
      >
        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" name={"cart"} />
      </button>
    </div>
  );
};

export default Card;
