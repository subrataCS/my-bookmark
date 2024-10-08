import React from "react";
import Hero from "./components/Hero"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginSignup from "./components/LoginSignup";

function App() {
  const showToast = () => {
    toast.success("This is a test toast!");
  };



  return (
    <>
      <Hero />
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <LoginSignup/>   */}
    </>
  );
}

export default App;
