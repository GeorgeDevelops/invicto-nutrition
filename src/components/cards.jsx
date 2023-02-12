import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "./../store";
import { add } from "../features/cartSlice";
import { setFormat } from "../utils/useful";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Cards({ id, images, weight, name, brand }) {
  const navigateTo = useNavigate();
  const [available, setAvailable] = useState(0);

  function getStock() {
    weight.forEach((w) => {
      setAvailable(available + w.quantity);
    });
  }

  function addToCart(e) {
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
    <Card
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
      <Card.Img variant="top" className="cardImage" src={images[0].url} />
      <Card.Body>
        <Card.Title className="productName">{name}</Card.Title>
        <Card.Text className="amount">
          {weight[0].weight}&nbsp;{weight[0].measure}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item id="price">
          RD$ {setFormat(weight[0].price)}.00
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="priceAndCartHolder">
        <button
          className="cart-button"
          id={id}
          onClick={(e) => addToCart(e)}
          name={"button"}
        >
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" name={"cart"} />
        </button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
