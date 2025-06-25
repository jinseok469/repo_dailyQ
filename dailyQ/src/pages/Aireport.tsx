import "./Aireport.css";
import quizHeader from "../assets/quizHeader.png";
import aiHeader from "../assets/aiHeader.png";
import backButton from "../assets/backButton.png";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios, { AxiosError } from "axios";
import spinner from "../assets/spinner.gif";

type AireportType = {
  content: [
   string,string,string,string
  ],
  title: [
   string,string
  ]
}
const Aireport = () =>{
  const nav = useNavigate();
  const [loading, setLoding] = useState<boolean>(true);
  const [date, setDate] = useState<any>(new Date());
  const [report,setReport] = useState<AireportType|null>(null);
  const todayDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const getAiText = async () =>{
      try{
        setLoding(true)
        const res = await axios.get(`https://dailyq.jeeyeonnn.site/user/today-report?date=${todayDate}`,{
          headers:{
            "access-token" : `Bearer ${token}`
          }
        })
        setReport(res?.data);
      }catch(err){
        const error = err as AxiosError
        console.log(error?.response?.data);
      }finally{
        setLoding(false)
      }
    }
    getAiText();
  },[])


  return(
    <div className="Aireport">
      <div className="Aireport_header"><img src={quizHeader}></img></div>
      <div className="aiHeader"><img  src={aiHeader}></img></div>
      <div className="Aireport_main">
      {loading  ?
 (   
        <div className="spinner"><img src={spinner} alt="" />
        <div className="font">오늘의 학습 리포트를 열심히 만드는 중...🧠</div>
        <div className="font">조금만 기다려주세요!</div>
        </div> 
 )
: (
  <>
        <div className="Aireport_main_header">
      <div className="header_top">{report?.title[0]}</div>
      <div className="header_bottom">"{report?.title[1]}"</div>
        </div>
        <div className="main_text">
          {report?.content[0]}<br></br>

          <br></br>
          {report?.content[1]}<br></br>
          <br></br>
          {report?.content[2]}<br></br>
          <br></br>
          {report?.content[3]}<br></br>
          <br></br>
        </div>
       </> )  }
      </div>
    {!loading  &&
      <div className="main_footer">
        <button onClick={()=>nav("/person")}><img src={backButton}></img></button>
      </div>
}
    </div>
  )
}

export default Aireport;