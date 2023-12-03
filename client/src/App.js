import { BrowserRouter, Routes, Route} from "react-router-dom"
import { GlobalProvider } from "./context/global/GlobalContext"
import SharedLayout from "./components/main/SharedLayout"
import Home from "./pages/Home"
import Error from "./pages/Error"
import AllProducts from "./components/products/AllProducts"
import OneProduct from "./components/products/OneProduct"


const App = () => {
  return <>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/products/" element={<AllProducts />} />
            <Route path="/products/:productID" element={<OneProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </>
}

export default App