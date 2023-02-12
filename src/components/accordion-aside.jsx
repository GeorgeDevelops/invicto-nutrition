import { Accordion } from "react-bootstrap";

export default function AsideAccordion({
  range,
  setRangeFormat,
  handleRangeChange,
}) {
  function handleAddFilter(e) {
    console.log(e);
  }
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtros</Accordion.Header>
        <Accordion.Body>
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
              <p>RD$0 - RD${setRangeFormat()}</p>
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
                <li onClick={(e) => handleAddFilter(e)} id={17}>
                  Pre-Workout
                </li>
                <li className="filter-title">
                  Marcas
                  <ul>
                    <li onClick={(e) => handleAddFilter(e)} id={3}>
                      MuscleTech
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={4}>
                      Rule 1 Proteins
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={5}>
                      Dymatize
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={6}>
                      Optimum Nutrition
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={7}>
                      Cellucor
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={8}>
                      Body Fortress
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={9}>
                      Muscle Pharm
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={16}>
                      Patriot Nutrition
                    </li>
                  </ul>
                </li>
                <li className="filter-title">
                  Proteinas & Fitness
                  <ul>
                    <li onClick={(e) => handleAddFilter(e)} id={11}>
                      Aumento de peso
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={12}>
                      Aumento Masa Muscular
                    </li>
                    <li onClick={(e) => handleAddFilter(e)} id={13}>
                      Perdida de peso
                    </li>
                  </ul>
                </li>
                <li onClick={(e) => handleAddFilter(e)} id={14}>
                  Vitaminas & Suplementos
                </li>
                <li onClick={(e) => handleAddFilter(e)} id={15}>
                  Combos
                </li>
              </ul>
            </div>
          </aside>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
