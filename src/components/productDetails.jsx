import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setFormat } from "../utils/useful";
import SimpleSlider from "./slider";
import store from "../store";
import { add } from "../features/cartSlice";
import http from "./../services/httpService";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetails = (props) => {
  const [merchant, setMerchant] = useState(null);
  const { productId } = useParams();
  const [index, setIndex] = useState(0);
  const [weight, setWeight] = useState({});
  const [weights, setWeights] = useState(null);

  async function getMerchant(productId) {
    let URL = process.env.REACT_APP_API_URL;
    let response = await http.get(`${URL}/api/products/${productId}`);

    setMerchant(response.data);
    setWeights(response.data.weight);
    return;
  }

  function addToCart() {
    if (!weights) return;

    if (weights.length < 1) return;

    let object = {
      index: Number(index),
      _id: merchant._id,
      images: merchant.images,
      name: merchant.name,
      weight: weight,
      brand: merchant.brand,
      quantity: null,
    };
    store.dispatch(add(object));
    toast.success("Articulo agregado al carrito.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return;
  }

  function handleCheckboxChange(e) {
    setIndex(e.currentTarget.value);
  }

  function specifySizeAndFlavor() {
    if (!merchant) return;

    setWeight(merchant.weight[index]);
  }

  useEffect(() => {
    specifySizeAndFlavor();
  }, [index, merchant]);

  useEffect(() => {
    getMerchant(productId);
  }, []);

  return (
    <React.Fragment>
      <br />
      {!merchant ? (
        <div id="product-details-spinner">
          <Spinner />
        </div>
      ) : (
        <div id="product-details">
          <div className="product-details-box">
            <SimpleSlider images={merchant.images} />
          </div>
          <div className="product-details-box content">
            <div>
              <p className="pd-brand">{merchant.brand.name}</p>
              <p className="pd-name">
                {merchant.name}&nbsp;-&nbsp;{merchant.weight[index].weight}
                &nbsp;
                {merchant.weight[index].measure}
              </p>
            </div>
            <div>
              <span className="pd-description-title">Descripcion</span>
              <p className="pd-description">{merchant.description}</p>
            </div>
            <div>
              <span className="pd-category-title">Categoria</span>
              <p className="pd-category">{merchant.category.name}</p>
            </div>
            <div>
              <span className="pd-category-title">Tamaños & Sabores</span>
              {!weights ? (
                <Spinner />
              ) : (
                <p className="pd-sizeAndFlavors">
                  {weights.length < 1 ? (
                    <p>Producto no disponible.</p>
                  ) : (
                    weights.map((m, idx) => (
                      <span key={idx} id="span-choice">
                        <input
                          type="radio"
                          name="weight"
                          id={idx}
                          value={idx}
                          checked={Number(index) === Number(idx) && true}
                          onChange={(e) => handleCheckboxChange(e)}
                          disabled={m.quantity < 1 && true}
                        />
                        &nbsp;
                        <label htmlFor={idx}>
                          {m.weight}&nbsp;{m.measure}&nbsp;-&nbsp;
                          <span>{m.flavor}</span>
                        </label>
                      </span>
                    ))
                  )}
                </p>
              )}
            </div>
            <div>
              <span className="pd-price-title">RD$&nbsp;</span>
              <p className="pd-price">
                {setFormat(merchant.weight[index].price)}
              </p>
            </div>
            <div>
              <button className="pd-add-to-cart-btn" onClick={addToCart}>
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                &nbsp;Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
      <br />
    </React.Fragment>
  );
};

export default ProductDetails;
