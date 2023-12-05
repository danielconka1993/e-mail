import { useReducer, createContext } from "react"; // 1.1 Context
import GlobalReducer from "./GlobalReducer";


const mainState = { // 2. 2 -  Globalní Reducer - Defaultni state
    visibilitRegistrationForm: false, // 2 - Reg form visibilit
    visibilitLoginForm: false, // - 3 - Login - form visib
    loginID: "",
    loginEmail: "", // - 4 Login data
    loginName: "",  // - 4 Login data
    loginPassword: "", // - 4 Login data
    loginPhone: "", // - 4 Login data
    loginRank: "", // - 4 Login data
    loginShoppingBasket: [], // 4 - Login data Košík
    loginPurchasesCompleted: [], // 4 - Login data - Hotové nákupy
    loginDate: "", // - 4 Login data
}

export const GlobalContext = createContext(); // 1.2 Context - vytvoření

// -----------------------------
export const GlobalProvider = ({children}) => { // 1.3 Context + children(pro App.js - popisek niže) 
    const [state,dispatch] = useReducer(GlobalReducer, mainState) // 2. 1 -  Globalní Reducer - Deklarace

    const registrationForm = (visibilitRegistrationForm) => { // 2. 2 - dispech Registrace
        dispatch({
            type: "REGISTRATION_FORM",
            payload: visibilitRegistrationForm
        })
    }
    
    const loginForm = (visibilitLoginForm) => { // 3.2 - dispech Login Form
        dispatch({
            type: "LOGIN_FORM",
            payload: visibilitLoginForm
        })
    }

    const loginData = (loginID, loginEmail, loginName, loginPhone, loginRank, loginShoppingBasket, loginPurchasesCompleted, loginDate) => { // 4.2 - dispatch LOGIN data
        dispatch({
            type: "LOGIN_DATA",
            payload:{
                loginID,
                loginEmail,
                loginName,
                loginPhone,
                loginRank,
                loginShoppingBasket,
                loginPurchasesCompleted,
                loginDate,
            }
        })
    }

    // 1.4 Context - vypis
    return <GlobalContext.Provider
            value={{ // 1 + 2 - Posílané hodnoty Reducer přes Context
                registrationForm, // 2.3 - posílání Registrace FOR?
                visibilitRegistrationForm:state.visibilitRegistrationForm,

                loginForm,// 3.3 - posílaní Login FORM
                visibilitLoginForm:state.visibilitLoginForm,

                loginData, // 4.3 - poslání Login Data
                loginID:state.loginID,
                loginEmail:state.loginEmail,
                loginName:state.loginName,
                loginPhone: state.loginPhone,
                loginRank: state.loginRank,
                loginShoppingBasket: state.loginShoppingBasket,
                loginPurchasesCompleted: state.loginPurchasesCompleted,
                loginDate:state.loginDate,
            }}
    > 
        {children}
    </GlobalContext.Provider> 
}

// {children} je pro <BrowserRouter>, <Routes>, <Route>, atd... (jinak nebudou zobrazovane)
        