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
import axios from "axios";
const Quizcomplete = () => {
  const [state, setState] = useState({
    today_exam: {
      correct: {
        count: null,
        questions: [
          {
            answer: null,
            difficult: null,
            explanation: null,
            question: null,
            select_1: null,
            select_2: null,
            select_3: null,
            select_4: null,
            subject: null,
            user_select: null,
          },
        ],
      },
      incorrect: {
        count: null,
        questions: [
          {
            answer: null,
            difficult: null,
            explanation: null,
            question: null,
            select_1: null,
            select_2: null,
            select_3: null,
            select_4: null,
            subject: null,
            user_select: null,
          },
        ],
      },
    },
  });

  const [date, setDate] = useState(new Date());
  const [radio, setRadio] = useState("week");
  const [quizRadio, setQuizRadio] = useState("fail");
  const location = useLocation();
  const [monthlyExam, setMonthlyExam] = useState([]);
  const nav = useNavigate();
  const todayDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          `http://3.38.212.8:8000/user/monthly?date=${todayDate}`,
          {
            headers: {
              "access-token": `Bearer ${token}`,
            },
          }
        );
        setState(res.data.today_exam);
        setMonthlyExam(res.data.monthly_exam);
      } catch (err) {
        console.log(err?.message);
      }
    };
    getQuiz();
  }, [todayDate]);

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
          <Days mode={radio} date={date} monthlyExam={monthlyExam}></Days>
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

        <div className={`QuizMain_fail_${quizRadio}`}>
          <div className="QuizMain_headerText">
            <span>총 {state.incorrect?.count}문제</span>
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
          {state.incorrect?.questions?.map((q, i) => (
            <div className="QuizMain_question" key={i}>
              <div>
                <Button className={"badge"} text={q.subject}></Button>
                <Button className={"badge"} text={q.difficult}></Button>
              </div>
              <div className="question_header">{q.question}</div>
              <div className="question_button">
                <div className="question_button_top">
                  <button
                    className={`${1 === q.answer ? "incorrect " : ""}${
                      1 === q.user_select ? "userSelect" : ""
                    }
                  `}
                  >
                    {q.select_1}
                  </button>
                  <button
                    className={`${2 === q.answer ? "incorrect " : ""}${
                      2 === q.user_select ? "userSelect" : ""
                    }
                  `}
                  >
                    {q.select_2}
                  </button>
                </div>
                <div className="question_button_bottom">
                  <button
                    className={`${3 === q.answer ? "incorrect " : ""}${
                      3 === q.user_select ? "userSelect" : ""
                    }
                  `}
                  >
                    {q.select_3}
                  </button>
                  <button
                    className={`${4 === q.answer ? "incorrect " : ""}${
                      4 === q.user_select ? "userSelect" : ""
                    }
                  `}
                  >
                    {q.select_4}
                  </button>
                </div>
              </div>
              <div className="question_footer">
                <div className="question_footer_header">🔍 해설</div>
                <div>{q.explanation}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`QuizMain_success_${quizRadio}`}>
          <div className="QuizMain_headerText">
            <span>총 {state.correct?.count}문제</span>
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
          {state.correct?.questions?.map((q, i) => (
            <div className="QuizMain_question" key={i}>
              <div>
                <Button className={"badge"} text={q.subject}></Button>
                <Button className={"badge"} text={q.difficult}></Button>
              </div>
              <div className="question_header">{q.question}</div>
              <div className="question_button">
                <div className="question_button_top">
                  <button className={1 === q.answer ? "correct" : ""}>
                    {q.select_1}
                  </button>
                  <button className={2 === q.answer ? "correct" : ""}>
                    {q.select_2}
                  </button>
                </div>
                <div className="question_button_bottom">
                  <button className={3 === q.answer ? "correct" : ""}>
                    {q.select_3}
                  </button>
                  <button className={4 === q.answer ? "correct" : ""}>
                    {q.select_4}
                  </button>
                </div>
              </div>
              <div className="question_footer">
                <div className="question_footer_header">🔍 해설</div>
                <div>{q.explanation}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer location={location}></Footer>
    </div>
  );
};

export default Quizcomplete;
