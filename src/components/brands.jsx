import React from "react";
import muscletech from "./../images/muscletech-logo.png";
import ruleOne from "./../images/ruleone.png";
import dymatize from "./../images/dymatize.png";
import patriot from "./../images/patriot.png";
import musclePhram from "./../images/musclephram.png";
import on from "./../images/optimum-nutrition.png";
import cellucor from "./../images/cellucor.png";
import bodyFortress from "./../images/bodyFortress.png";
import store from "../store";
import { addFilter } from "../features/productFilterSlice";
import { useNavigate } from "react-router-dom";

const Brands = (props) => {
  const navigateTo = useNavigate();

  function filterByBrand(e) {
    let filters = store.getState().productFilter.value;
    if (filters.length > 2 && filters.length < 4) return;
    store.dispatch(addFilter({ id: e.target.id, name: e.target.alt.trim() }));
    return navigateTo("/tienda");
  }

  return (
    <React.Fragment>
      <div id="brands">
        <h2>Marcas</h2>
        <div className="brandsContainer">
          <img
            src={muscletech}
            onClick={(e) => filterByBrand(e)}
            id={4}
            alt="Muscletech"
          />
          <img
            src={ruleOne}
            onClick={(e) => filterByBrand(e)}
            id={5}
            alt="Rule 1 Proteins"
          />
          <img
            src={dymatize}
            onClick={(e) => filterByBrand(e)}
            id={6}
            alt="Dymatize"
          />
          <img
            src={patriot}
            onClick={(e) => filterByBrand(e)}
            id={11}
            alt="Patriot Nutrition"
          />
          <img
            src={musclePhram}
            onClick={(e) => filterByBrand(e)}
            id={10}
            alt="Muscle Phram"
          />
          <img
            src={on}
            id={7}
            onClick={(e) => filterByBrand(e)}
            alt="Optimum Nutrition"
          />
          <img
            src={cellucor}
            onClick={(e) => filterByBrand(e)}
            id={8}
            alt="Cellucor"
          />
          <img
            src={bodyFortress}
            onClick={(e) => filterByBrand(e)}
            id={9}
            alt="Body Fortress"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Brands;
