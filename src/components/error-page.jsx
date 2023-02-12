import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = (props) => {
  const error = useRouteError();

  return (
    <React.Fragment>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Lo sentimos, un error inesperado has ocurrido.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </React.Fragment>
  );
};

export default ErrorPage;
