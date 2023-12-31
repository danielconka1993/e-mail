const GlobalReducer = (state, action) => {
  switch(action.type){
    case "REGISTRATION_FORM": // 1. Registrace FORM
        return{
            ...state,
            visibilitRegistrationForm:action.payload
        }
    case "LOGIN_FORM": // 2. Login FORM
        return{
          ...state,
          visibilitLoginForm: action.payload
        }

    case "LOGIN_DATA": // Login Data
        return{
          ...state,
          // přistupuje se k nim pomocí jejich klíčů v rámci objektu pokud je jich víc, proto .login atd...
          loginID: action.payload.loginID,
          loginEmail: action.payload.loginEmail,
          loginName: action.payload.loginName,
          loginPhone: action.payload.loginPhone,
          loginRank: action.payload.loginRank,
          loginShoppingBasket: action.payload.loginShoppingBasket,
          loginPurchasesCompleted: action.payload.loginPurchasesCompleted,
          loginDate: action.payload.loginDate
        }
    default: return state;
  }
}

export default GlobalReducer