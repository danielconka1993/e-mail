import "./css/Home.css"
import Img from "../img/1.jpg"
import AllProducts from "../components/products/AllProducts"



const Home = () => {
  return <div className='Home'>
    <img className="background" src={Img} alt="" />
    <div className="Home">

      <AllProducts />
    </div>
  </div>
}

export default Home