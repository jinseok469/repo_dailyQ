import { Route, Routes } from "react-router-dom";
import Home from "./Home";

const Mainapp = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
    </Routes>
  );
};

export default Mainapp;
