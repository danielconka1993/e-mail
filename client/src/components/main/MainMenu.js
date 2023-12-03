import { useContext } from "react"
import { GlobalContext } from "../../context/global/GlobalContext"
import FormRegistration from "../header/FormRegistration"
import FormLogin from "../header/FormLogin"

const MainMenu = () => {
  const {visibilitRegistrationForm, registrationForm} = useContext(GlobalContext) // 1 - Registrace FORM

  const {visibilitLoginForm, loginForm} = useContext(GlobalContext)

  const f_regFormVisib = () => {
    registrationForm(true)
    loginForm(false)
  }

  const f_logFormVisib = () => {
    loginForm(true)
    registrationForm(false)
  }


  return <nav>
    {/*1 - Registrace FORM */}
    <button onClick={f_regFormVisib}> 
        Registrovat
      </button>
      {/* 2 - Login FORM */}
    <button onClick={f_logFormVisib}>
      Přihlásit
    </button>

    {/* ------------ */}
    {
      visibilitRegistrationForm && <FormRegistration /> // Registrace FORM
    }
    {
      visibilitLoginForm && <FormLogin /> // Login FORM
    }
  </nav>
}

export default MainMenu