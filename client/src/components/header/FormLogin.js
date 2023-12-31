import { useState, useEffect, useContext } from "react";
// CSS FORMREG_Log.css - nařtené z FormRegistration.js
import { GlobalContext } from "../../context/global/GlobalContext";

import { TbEye, TbEyeClosed } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

const FormLogin = () => {
  const { loginForm, loginData } = useContext(GlobalContext);

  const [formLog, setFormLog] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [sessionData, setSessionData] = useState(null);
  // -------------------------------------------------------

  useEffect(() => {
    // Mazání Hlášek Erroru
    const interval = setInterval(() => {
      if (error === "Přihlášení dokončeno") {
        // Vypnutí FORM Log
        loginForm(false);
      }
      setError("");
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [error, loginForm]);

  // --------------------------------------------------------

  const inputChange = (e) => {
    const { name, value } = e.target;

    const regex_email =
      /^[a-zA-Z0-9._%+-]*@{0,1}[a-zA-Z0-9]*\.{0,1}[a-z]{0,5}$/;
    const regex_password =
      /^[0-9a-zA-ZsäöüßáčďéěíňóřšťúůýžÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ.,/]*$/;

    if (name === "email" && !regex_email.test(value)) {
      setError("Nepovolený znak");
      return;
    }

    if (name === "password" && !regex_password.test(value)) {
      setError("Povolené znaky .,/");
      return;
    }

    setFormLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const btnSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formLog).some((field) => !field)) {
      setError("Vyplňte přihlašovací udaje");
      return;
    } else {
      fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: formLog.email,
          password: formLog.password,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((finalData) => {
          if (finalData && finalData.success) {
            // Přihlášen
            // console.log(finalData.user[0])
            loginData(
              // Uložení do globálu
              finalData.user[0]._id,
              finalData.user[0].email,
              finalData.user[0].name,
              finalData.user[0].phone,
              finalData.user[0].rank,
              finalData.user[0].shoppingBasket,
              finalData.user[0].purchasesCompleted,
              finalData.user[0].date
            );
            setError("Přihlášení dokončeno");
            setPasswordVisible(false);
            setFormLog({
              email: "",
              password: "",
            });
          } else if (finalData && finalData.msg) {
            setError(finalData.msg);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Chyba při odesílání, kontaktujte nás");
        });
    }
  };
  // -----------------------------------------------
  return (
    <div className="regLog_FORM">
      <form>
        <AiOutlineClose className="icon-x" onClick={() => loginForm(false)} />
        <h1>Přihlášení</h1>

        <input
          type="text"
          placeholder="E-mail"
          name="email"
          value={formLog.email}
          onChange={inputChange}
        />

        <div className="box-password">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Heslo"
            name="password"
            value={formLog.password}
            onChange={inputChange}
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <TbEye className="icon-eye" />
            ) : (
              <TbEyeClosed className="icon-eye" />
            )}
          </button>
        </div>

        <input
          type="submit"
          value="Přihlásit"
          className="btnSubmit"
          onClick={btnSubmit}
        />
        <p
          className="mess-err"
          style={{
            color: error === "Přihlášení dokončeno" ? "green" : "red",
          }}
        >
          {error}
        </p>
      </form>
    </div>
  );
};

export default FormLogin;
