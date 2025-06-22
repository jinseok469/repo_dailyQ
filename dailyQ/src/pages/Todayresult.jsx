import "./Todayresult.css";
import quizHeader from "../assets/quizHeader.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Todayresult = () => {
  const nav = useNavigate();
  const [state, setState] = useState({
    comment: null,
    correct_rate: null,
    difficult: [
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
    ],
    subject: [
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
      {
        correct: null,
        name: null,
        total: null,
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getResult = async () => {
      try {
        const res = await axios.get("http://3.38.212.8:8000/user/quiz/result", {
          headers: {
            "access-token": `Bearer ${token}`,
          },
        });
        setState(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err?.data.default);
      }
    };
    getResult();
  }, []);

  return (
    <div className="Todayresult">
      <div className="Todayresult_header">
        <img src={quizHeader}></img>
      </div>
      <div className="TodayResult_header_text">📝 오늘의 문제풀이 결과</div>
      <div className="TodayResult_grade">
        <div className="grade_header">난이도별 결과</div>
        <div className="grade">
          <div className="left">상</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.difficult[0].correct / state.difficult[0].total) *
                    100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {state.difficult[0].correct} / {state.difficult[0].total}
        </div>
        <div className="grade">
          <div className="left">중상</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.difficult[1].correct / state.difficult[1].total) *
                    100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {" "}
          {state.difficult[1].correct} / {state.difficult[1].total}
        </div>
        <div className="grade">
          <div className="left">중</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.difficult[2].correct / state.difficult[2].total) *
                    100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {" "}
          {state.difficult[2].correct} / {state.difficult[2].total}
        </div>
        <div className="grade">
          <div className="left">중하</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.difficult[3].correct / state.difficult[3].total) *
                    100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {" "}
          {state.difficult[3].correct} / {state.difficult[3].total}
        </div>
        <div className="grade">
          <div className="left">하</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.difficult[4].correct / state.difficult[4].total) *
                    100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {" "}
          {state.difficult[4].correct} / {state.difficult[4].total}
        </div>
      </div>
      <div className="TodayResult_category">
        <div className="grade_header">주제별 결과</div>
        <div className="grade">
          <div className="left">상식</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.subject[0].correct / state.subject[0].total) * 100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {state.subject[0].correct} / {state.subject[0].total}
        </div>
        <div className="grade">
          <div className="left">언어</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.subject[1].correct / state.subject[1].total) * 100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {state.subject[1].correct} / {state.subject[1].total}
        </div>
        <div className="grade">
          <div className="left">수/과학</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.subject[2].correct / state.subject[2].total) * 100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {state.subject[2].correct} / {state.subject[2].total}
        </div>
        <div className="grade">
          <div className="left">시사</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.subject[3].correct / state.subject[3].total) * 100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {state.subject[3].correct} / {state.subject[3].total}
        </div>
        <div className="grade">
          <div className="left">예술</div>
          <div className="right">
            <div
              className={`right_bar_${
                Math.round(
                  ((state.subject[4].correct / state.subject[4].total) * 100) /
                    10
                ) * 10
              }`}
            ></div>
          </div>
        </div>
        <div className="right_bar_text">
          {state.subject[4].correct} / {state.subject[4].total}
        </div>
      </div>
      <div className="Todayresult_footer">
        <div className="footer_header">
          오늘의 정답률 <span className="score"> {state.correct_rate}</span>%
        </div>
        <div className="footer_main">{state.comment}</div>
        <div>
          <button className="gohome" onClick={() => nav("/home")}>
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todayresult;
