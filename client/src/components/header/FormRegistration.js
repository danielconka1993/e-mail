import "./css/FormReg_Log.css";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/global/GlobalContext";

import { TbEye, TbEyeClosed } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

const FormRegistration = () => {
  const { registrationForm, loginForm } = useContext(GlobalContext);

  const [formReg, setFormReg] = useState({
    // Form input
    name: "",
    email: "",
    password1: "",
    password2: "",
    rank: "3",
    phone: "",
  });
  const [passwordVisible, setPasswordVisible] = useState({
    // password visibile
    password1: false,
    password2: false,
  });
  const [error, setError] = useState(" ");
  // -----------------------------------------------------------

  useEffect(() => {
    // automatické mizení errorů
    const interval = setInterval(() => {
      if (error === "Registrace dokončena") {
        // Vypnutí FORM - Reg.
        registrationForm(false);
        loginForm(true);
      }
      setError("");
    }, 3000);
    return () => {
      // Cleanup
      clearInterval(interval);
    };
  }, [error, registrationForm, loginForm]);

  // ------------------------------------------------------
  const inputChange = (e) => {
    // Form input change
    const { name, value } = e.target;
    // Regex
    const regex_name = /^[a-zA-Z\säöüßáčďéěíňóřšťúůýžÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/;
    const regex_phone = /^\+?[0-9]{0,12}$/;
    const regex_email =
      /^[a-zA-Z0-9._%+-]*@{0,1}[a-zA-Z0-9]*\.{0,1}[a-z]{0,5}$/;
    const regex_password =
      /^[0-9a-zA-ZsäöüßáčďéěíňóřšťúůýžÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ.,/]*$/;
    // [a-z0-9] male pismena a čisla
    //[a-zA-Z\s\u0100-\u024F] - mala a velka pismena a znaky česke a sloveske abecedy
    // {0,5} - 0 az 5*
    // + - jednou nebo vicekrat
    // * - libovolno mnozství včetně 0
    // \ - se dava pred povinne znaky kdyz to hazy error
    if (name === "name" && !regex_name.test(value)) {
      setError("Nepovolený znak");
      return;
    }
    if (name === "phone" && !regex_phone.test(value)) {
      setError("Nepovolený znak");
      return;
    }
    if (name === "email" && !regex_email.test(value)) {
      setError("Nepovolený znak");
      return;
    }
    if (
      (name === "password1" && !regex_password.test(value)) ||
      (name === "password2" && !regex_password.test(value))
    ) {
      setError("Povolené znaky .,/");
      return;
    }
    setFormReg((prevState) => ({
      // zmena inputu
      ...prevState,
      [name]: value,
    }));
  };

  const passwordVisibleF = (pass) => {
    // password visibile
    setPasswordVisible((prev) => ({
      ...prev,
      [pass]: !prev[pass],
    }));
  };

  const btnRegistration = (e) => {
    // btn Submit
    e.preventDefault();

    // Control all object true
    if (Object.values(formReg).some((field) => !field)) {
      setError("Vyplňte všechna pole");
      return;
    } else if (formReg.password1 !== formReg.password2) {
      setError("Hesla se neschodují");
      return;
    } else {
      const date = new Date();
      const dateFormat = new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);

      fetch("http://localhost:5000/save-registration", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: formReg.name,
          email: formReg.email,
          password: formReg.password1,
          phone: formReg.phone,
          rank: formReg.rank,
          date: dateFormat,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((finaldata) => {
          if (finaldata && finaldata.success) {
            // Podmínka pro nerovnající se email - data + prošlo
            setError("Registrace dokončena");
            setFormReg({
              name: "",
              email: "",
              password1: "",
              password2: "",
              phone: "",
            });
            setPasswordVisible({
              password1: false,
              password2: false,
            });
          } else if (finaldata && finaldata.msg) {
            // data + err zprávy existuje
            setError(finaldata.msg);
          } else {
            setError("Registrace selhala. Zkuste to znovu.");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Chyba při odesílání, kontaktujte nás");
        });
    }
  };

  // --------------------------------------------------------
  return (
    <div className="regLog_FORM">
      <form>
        <AiOutlineClose
          className="icon-x"
          onClick={() => registrationForm(false)}
        />
        <h1>Registrace</h1>

        <input
          type="text"
          placeholder="Jméno"
          name="name"
          value={formReg.name}
          onChange={inputChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formReg.email}
          onChange={inputChange}
        />
        <div className="box-password">
          <input
            type={passwordVisible.password1 ? "text" : "password"}
            placeholder="Heslo"
            name="password1"
            value={formReg.password1}
            onChange={inputChange}
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => passwordVisibleF("password1")}
          >
            {passwordVisible.password1 ? (
              <TbEye className="icon-eye" />
            ) : (
              <TbEyeClosed className="icon-eye" />
            )}
          </button>
        </div>
        <div className="box-password">
          <input
            type={passwordVisible.password2 ? "text" : "password"}
            placeholder="Stejné heslo znovu"
            name="password2"
            value={formReg.password2}
            onChange={inputChange}
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => passwordVisibleF("password2")}
          >
            {passwordVisible.password2 ? (
              <TbEye className="icon-eye" />
            ) : (
              <TbEyeClosed className="icon-eye" />
            )}
          </button>
        </div>
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={formReg.phone}
          onChange={inputChange}
        />

        <input
          type="submit"
          className="btnSubmit"
          value="Registrovat"
          onClick={btnRegistration}
        />
        <p
          className="mess-err"
          style={{ color: error === "Registrace dokončena" ? "green" : "red" }}
        >
          {error}
        </p>
      </form>
    </div>
  );
};

export default FormRegistration;
