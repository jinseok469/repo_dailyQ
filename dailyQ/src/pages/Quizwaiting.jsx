import "./Quizwaiting.css";
import { useEffect, useState } from "react";
import QuizHeader from "../assets/QuizHeader.png";
import Button from "../components/Button";
import Notice from "../assets/Notice.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import spinner2 from "../assets/spinner2.gif";
const Quizwaiting = () => {
  const [barState, setBarState] = useState(1);
  const [number, setNumber] = useState(0);
  const [submit, setSubmit] = useState("");
  const [date, setDate] = useState(new Date());
  const nav = useNavigate();
  const [view, setView] = useState({
    success: "",
    fail: "",
  });
  const [quiz, setQuiz] = useState([
    {
      answer: null,
      correct_rate: null,
      difficult: null,
      explanation: null,
      question: null,
      question_id: null,
      select_1: null,
      select_2: null,
      select_3: null,
      select_4: null,
      subject: null,
    },
  ]);

  const todayDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const quizSubmit = async () => {
    const token = localStorage.getItem("token");
    const newItem = {
      choose: number,
      question_id: quiz[barState - 1].question_id,
    };
    try {
      const res = await axios.post(
        "https://dailyq.jeeyeonnn.site/user/quiz",
        newItem,
        {
          headers: {
            "access-token": `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(newItem);
      console.log("정답 제출 희망");
    }
  };
  console.log(barState);
  console.log(QuizHeader);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          `https://dailyq.jeeyeonnn.site/user/quiz?date=${todayDate}`,
          {
            headers: {
              "access-token": `Bearer ${token}`,
            },
          }
        );
        setQuiz(res.data.questions);
        console.log("solved =" + res.data.solved_index);
        setBarState(() => res?.data?.solved_index + 1);
      } catch (err) {
        console.log(err?.detail);
      }
    };
    getQuiz();
  }, [todayDate]);
  return (
    <div className="Quizwaiting">
      <div className="Quizwaiting_header">
        <img src={QuizHeader}></img>
      </div>
      <div className="Quizwaiting_bar">
        <div className={`Quizwaiting_bar_inner_${barState}`}></div>
      </div>
      <div className="Quizwaiting_bar_text">{barState} / 10</div>
      <div className={`Quizwaiting_main_${submit}`}>
        <div className="Quizwaiting_badge">
          <Button
            className={"badge"}
            text={quiz[barState - 1].subject}
          ></Button>
          <Button
            className={"badge"}
            text={quiz[barState - 1].difficult}
          ></Button>
        </div>
        <div className="Quizwaiting_text">{quiz[barState - 1].question}</div>
        <div className="Quizwaiting_button">
          <button
            onClick={() => setNumber(1)}
            className={number === 1 ? "actives" : ""}
          >
            {quiz[barState - 1].select_1}
          </button>
          <button
            onClick={() => setNumber(2)}
            className={number === 2 ? "actives" : ""}
          >
            {quiz[barState - 1].select_2}
          </button>
          <button
            onClick={() => setNumber(3)}
            className={number === 3 ? "actives" : ""}
          >
            {quiz[barState - 1].select_3}
          </button>
          <button
            onClick={() => setNumber(4)}
            className={number === 4 ? "actives" : ""}
          >
            {quiz[barState - 1].select_4}
          </button>
          <button
            className="submit"
            onClick={() => {
              if (number !== 0) {
                setSubmit("done");
                quizSubmit();
              } else {
                Swal.fire({
                  icon: "error",
                  title: "오류 발생!",
                  text: "정답을 선택해주세요!",
                  confirmButtonText: "확인",
                  confirmButtonColor: "#00664F",
                });
              }
              if (number === quiz[barState - 1].answer) {
                setView((prev) => {
                  return {
                    success: "",
                    fail: "_fail",
                  };
                });
              } else {
                setView((prev) => {
                  return {
                    success: "_fail",
                    fail: "",
                  };
                });
              }
            }}
          >
            제출
          </button>
        </div>
      </div>
      <div className={`Quizwaiting_success_${submit}`}>
        <div className="Quizwaiting_main_success">
          <div className={`Quizwaiting_maing_success_text${view.success}`}>
            ⭕️ 정답입니다
          </div>
          <div className={`Quizwaiting_maing_success${view.fail}`}>
            ❌ 틀렸습니다
          </div>
          <div className="Quizwaiting_maing_success_subText">
            {quiz[barState - 1].explanation}
          </div>
          <button
            className={`next_${barState === 10 ? "" : "done"}`}
            onClick={() => {
              if (barState < 10) {
                setBarState(barState + 1);
              }
              setSubmit("");
              setNumber(0);
            }}
          >
            다음 문제 풀기
          </button>
          <div className={`next_${barState === 10 ? "done" : ""}`}>
            <div className="successText">
              모든 문제 완료! 결과를 확인 해보세요👏
            </div>
            <button onClick={() => nav("/todayresult")}>결과 보러 가기</button>
          </div>
        </div>
        <div className="Quizwaiting_main_success_footer">
          ❗️ 이 문제는 {quiz[barState - 1].correct_rate}
          %가 정답을 맞췄어요!
        </div>
      </div>
    </div>
  );
};

export default Quizwaiting;
