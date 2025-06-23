import "./App.css";
import { replace, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import Mainapp from "./pages/Mainapp";
import Simplelogin from "./pages/Simplelogin";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const token = localStorage?.getItem("token");
  const nav = useNavigate();

  function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route path="" element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/simplelogin"
          element={<Simplelogin></Simplelogin>}
        ></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>

        <Route
          path="/signup2"
          element={
            <ProtectedRoute>
              <Signup2></Signup2>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Mainapp></Mainapp>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
