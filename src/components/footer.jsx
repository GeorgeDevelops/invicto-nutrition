import React from "react";
import visa from "./../images/visa.png";
import mastercard from "./../images/mastercard-logo.png";
import paypal from "./../images/paypal.png";
import mio from "./../images/Mio-logo.png";

const Footer = (props) => {
  const privacy_policy_url =
    "https://firebasestorage.googleapis.com/v0/b/invicto-nutrition.appspot.com/o/policies%2FPol%C3%ADticas%20de%20Privacidad%20-%20Invicto%20Nutrition.pdf?alt=media&token=6b238cfc-ed79-46bb-b113-ad239a5fa7c7";

  const terms_and_conditions =
    "https://firebasestorage.googleapis.com/v0/b/invicto-nutrition.appspot.com/o/policies%2FTerminos%20y%20Condiciones%20-%20Invicto%20Nutrition.pdf?alt=media&token=158a3c7b-e3d5-4324-ba0b-a73849cbc2f5";

  const cancelation_policy =
    "https://firebasestorage.googleapis.com/v0/b/invicto-nutrition.appspot.com/o/policies%2FPoliticas%20de%20Cancelacion%20-%20Invicto%20Nutrition.pdf?alt=media&token=bdc64c90-0c8d-48c3-9876-7a96d750315d";

  const card_security_policy =
    "https://firebasestorage.googleapis.com/v0/b/invicto-nutrition.appspot.com/o/policies%2FPol%C3%ADticas%20de%20seguridad%20de%20tarjetas-%20Invicto%20Nutrition.pdf?alt=media&token=8201fc33-b772-44ac-8e15-f2c70e8efbed";

  return (
    <footer>
      <div className="footer-links">
        <div>
          <h2>sobre nosotros</h2>
          <ul>
            <li>
              <a
                href={card_security_policy}
                target="_blank"
                rel="noopener noreferrer"
              >
                politicas de seguridad de datos de tarjeta
              </a>
            </li>
            <li>
              <a
                href={privacy_policy_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                politicas de privacidad
              </a>
            </li>
            <li>
              <a
                href={terms_and_conditions}
                target="_blank"
                rel="noopener noreferrer"
              >
                terminos & condiciones
              </a>
            </li>
            <li>
              <a
                href={cancelation_policy}
                target="_blank"
                rel="noopener noreferrer"
              >
                politicas de cancelacion
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contactenos</h2>
          <ul>
            <li>Correo: support@invictonutrition.com</li>
            <li>Telefono: 829-961-1019</li>
          </ul>
        </div>
        <div>
          <h2>siguenos</h2>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/invicto_nutrition/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="http://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/message/ZZV2MCM5YCFNP1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Whatsapp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>metodos de pago</h2>
          <ul className="paymentMethods">
            <li>
              <img src={visa} alt="Visa" />
            </li>
            <li>
              <img src={mastercard} alt="Mastercard" />
            </li>
            <li>
              <img src={paypal} alt="Paypal" />
            </li>
            <li>
              <img src={mio} width={"80px"} alt="Mio" />
            </li>
          </ul>
        </div>
      </div>
      <div className="copyrights">
        <p>
          Todos los derechos reservados &copy; Invicto Nutrition Republica
          Dominicana
        </p>
      </div>
    </footer>
  );
};

export default Footer;
