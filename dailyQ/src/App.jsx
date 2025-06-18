import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import Mainapp from "./pages/Mainapp";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signup2" element={<Signup2></Signup2>}></Route>
        <Route path="/*" element={<Mainapp></Mainapp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
