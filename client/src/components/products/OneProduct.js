import React, { useEffect, useState } from "react";
import Img from "../../img/2.png";
import "./css/OneProduct.css";
import { useParams } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

const OneProduct = () => {
  const { productID } = useParams();
  const [oneProduct, setOneProduct] = useState({}); // Uložení načteného produktu
  const [targetItem, setTargetItem] = useState(""); // Vybraná balíček
  const [numberBuy, setNumberBuy] = useState(0) // Input

  useEffect(() => { // Načtení
    const fetchData = async () => {
      const data = await fetch("http://localhost:5000/get-products");
      const result = await data.json();

      // Najdi produkt podle productID
      const foundProduct = result.products.find((product) => product._id === productID);

      // Nastav state s nalezeným produktem
      setOneProduct(foundProduct || {});
    };

    fetchData();
  }, [productID]); // Zajistí, že useEffect bude spuštěn znovu při změně productID

  const {_id, name, description, manufacturer, category_main, category_second, attributes, quantities, prices, availability, imgs_number, date} = oneProduct;

  // ------------------------------------------------------------------------

const button_guantitie = (index) => { // Výběr Množství
  setTargetItem(index)
  setNumberBuy(1)
}
const btnSubmit = () => {

  console.log( name + " " + quantities[targetItem] + " " + prices[targetItem])
} 
  // ------------------------------------------------------------------------
  return (
    <div className="OneProduct">
        <div className="SoloProduct">

          <img src={Img} alt="" />
          <div className="product_info">
  
            {/* Jméno - cena(od-do) - atribut */}
            <div className="head-product"> 
              <h1>{name}</h1>
              <div className="container-head-product">
                <p className="prices-max-min">
                  {prices && prices.length > 0 && prices[0] !== undefined
                    ? `Skladem`
                    : 'Momentálně nedostupné'}
                </p>
                <div className="attributes">
                  <p>Vlastnost :</p>
                  <h2>{attributes}</h2>
                </div>
              </div>
            </div>

            {/* Popis */}
            <div className="description-box">
              <p className="description">{description}</p>
            </div>

            {/* Inventory - Balení */}
            <div className="inventory">
              <div className="info">
                <p>Balení</p>
              </div>

              <div className="buttons-quantities">
                {quantities && quantities.length > 0 && quantities.map((oneQuantities, index) => (
                  availability[index] ? (
                    <div className={`button ${targetItem === index ? "click" : ""}`} key={index} onClick={() => button_guantitie(index)}>
                    <p className="quantitie">{oneQuantities}g</p>
                    <p className="price">{prices[index]} Kč</p>
                  </div>
                  ) : null
                ))}
              </div>
            </div>
            
            {/* Buy */}
            <section className="buy">
              <input type="text" value={numberBuy} onChange={(e) => setNumberBuy(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />

              <button type="submit">
                <MdAddShoppingCart className="icon" onMouseDown={btnSubmit} />
                Do košíku
              </button>
            </section>
          </div>
      </div>
    </div>
  );
};

export default OneProduct;