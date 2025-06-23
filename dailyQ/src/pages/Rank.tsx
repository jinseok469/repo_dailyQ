import "./Rank.css";
import quizHeader from "../assets/quizHeader.png";
import flower from "../assets/flower.png";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import axios, { AxiosError } from "axios";

type userRankType = 
  {
  correct_rate: number | null,
    level: number | null,
    nickname:  string |null,
    profile:  string ,
    question_count: number | null,
    ranking:number | null,
  }

type regionRankType = 
    {
      correct_rate: number | null,
      level:number | null,
      nickname: string |null,
      profile: string ,
      question_count: number | null,
      ranking: number | null,
    }
   
 


const Rank = () =>{
  const location = useLocation();
  const [userState,setUserState] = useState<userRankType | null>(null);
  const [regionState, setRegionState] = useState<regionRankType[] | null>(null);
  const [region, setRegion] = useState<string| null>("");


  useEffect(()=>{
    const token = localStorage.getItem("token");
    const getRank = async ()=>{
      try{

        const res = await axios.get("http://3.38.212.8:8000/ranking",{
          headers : {
            "access-token" : `Bearer ${token}`
          }
        })
          setUserState(res.data?.user_ranking);
          setRegionState(res.data?.ranking_info);
          setRegion(res?.data?.region);
          console.log(res.data);
      }catch(err){
        const error = err as AxiosError;
        console.log(error?.response?.data)
      }
    }
    getRank();
  },[])
  return (
    <div className="Rank">
      <div className="Rank_header"><img src={quizHeader}></img></div>
      <div className="Rank_myRank">
        <div className="myRank_text">나의 랭킹</div>
        <div className="myRank_container">
          <div className="rank">{userState?.ranking}</div>
          <div className="img"><img src={userState?.profile}></img></div>
          <div className="container">
            <div className="container_top">
              <button className="top_button">Lv. {userState?.level}</button>
              <span className="top_text">{userState?.nickname}</span>
            </div>
            <div className="container_bottom">
              <span>📝 {userState?.question_count}</span>
              <span>🎯 {userState?.correct_rate}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="Rank_regionRank">
        <div className="regionRank_text">🥇 {region} 랭킹 🥈</div>
        <div className="regionRank_subText">주간 정답률 기준</div>
      </div>
      {regionState?.map((q,i)=>
       <div className="myRank_container" key={i}>
          <div className="rank">{q?.ranking}</div>
          <div className="img"><img src={q?.profile}></img></div>
          <div className="container">
            <div className="container_top">
              <button className="top_button">Lv. {q?.level}</button>
              <span className="top_text">{q?.nickname}</span>
            </div>
            <div className="container_bottom">
              <span>📝 {q?.question_count}</span>
              <span>🎯 {q?.correct_rate}</span>
            </div>
          </div>
        </div>
        )}
        <Footer location={location}></Footer>
    </div>
  )
}

export default Rank;