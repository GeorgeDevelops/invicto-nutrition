import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "./contact-form";

const Contact = (props) => {
  return (
    <React.Fragment>
      <div id="contact">
        <p>Contactenos</p>
        <div className="wrapper">
          <ContactForm />
          <ul>
            <li>
              <a
                href="https://www.instagram.com/invicto_nutrition/"
                style={{ color: "#c13584" }}
                target={"_blank"}
              >
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/message/ZZV2MCM5YCFNP1"
                target="_blank"
                style={{ color: "#128c7e" }}
              >
                <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/" style={{ color: "#1877f2" }}>
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
