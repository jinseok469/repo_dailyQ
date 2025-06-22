import "./Signup.css";
import Header from "../components/Header";
import Button from "../components/Button";
import notice from "../assets/notice.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Simplelogin = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const [diff, setDiff] = useState("");
  const refs = {
    user_id: useRef(null),
    password: useRef(null),
  };
  const [state, setState] = useState({
    user_id: "",
    password: "",
  });
  const nav = useNavigate();

  const loginSubmit = async () => {
    const newItem = {
      user_id: state.user_id,
      password: state.password,
    };
    if (state.user_id === "") {
      refs.user_id.current.focus();
      return;
    }
    if (state.password === "") {
      refs.password.current.focus();
      return;
    }

    try {
      const res = await axios.post(
        "http://3.38.212.8:8000/account/sign-in",
        newItem
      );

      if (res.data.access_token) {
        if (res.data.is_signup_done) {
          localStorage.setItem("token", res.data.access_token);
          console.log(localStorage.getItem("token"));
          nav("/home");
        } else {
          localStorage.setItem("token", res.data.access_token);
          nav("/signup2");
        }
      } else {
        setDiff("_done");
        setState({
          user_id: "",
          password: "",
        });
      }
    } catch {
      console.log("로그인 실패");
      setDiff("_done");
      setState({
        user_id: "",
        password: "",
      });
      refs.user_id.current.focus();
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
          ref={refs.user_id}
          value={state.user_id}
          onChange={(e) =>
            setState({
              ...state,
              user_id: e.target.value,
            })
          }
          type="text"
          placeholder="아이디를 입력하세요."
          maxLength={12}
        />
        <input
          value={state.password}
          onChange={(e) =>
            setState({
              ...state,
              password: e.target.value,
            })
          }
          ref={refs.password}
          type="password"
          placeholder="비밀번호를 입력하세요."
          onKeyDown={(e) => e.key === "Enter" && loginSubmit()}
        />
        <Button
          text={"로그인"}
          className={"Signup_main_button"}
          onClick={loginSubmit}
        ></Button>
        <div className={`notice${diff}`}>
          <img src={notice}></img>
          <span>아이디 또는 비밀번호가 일치하지 않습니다.</span>
        </div>
      </div>
    </div>
  );
};

export default Simplelogin;
