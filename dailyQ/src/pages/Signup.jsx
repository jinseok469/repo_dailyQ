import "./Signup.css";
import Header from "../components/Header";
import Button from "../components/Button";

const Signup = () => {
  return (
    <div className="Signup">
      <Header></Header>
      <Button
        text={`< 구글 로그인으로 돌아가기`}
        className={"Signup_header_button"}
      ></Button>
      <div className="Signup_main">
        <input type="text" placeholder="아이디를 입력하세요." maxLength={12} />
        <input type="text" placeholder="비밀번호를 입력하세요." />
        <input type="text" placeholder="비밀번호를 입력하세요." />
        <Button text={"회원가입"} className={"Signup_main_button"}></Button>
      </div>
    </div>
  );
};

export default Signup;
