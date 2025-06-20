import "./Quizcomplete.css";
import "./Home.css";
import Footer from "../components/Footer";
import { useState } from "react";
import { getDays } from "../utils/getDays";
import { getMonth } from "../utils/getMonth";
import Button from "../components/Button";
import Days from "../components/Days";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Quizcomplete = () => {
  const [state, setState] = useState(1);
  const [date, setDate] = useState(new Date());
  const [radio, setRadio] = useState("week");
  const [quizRadio, setQuizRadio] = useState("fail");
  const location = useLocation();

  const nav = useNavigate();

  return (
    <div className="Home">
      <section className="HomeHeader">
        <div className="HomeHeader_date">{date.getDate()}</div>
        <div className="HomeHeader_subDate">
          <div className="HomeHeader_subDate_top">{getDays(date.getDay())}</div>
          <div className="HomHeader_subDate_bottom">
            <span>{getMonth(date.getMonth() + 1)}</span>
            <span>{date.getFullYear()}</span>
          </div>
        </div>
        <div className="HomHeader_radio">
          <div className="buttonGroup">
            <Button
              className={`monthButton ${radio === "month" ? "active" : ""}`}
              text={"월간"}
              onClick={() => setRadio("month")}
            ></Button>
            <Button
              className={`weekButton ${radio === "week" ? "active" : ""}`}
              text={"주간"}
              onClick={() => setRadio("week")}
            ></Button>
          </div>
        </div>
      </section>
      <section className="HomeMain">
        <div>
          <Days mode={radio} date={date}></Days>
        </div>
        <div className="QuizMain_button">
          <Button
            className={`button ${quizRadio === "fail" ? "quizActive" : ""}`}
            text={"오답 문제"}
            onClick={() => setQuizRadio("fail")}
          ></Button>
          <Button
            className={`button ${quizRadio === "success" ? "quizActive" : ""}`}
            text={"정답 문제"}
            onClick={() => setQuizRadio("success")}
          ></Button>
        </div>
        <div className="QuizMain">
          <div className="QuizMain_headerText">
            <span>총 2문제</span>
            <span
              className={`headerText_right${
                quizRadio === "success" ? "_current" : ""
              }`}
            >
              <span className="right_left">●</span> 정답
              <span className="right_right"> ●</span> 선택
            </span>
            <span
              className={`headerText_right${
                quizRadio === "success" ? "" : "_current"
              }`}
            >
              <span className="right_right"> ●</span> 정답
            </span>
          </div>
          <div className="QuizMain_question">
            <div>
              <Button className={"badge"} text={"상식"}></Button>
              <Button className={"badge"} text={"중상"}></Button>
            </div>
            <div className="question_header">
              다음 중 두개의 대륙에 걸쳐 있는 나라가 아닌 것은?
            </div>
            <div className="question_button">
              <div className="question_button_top">
                <button>러시아</button>
                <button>터키</button>
              </div>
              <div className="question_button_bottom">
                <button>이집트</button>
                <button>아르헨티나</button>
              </div>
            </div>
            <div className="question_footer">
              <div className="question_footer_header">🔍 해설</div>
              <div>sdf</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quizcomplete;
