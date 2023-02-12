import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// Components
import Root from './components/root';
import ErrorPage from './components/error-page';
import Feed from './components/feed';
import Brands from './components/brands';
import Contact from './components/contact';
import Shop from './components/shop';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faArrowsRotate, faTruck, faMagnifyingGlass, faClipboard, faCartShopping, faXmark, faArrowRight, faTrash, faBuildingColumns, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faWhatsapp, faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import Cart from './components/cart';
import Checkout from './components/checkout';
import Profile from './components/profile';

import { Provider } from "react-redux";
import store from "./store";
import ProductDetails from './components/productDetails';
import SignupForm from './components/signup';
import Login from './components/login';
import Success from './components/success';

library.add(faUser, faTruck, faArrowsRotate, faFacebook, faInstagram, faClipboard, faCcVisa, faCcMastercard, faWhatsapp, faBuildingColumns, faCircleCheck, faMagnifyingGlass, faCartShopping, faXmark, faArrowRight, faTrash);

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Feed />,
        errorElement: <ErrorPage />
      },
      {
        path: "/tienda",
        element: <Shop />,
        errorElement: <ErrorPage />
      },
      {
        path: "/marcas",
        element: <Brands />,
        errorElement: <ErrorPage />
      },
      {
        path: "/contacto",
        element: <Contact />,
        errorElement: <ErrorPage />
      },
      {
        path: "/carrito",
        element: <Cart />,
        errorElement: <ErrorPage />
      },
      {
        path: "/checkout",
        element: <Checkout />,
        errorElement: <ErrorPage />
      },
      {
        path: "/perfil",
        element: <Profile />,
        errorElement: <ErrorPage />
      },
      {
        path: "/productos/:productId/detalles",
        element: <ProductDetails />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: "/registrarse",
    element: <SignupForm />,
    errorElement: <ErrorPage />
  },
  {
    path: "/iniciar-seccion",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/success/:orderId",
    element: <Success />,
    errorElement: <ErrorPage />
  }
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);