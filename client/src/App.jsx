import React from "react";
import Hero from "./components/Hero"; // Ensure the path is correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const showToast = () => {
    toast.success("This is a test toast!");
  };

  return (
    <>
      <Hero />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
