import  "./App.css";
import "tailwindcss/tailwind.css";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Home from "./components/Home/Home";
import {Routes, Route} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Account from "./components/auth/Account";
import Products from "./components/Products/Products";
import ForgotPassword from "./components/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer style={{ position: "fixed", top: "10px", right: "10px", bottom:"300px" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products" element={<Products />} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
      </Routes>

    </div>
  );
}

export default App;

