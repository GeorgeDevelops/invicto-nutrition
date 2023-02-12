import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TypingEffect from "react-typing-effect";

const Welcome = (props) => {
  const navigateTo = useNavigate();
  return (
    <div className="welcome">
      <TypingEffect
        text={["BIENVENIDO A"]}
        speed={80}
        typingDelay={300}
        eraseDelay={30000}
        className="introFontSize"
      />
      <br />
      <TypingEffect
        text={["INVICTO NUTRITION"]}
        speed={80}
        typingDelay={600}
        eraseDelay={29600}
        className="introFontSize"
      />

      <div className="welcome-button">
        <button onClick={() => navigateTo("/tienda")}>
          Comprar ahora
          <div>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
