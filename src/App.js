// import logo from './logo.svg';

import "./App.css";

import Home from "./Pages/Home";
import Product from "./Components/Product";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";

function App() {
  

  return (
    <>
      {/* <Navbar/> */}
      {/* <Navbar cartvalue={cartitem} /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
