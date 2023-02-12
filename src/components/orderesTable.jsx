import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import http from "../services/httpService";

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  async function handleOrdersRender() {
    let token = localStorage.getItem("token");
    let decoded = jwtDecode(token);
    const URL = `${process.env.REACT_APP_API_URL}/api/orders/${decoded._id}`;

    let response = await http.get(URL, { headers: { "x-auth-token": token } });

    if (response.status || response.status === 200) {
      setOrders(response.data);
    }
  }

  useEffect(() => {
    handleOrdersRender();
  }, []);

  return (
    <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th>Pedido ID #</th>
          <th>Estado</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {orders.length < 1 ? (
          <tr>
            <td>No hay pedidos disponibles</td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.orderId} style={{ cursor: "pointer" }}>
              <td className="order_id">{order.orderId}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default OrdersTable;
