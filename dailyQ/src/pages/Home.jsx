import "./Home.css";
import { useState } from "react";
import { getDays } from "../utils/getDays";
import { getMonth } from "../utils/getMonth";
import Button from "../components/Button";
import Days from "../components/Days";
import quizbutton from "../assets/quizbutton.png";
import rankingbutton from "../assets/rankingbutton.png";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [radio, setRadio] = useState("week");

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
        <Days mode={radio} date={date} />

        <div className="HomeMain_Quizbutton">
          <button>
            <img src={quizbutton}></img>
          </button>
        </div>
        <div className="HomeMain_RankButton">
          <h3>현재 남양주에서 내 순위는?</h3>
          <button>
            <img src={rankingbutton}></img>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
