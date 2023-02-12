import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { setFormat } from "../utils/useful";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../features/productFilterSlice";
import store from "../store";
import { products } from "../utils/productData";

function OffCanvasFilter() {
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState([]);
  const [range, setRange] = useState(9000);
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();

  store.subscribe(() => {
    setFilters(store.getState().productFilter.value);
  });

  function handleAddFilter(e) {
    let filters = store.getState().productFilter.value;
    if (filters.length > 2 && filters.length < 4) return;
    dispatch(addFilter({ id: e.target.id, name: e.target.innerText.trim() }));
  }

  function handleRangeChange(e) {
    setRange(e.target.value);
  }

  function filterByPrice(products) {
    let matched = [];
    products.forEach((p) => {
      if (p.price <= range) matched.push(p);
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

  useEffect(() => {
    filterByCategory(products);
  }, [range, filters]);

  useEffect(() => {
    setFilters(store.getState().productFilter.value);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        style={{ backgroundColor: "#1f618d", border: "1px solid #1f618d" }}
        onClick={handleShow}
      >
        Filtrar por
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar por</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <aside>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasFilter;
