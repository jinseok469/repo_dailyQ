import "./Person.css";
import quizHeader from "../assets/quizHeader.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState,useRef } from "react";
import fifty from "../assets/fifty.png";
import seventyfive from "../assets/seventyfive.png";
import { Radar } from "react-chartjs-2";
import { RadialLinearScale, PointElement, LineElement, Filler } from "chart.js";
import levelUp from "../assets/levelUp.png";
import pink from "../assets/pink.png";
import { useLocation, useNavigate } from "react-router-dom";
import aiWrong from "../assets/aiWrong.png";
import wrongQuiz from "../assets/wrongQuiz.png";
import axios, { AxiosError } from "axios";
import { Location } from "react-router-dom";
import aiButton from "../assets/aiButton.png";
import pdfButton from "../assets/pdfButton.png";
import Footer from "../components/Footer";
import Pdffirst from "./Pdffirst";

interface UserResponse {
  created_date: string;
  level: number;
  levelup_info: {
    current: number;
    left: number;
    total: number;
  };
  monthly_analysis: {
    comment: string;
    current_correct_rate: number;
    pre_correct_rate: number;
    rate: string;
  };
  nickname: string;
  profile: string;
  total_date: number;
  total_question_count: number;
  subject_analysis: {
    bad:{
      name: string;
      rate: number;
    };
    good: {
      name: string | null;
      rate: number | null;
    };
    tags: {
      name: string;
      total: number;
      user: number;
    }[];
  };
  difficult_analysis: {
    bad: {
      name: string;
      rate: number;
    };
    good: {
      name: string;
      rate: number;
    };
    tags: {
      name: string;
      total: number;
      user: number;
    }[];
  };
}

type Footertype = {
  location : Location
}

type NewsType = {
  bad : string,
  good : string
}



const Person = () => {
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const [state, setState] = useState<UserResponse | null>(null);
  const [gauge , setGauge] = useState<number>(0);
  const pdfRef = useRef<any>(null);
  const nav = useNavigate();
  const [news2, setNews2] = useState<NewsType>({
    bad: "",
    good:"",
  });
  const [news , setNews] = useState<NewsType>({
    bad: "",
    good :""
  });
  ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const datas = {
  labels: ["상식", "언어", "예술", "수/과학", "시사"], // 5가지 항목
  datasets: [
    {
      data: [state?.subject_analysis.tags[0].user, state?.subject_analysis.tags[1].user, state?.subject_analysis.tags[2].user, state?.subject_analysis.tags[3].user, state?.subject_analysis.tags[4].user],
      backgroundColor: "transparent",
      borderColor: "#00664F",
      borderWidth: 3,
      pointBackgroundColor: "#00664F",
    },
    {
      data: [state?.subject_analysis.tags[0].total, state?.subject_analysis.tags[1].total, state?.subject_analysis.tags[2].total, state?.subject_analysis.tags[3].total, state?.subject_analysis.tags[4].total],
      backgroundColor: "transparent",
      borderColor: "#DF7B7B",
      borderWidth: 3,
      pointBackgroundColor: "#DF7B7B",
    },
  ],
};
const datasDiff = {
  labels: ["상", "하", "중하", "중", "중상"], // 5가지 항목
  datasets: [
    {
      data: [state?.difficult_analysis.tags[0].user, state?.difficult_analysis.tags[1].user, state?.difficult_analysis.tags[2].user, state?.difficult_analysis.tags[3].user, state?.difficult_analysis.tags[4].user],
      backgroundColor: "transparent",
      borderColor: "#00664F",
      borderWidth: 3,
      pointBackgroundColor: "#00664F",
    },
    {
      data: [state?.difficult_analysis.tags[0].total, state?.difficult_analysis.tags[1].total, state?.difficult_analysis.tags[2].total, state?.difficult_analysis.tags[3].total, state?.difficult_analysis.tags[4].total],
      backgroundColor: "transparent",
      borderColor: "#DF7B7B",
      borderWidth: 3,
      pointBackgroundColor: "#DF7B7B",
    },
  ],
};

const option = {
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: true, // 각 축 선 표시
        color: "#ccc", // 각 축 선 색
      },
      grid: {
        circular: true, // ⭕ 원형 그리드로 만들기
        color: "#aaa", // 원형 선 색 (더 진하게 보이게)
        lineWidth: 1.0, // 선 굵기
      },
      pointLabels: {
        font: {
          size: 13,
          weight: 700,
        },
        color: "#333", // 항목 라벨 색
      },
      ticks: {
        display: false, // ✅ 20, 40, 60 같은 숫자 숨기기
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
  elements: {
    point: {
      radius: 0, // ✅ 점 없애기
    },
    line: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  datasets: [
    {
      data: [state?.monthly_analysis.pre_correct_rate, 100-(state?.monthly_analysis.pre_correct_rate ?? 0)], // 첫 번째 도넛 (바깥)
      backgroundColor: ["#539687", "#e0e0e0"],
      borderWidth: 3,
      cutout: "50%",
      circumference: 360,
      rotation: 0,
    },
    {
      data: [state?.monthly_analysis.current_correct_rate, 100 - (state?.monthly_analysis.current_correct_rate ?? 0)], // 두 번째 도넛 (안쪽)
      backgroundColor: ["#00664F", "#e0e0e0"],
      borderWidth: 3,
      cutout: "50%", // 더 얇고 안쪽에 위치
      circumference: 360,
      rotation: 0,
    },
  ],
};

const options = {
  cutout: "50%", // 도넛 내부 비율
  rotation: 0,
  circumference: 360,
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myLevel = async () => {
      try {
        const res = await axios.get<UserResponse | null>("https://dailyq.jeeyeonnn.site/user", {
          headers: {
            "access-token": `Bearer ${token}`,
          },
        });
        setGauge(Math.round(((res?.data?.levelup_info?.current ?? 0)/ (res?.data?.levelup_info?.total ?? 0))*100))
        setState(res.data);
        if(!res.data?.subject_analysis.bad){
          setNews({
            good: "",
            bad: "good"
          })
        }else if(!res.data?.subject_analysis.good){
          setNews({
            good:"bad",
            bad: "",
          })
        }else if(!res.data?.subject_analysis.bad && !res.data?.subject_analysis.good){
          setNews({
            good:"bad",
            bad:"good"
          })
        }
        if(!res.data?.difficult_analysis.bad){
          setNews2({
            bad : "good",
            good: ""
          })
        }else if(!res.data?.difficult_analysis.good){
          setNews2({
            bad: "",
            good: "bad",
          })
        }else if(!res.data?.difficult_analysis.bad && !res.data?.difficult_analysis.good){
          setNews2({
            good:"bad",
            bad:"good"
          })
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
      }
    };
    myLevel();
  }, []);
  return (
    <div className="Person">
      <div className="Person_header">
        <img src={quizHeader}></img>
      </div>
      <div className="Person_header_img">
        <img src={state?.profile}></img>
      </div>
      <div className="Person_header_text">
        <button className="text_badge">Lv.{state?.level}</button>
        <span className="badge_text">{state?.nickname}</span>
      </div>
      <div className="Person_header_subText">탄신일 :{state?.created_date}</div>
      <div className="Person_bar_header">
        <img src={levelUp}></img>
      </div>
      <div className="Pesron_bar">
        <div className="Person_bar_gauge" style={{ width: `${gauge}%`, height: '18px', borderRadius: '20px', backgroundColor: '#00664F' }}></div>
      </div>
      <div className="bar_text">
        <span>다음 레벨까지 총 {state?.levelup_info.left}문제 남았어요!</span>
        <span>{state?.levelup_info.current} / {state?.levelup_info.total}</span>
      </div>
      <section className="Person_total">
        <div className="Person_total_top">
          <span className="top_text">⚔️ 정복 문제 수</span>
          <span className="top_number">{state?.total_question_count}</span>
        </div>
        <div className="Person_total_bottom">
          <span className="bottom_text">📆 학습 누적일</span>
          <span className="bottom_number">{state?.total_date}</span>
        </div>
        <div className="Person_average">
          <div className="average_main">
            <span className="average_chart">
              <Doughnut className="chart" data={data} options={options} />
              <div className="chart_text">
                {date.getMonth() + 1}월 정답률<br></br>
                <span className="chart_inner_text">{state?.monthly_analysis.current_correct_rate}%</span>
              </div>
            </span>
            <span className="average_text">
              정답률 <span className="percent_text">{state?.monthly_analysis.rate}</span>%!<br></br>당신의{" "}
              {date.getMonth() + 1}월,
              <br></br>{state?.monthly_analysis.comment}
            </span>
          </div>
          <div className="average_footer">
            <span>
              <img src={seventyfive}></img>
              {date.getMonth() + 1}월 평균 정답률
            </span>
            <span>
              <img src={fifty}></img>
              {date.getMonth()}월 평균 정답률
            </span>
          </div>
        </div>
        <div className="Person_average2">
          <div className="Person_average2_top">
            <span>
              <img src={seventyfive}></img>
              나의 {date.getMonth() + 1}월 평균
            </span>
            <span>
              <img src={pink}></img>
              전체 {date.getMonth() + 1}월 평균
            </span>
          </div>

          <div className="Person_average2_canvers">
            <Radar data={datas} options={option} />
          </div>
          <div className="Person_average2_footer">
            <div className={`goodnews_${news.good}`}>{state?.subject_analysis?.good?.name} 영역은 평균보다  <span> {state?.subject_analysis?.good?.rate}</span>% 앞서가고 있어요 👍</div>
            <div className={`badnews_${news.bad}`} >{state?.subject_analysis.bad.name} 영역은 평균보다
              <span> {state?.subject_analysis.bad.rate}</span>% 뒤쳐지고 있어요 💦
            </div>
          </div>
        </div>
        <div className="Person_average3">
          <div className="Person_average3_top">
            <span>
              <img src={seventyfive}></img>
              나의 {date.getMonth() + 1}월 평균
            </span>
            <span>
              <img src={pink}></img>
              전체 {date.getMonth() + 1}월 평균
            </span>
          </div>
          <div className="Person_average3_canvers">
            <Radar data={datasDiff} options={option} />
          </div>
          <div className="Person_average3_footer">
           <div className={`goodnews2_${news2.good}`}>{state?.difficult_analysis?.good?.name} 영역은 평균보다  <span> {state?.difficult_analysis?.good?.rate}</span>% 앞서가고 있어요 👍</div>
            <div className={`badnews2_${news2.bad}`} >{state?.difficult_analysis?.bad?.name} 영역은 평균보다
              <span>{state?.difficult_analysis?.bad?.rate}</span>% 뒤쳐지고 있어요 💦
            </div>
          </div>
        </div>
        <div className="Person_footer_top">
          <div>오늘의 공부,AI 선생님이 리포트로 정리해드릴게요! 🚀</div>
          <button onClick={()=>nav("/aireport")}><img src={aiButton} alt="aiwrong" ></img></button>
        </div>
        <div className="Person_footer_footer">
          <div>다시 도전! PDF로 복습하고 더 단단해져요 💪</div>
          <button onClick={()=>  {
      pdfRef?.current?.downloadPdf();
     
          }
   }><img src={pdfButton}></img></button>
        </div>
      </section>
      <Footer location={location}></Footer>
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
  <Pdffirst ref={pdfRef}/>
</div>
    </div>
  );
};

export default Person;
