import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quizcomplete from "./Quizcomplete";
import Quizwaiting from "./Quizwaiting";

const Mainapp = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route
        path="/quizcomplete"
        element={<Quizcomplete></Quizcomplete>}
      ></Route>
      <Route path="/quizwaiting" element={<Quizwaiting></Quizwaiting>}></Route>
    </Routes>
  );
};

export default Mainapp;
