import "./App.css";
import { replace, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import Mainapp from "./pages/Mainapp";
import Simplelogin from "./pages/Simplelogin";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import Notfound from "./pages/Notfound";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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
  function ProtectedMainapp({ children }) {
    const isSignupDone = localStorage.getItem("is_signup_done");
    if (!isSignupDone) {
      Swal.fire({
        icon: "error",
        title: "오류 발생!",
        text: "정상적이지 않은 접근입니다, 다시 로그인 해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#00664F",
      });
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <div>
      <GoogleOAuthProvider clientId="1011059979743-i8du42eeuof5fevob5gvtvl3fsiee1u3.apps.googleusercontent.com">
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
                <ProtectedMainapp>
                  <Mainapp></Mainapp>
                </ProtectedMainapp>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
