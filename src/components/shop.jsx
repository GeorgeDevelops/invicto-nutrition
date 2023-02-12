import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../features/productFilterSlice";
import store from "../store";
import Cards from "./cards";
import OffCanvasFilter from "./offcanvas-filter";
import { setFormat } from "../utils/useful";
import http from "../services/httpService";
import { Spinner } from "react-bootstrap";

const Shop = (props) => {
  const [filters, setFilters] = useState([]);
  const [range, setRange] = useState(9000);
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [products, setProducts] = useState(
    store.getState().productsSlice.value
  );

  store.subscribe(() => {
    setFilters(store.getState().productFilter.value);
  });

  function handleAddFilter(e) {
    let filters = store.getState().productFilter.value;
    if (filters.length > 2 && filters.length < 4) return;
    dispatch(addFilter({ id: e.target.id, name: e.target.innerText.trim() }));
  }

  function handleRemoveFilter(e) {
    dispatch(
      removeFilter({ id: e.target.id, name: e.target.innerText.trim() })
    );
  }

  function handleRangeChange(e) {
    setRange(e.target.value);
  }

  function filterByPrice(products) {
    let matched = [];
    if (range === 9000) return setContent(products);
    products.forEach((p) => {
      if (p.weight[0].price <= range) matched.push(p);
    });
    setContent(matched);
  }

  function filterByCategory(products) {
    let matched = [];
    if (filters.length < 1) return filterByPrice(products);

    for (let i = 0; i < filters.length; i++) {
      products.forEach((p) => {
        let filterID = Number(filters[i].id);

        if (filterID === p.brand.id) matched.push(p);

        if (filterID === p.category.id) matched.push(p);
      });
    }
    filterByPrice(matched);
  }

  async function getProducts() {
    let url = `${process.env.REACT_APP_API_URL}/api/products`;

    let response = await http.get(url);

    if (response.status && response.status === 200) {
      setProducts(response.data);
      return;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterByCategory(products);
  }, [range, filters]);

  useEffect(() => {
    setFilters(store.getState().productFilter.value);
  }, []);

  function handleResize() {
    setPageWidth(window.innerWidth);
  }

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [deviceWidth]);

  return (
    <React.Fragment>
      <div id="shop">
        <h2>
          Tienda&nbsp;-&nbsp;
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon="fa-solid fa-arrows-rotate"
            onClick={getProducts}
          />
        </h2>
        <div className="toolbar">
          {filters.length < 1
            ? null
            : filters.map((filter) => (
                <span
                  key={filter.id}
                  id={filter.id}
                  name={filter.accessories}
                  onClick={(e) => handleRemoveFilter(e)}
                >
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
                  &nbsp;&nbsp;
                  {filter.name}
                </span>
              ))}
        </div>
        <div className="contentWrap">
          {pageWidth <= 815 && <OffCanvasFilter />}
          <aside id="sidebar">
            <div className="priceFilter">
              <label htmlFor="price_range">Filtrar por precio</label>
              <input
                type="range"
                min={0}
                max={9_000}
                value={range}
                onChange={(e) => handleRangeChange(e)}
                name="price_range"
                id="price_range"
              />
              <p>RD$0 - RD${setFormat(range)}</p>
            </div>
            <div className="productCategory">
              <h3>Categorias de productos</h3>
              <ul>
                <li onClick={(e) => handleAddFilter(e)} id={1}>
                  Accesorios
                </li>
                <li onClick={(e) => handleAddFilter(e)} id={2}>
                  Aminoacidos
                </li>
                <li onClick={(e) => handleAddFilter(e)} id={3}>
                  Pre-Workout
                </li>
                <li className="filter-title">
                  Marcas
                  <ul>
                    <li onClick={(e) => handleAddFilter(e)} id={4}>
                      MuscleTech
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={5}>
                      Rule 1 Proteins
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={6}>
                      Dymatize
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={7}>
                      Optimum Nutrition
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={8}>
                      Cellucor
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={9}>
                      Body Fortress
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={10}>
                      Muscle Pharm
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={11}>
                      Patriot Nutrition
                    </li>
                  </ul>
                </li>
                <li className="filter-title">
                  Proteinas & Fitness
                  <ul>
                    <li onClick={(e) => handleAddFilter(e)} id={12}>
                      Aumento de peso
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={13}>
                      Aumento Masa Muscular
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={14}>
                      Perdida de peso
                    </li>
                  </ul>
                </li>
                <li onClick={(e) => handleAddFilter(e)} id={15}>
                  Vitaminas & Suplementos
                </li>
                <li onClick={(e) => handleAddFilter(e)} id={16}>
                  Combos
                </li>
              </ul>
            </div>
          </aside>
          <div className="cardWrap">
            {content.length < 1 ? (
              <>
                <p>No hay articulos disponibles</p>
                &nbsp;
                <Spinner />
              </>
            ) : (
              content.map((p) => (
                <Cards
                  id={p._id}
                  key={p._id}
                  images={p.images}
                  name={p.name}
                  weight={p.weight}
                  brand={p.brand}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shop;
