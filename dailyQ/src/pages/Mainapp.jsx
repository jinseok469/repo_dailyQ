import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quizcomplete from "./Quizcomplete";
import Quizwaiting from "./Quizwaiting";
import Todayresult from "./Todayresult";
import Person from "./Person";
import Rank from "./Rank";
import Chat from "./Chat";
import Chattingroom from "./Chattingroom";
import Aireport from "./Aireport";
import Pdffirst from "./Pdffirst";
import Notfound from "./Notfound";
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
      <Route path="/rank" element={<Rank></Rank>}></Route>
      <Route path="/chat" element={<Chat></Chat>}></Route>
      <Route path="/aireport" element={<Aireport></Aireport>}></Route>
      <Route path="/pdffirst" element={<Pdffirst></Pdffirst>}></Route>
      <Route
        path="/chattingroom"
        element={<Chattingroom></Chattingroom>}
      ></Route>
      <Route path="*" element={<Notfound></Notfound>}></Route>
    </Routes>
  );
};

export default Mainapp;
