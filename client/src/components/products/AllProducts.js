import "./css/AllProducts.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Img from "../../img/1.jpg"

const AllProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  // const [serverMsg, setServerMsg] = useState("Načítam data");

  useEffect( () => {
    getProducts();
  },[])

  const getProducts = async () => {
    const data = await fetch ("http://localhost:5000/get-products");
    const finalData = await data.json();
    const {msg, products} = finalData;
    console.log(products)
    setNewProducts(products);
    // setServerMsg(msg)
  }

  const f_availability = (availability) => {
    if(availability.every(value => value === "0")){
      return "Momentálně nedostupné"
    }
    else{
      return "Skladem"
    }
  }

  return <div className="AllProducts">
      {
        newProducts.map((oneProduct, index) => {
          oneProduct = {...oneProduct, index}

          return <article key={index} className="oneProduct-miniature">
              <Link to={`/products/${oneProduct._id}`}>
                <img src={Img} alt="" />
                <h1>{oneProduct.name}</h1>
              </Link>
              <p>{oneProduct.description}</p>
              <div className="box-price">
                <p>{oneProduct.prices[0] + " Kč - " + oneProduct.prices[oneProduct.prices.length - 1] + " Kč"}</p>
                <button>Vybrat</button>
              </div>
            <p>{f_availability(oneProduct.availability)}</p>
          </article>
        })
      }
    </div>
}

export default AllProducts;