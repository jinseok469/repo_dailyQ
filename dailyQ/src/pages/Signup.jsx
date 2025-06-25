import "./Signup.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import notice from "../assets/notice.png";
import axios from "axios";

const Signup = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const [value, setValue] = useState({
    done: "",
    password: "",
  });
  const refs = {
    user_id: useRef(null),
    password: useRef(null),
    passwordck: useRef(null),
  };
  const [state, setState] = useState({
    user_id: "",
    password: "",
    passwordck: "",
  });
  const nav = useNavigate();

  const signup = async () => {
    const newItem = {
      user_id: state.user_id,
      password: state.password,
    };
    if (state.user_id === "") {
      refs.user_id.current.focus();
      return;
    } else if (state.password === "") {
      refs.password.current.focus();
      return;
    } else if (state.passwordck === "") {
      refs.passwordck.current.focus();
      return;
    }
    if (state.password !== state.passwordck) {
      setValue({
        done: "",
        password: "_password",
      });
      refs.passwordck.current.focus();
      return;
    }
    try {
      const res = await axios.post(
        "https://dailyq.jeeyeonnn.site/account/sign-up",
        newItem
      );
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        nav("/signup2");
      } else {
        console.log("토큰 미발급");
      }
    } catch {
      console.log("아이디 중복");
      setValue({
        done: "_done",
        password: "",
      });
      refs.user_id.current.focus();
      return;
    }
  };

  return (
    <div className="Signup">
      <Header></Header>
      <Button
        onClick={() => nav("/login")}
        text={`< 구글 로그인으로 돌아가기`}
        className={"Signup_header_button"}
      ></Button>
      <div className="Signup_main">
        <input
          onChange={(e) =>
            setState({
              ...state,
              user_id: e.target.value,
            })
          }
          value={state.user_id}
          ref={refs.user_id}
          type="text"
          placeholder="아이디를 입력하세요."
          maxLength={12}
        />
        <input
          onChange={(e) =>
            setState({
              ...state,
              password: e.target.value,
            })
          }
          value={state.password}
          ref={refs.password}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <input
          onKeyDown={(e) => e.key === "Enter" && signup()}
          ref={refs.passwordck}
          value={state.passwordck}
          onChange={(e) =>
            setState({
              ...state,
              passwordck: e.target.value,
            })
          }
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <Button
          onClick={signup}
          text={"회원가입"}
          className={"Signup_main_button"}
        ></Button>
        <div className={`notice${value.done}`}>
          <img src={notice} alt="" />
          <span>이미 사용중인 아이디 입니다.</span>
        </div>
        <div className={`notice${value.password}`}>
          <img src={notice} alt="" />
          <span>비밀번호가 서로 달라요</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
