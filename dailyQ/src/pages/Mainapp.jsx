import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quizcomplete from "./Quizcomplete";
import Quizwaiting from "./Quizwaiting";
import Todayresult from "./Todayresult";
import Person from "./Person";

const Mainapp = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route
        path="/quizcomplete"
        element={<Quizcomplete></Quizcomplete>}
      ></Route>
      <Route path="/quizwaiting" element={<Quizwaiting></Quizwaiting>}></Route>
      <Route path="/todayresult" element={<Todayresult></Todayresult>}></Route>
      <Route path="/person" element={<Person></Person>}></Route>
    </Routes>
  );
};

export default Mainapp;
