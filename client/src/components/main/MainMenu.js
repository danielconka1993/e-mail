import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/global/GlobalContext";
import FormRegistration from "../header/FormRegistration";
import FormLogin from "../header/FormLogin";

const MainMenu = () => {
  const {
    // Registrace FORM
    visibilitRegistrationForm,
    registrationForm,

    // Login FORM
    visibilitLoginForm,
    loginForm,

    // Login Data
    loginID,
    loginData
  } = useContext(GlobalContext); // 1 - GlobalContext

  // --------------------------------------------------------------
  const f_regFormVisib = () => {
    registrationForm(true);
    loginForm(false);
  };

  const f_logFormVisib = () => {
    loginForm(true);
    registrationForm(false);
  };

  // ------------------------------------------------------------------------

// Nový state pro ukládání dat ze session
const [sessionData, setSessionData] = useState(null);

// Načtení dat ze session při načtení komponenty
useEffect(() => {
  // Zde můžete provést volání na server nebo jiné metody pro načítání dat ze session
  // V tomto příkladu používám fetch pro načítání dat ze serveru

  fetch("http://localhost:5000/getSessionData") 
    .then((response) => response.json())
    .then((data) => {
      setSessionData(data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}, []); // Závorky jsou prázdné, což znamená, že se efekt provede pouze při načtení komponenty

  // -------------------------------------------------------
  return (
    <nav>
      <button><NavLink to="">Domu</NavLink></button>
      <button><NavLink to="/kosik">Košík</NavLink></button>
      {/* 2 - Odhlásit */}
      {loginID && <button onClick={() => loginData("", "", "", "", "", "")}>Odhlásit</button>}
      {loginID && <p>{loginID}</p>}
      {/* 1 - Registrace + Přihlašení FORM */}
      {!loginID && (
        <div>
          <button onClick={f_regFormVisib}>Registrovat</button>
          <button onClick={f_logFormVisib}>Přihlásit</button>
        </div>
      )}
      {/* ------------ */}
      {
        visibilitRegistrationForm && <FormRegistration /> // Registrace FORM
      }
      {
        visibilitLoginForm && <FormLogin /> // Login FORM
      }
    </nav>
  );
};

export default MainMenu;
