import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResultItem = ({ id, images, name, brand, weight, searching }) => {
  const navigateTo = useNavigate();

  function handleClick() {
    searching(null);
    navigateTo(`/productos/${id}/detalles`);
  }

  return (
    <React.Fragment>
      <li className="searchResultItem" id={id} onClick={handleClick}>
        <div className="wrapper">
          <img src={images[0].url} alt="Product Image" />
          <div>
            <p>{brand.name}</p>
            <p>{name}</p>
            <p>
              {weight[0].weight}&nbsp;{weight[0].measure}
            </p>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default SearchResultItem;
