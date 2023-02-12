import React, { useState, useEffect } from "react";
import ProfileInfo from "./profile-info";
import OrdersTable from "./orderesTable";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token || token === "") return navigate("/iniciar-seccion");

    let decoded = jwtDecode(token);

    if (!decoded._id) return navigate("/iniciar-seccion");
  }, []);

  return (
    <React.Fragment>
      <div id="profile">
        <ProfileInfo />
        <div className="order_wrapper">
          <div>
            <h2>Pedidos</h2>
          </div>
          <OrdersTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
