import "./Home.css";
import Footer from "../components/Footer";
import { useState } from "react";
import { getDays } from "../utils/getDays";
import { getMonth } from "../utils/getMonth";
import Button from "../components/Button";
import Days from "../components/Days";
import quizbutton from "../assets/quizbutton.png";
import rankingbutton from "../assets/rankingbutton.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import quizCheck from "../assets/quizCheck.png";


const Home = () => {
  const [state, setState] = useState<any>(null);
  const [date, setDate] = useState<any>(new Date());
  const [radio, setRadio] = useState<string>("week");
  const [region, setRegion] = useState<string>("");
  const [monthlyExam, setMonthlyExam] = useState<any>([]);
  const location = useLocation();

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
        setState(
          (res?.data?.today_exam?.correct?.count ?? 0 )+
            (res?.data?.today_exam?.incorrect?.count ?? 0)
        );
        setMonthlyExam(res?.data?.monthly_exam);
      
        setRegion(res?.data?.region);
      } catch (err) {
        const error = err as AxiosError;
        console.log(error?.response?.data);
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
        <Days mode={radio} date={date} monthlyExam={monthlyExam} />

        <div className="HomeMain_Quizbutton">
          {state < 10 && 
          <button
            onClick={() =>
             nav("/quizwaiting")
            }
          >
            <img src={quizbutton}></img>
          </button>}
          {state === 10 &&  <button
            onClick={() =>
             nav("/quizcomplete")
            }
          >
            <img src={quizCheck}></img>
          </button>}
        </div>
        <div className="HomeMain_RankButton">
          <h3>현재 {region}에서 내 순위는?</h3>
          <button onClick={()=>nav("/rank")}>
            <img src={rankingbutton}></img>
          </button>
        </div>
      </section>
      <div>
        <Footer location={location}></Footer>
      </div>
    </div>
  );
};

export default Home;
