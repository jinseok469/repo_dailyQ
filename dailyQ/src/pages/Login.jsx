import "./Login.css";
import Button from "../components/Button";
import google_button from "./../assets/google_button.png";
import dailyq_mark from "./../assets/dailyq_mark.png";
import login_image from "./../assets/login_image.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  return (
    <div className="Login">
      <section className="Login_img">
        <div className="Login_img_mark">
          <img src={dailyq_mark} alt="" />
        </div>
        <div className="Login_img_image">
          <img src={login_image} alt="" />
        </div>
      </section>
      <section className="Login_main">
        <div className="main_header_text">처음이신가요?</div>
        <div className="main_header_semitext">
          소셜 로그인으로 가볍게 시작해보세요!
        </div>
        <div className="main_button">
          <button className="google_button">
            <img src={google_button} alt="" />
          </button>
          <Button
            onClick={() => nav("/simplelogin")}
            className={"nomal_button"}
            text={"일반 로그인으로 이용하기"}
          ></Button>
          <Button
            onClick={() => nav("/signup")}
            className={"nomal_button"}
            text={"회원가입"}
          ></Button>
        </div>
      </section>
    </div>
  );
};

export default Login;
