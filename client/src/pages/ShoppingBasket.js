import "./css/ShoppingBasket.css"
import { FaCartShopping } from "react-icons/fa6";

const ShoppingBasket = () => {
  return <div className="ShoppingBasket">
    <div className="pageInfo">
        <div className="name">
            <h1>Košík</h1>
            <FaCartShopping className="icon"/>
        </div>
        <div className="pageLabel">
            <p>Vaše produkty</p>
        </div>
    </div>
  </div>
}

export default ShoppingBasket