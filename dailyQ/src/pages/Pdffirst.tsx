import "./Pdffirst.css";
import quizHeader from "../assets/quizHeader.png";
import {useEffect, useState} from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { forwardRef, useImperativeHandle } from "react";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
type questionType = {
   difficult: string,
      question: string,
      select_1: string,
      select_2: string,
      select_3: string,
      select_4: string,
      subject: string
}

type explanationType = {
   
      answer: string,
      explanation: string
}
const Pdffirst = forwardRef((props, ref) =>{
  const nav = useNavigate();
  const [state,setState] = useState<number>(0);
  const [date, setDate] = useState<any>(new Date());
  const [question, setQuestion] = useState<questionType[]|null>(null)
  const [question2, setQuestion2] = useState<questionType[]|null>(null)
  const [explan,setExplan] = useState<explanationType[]|null>(null);
   useImperativeHandle(ref, () => ({
    downloadPdf,
  }));
  const downloadPdf = async () => {
  const pdf = new jsPDF("p", "mm", "a4"); // portrait, millimeter, A4

  const pageIds = ["pdf_1", "pdf_2", "pdf_3"];
  if(state === 1){
   Swal.fire({
  icon: 'error',
  title: '오류 발생!',
  text: '오늘의 문제를 풀어주세요!',
  confirmButtonText: '확인',
  confirmButtonColor:'#00664F'
});
    return;
  }
  for (let i = 0; i < pageIds.length; i++) {
    const el = document.querySelector(`.${pageIds[i]}`) as HTMLElement;
    if (!el) continue;

    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    if (i !== 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  }
  pdf.save(`오늘의_문제_${todayDate}`);
};

   const todayDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const getPdf = async () =>{
    try{
      const res = await axios.get(`https://dailyq.jeeyeonnn.site/user/quiz/pdf?date=${todayDate}`,{
        headers: {
          "access-token" : `Bearer ${token}`
        }
      })
      setQuestion(res?.data?.question_1);
      setQuestion2(res?.data?.question_2);
      setExplan(res?.data?.explanations);
   
    }catch(err){
      const error = err as AxiosError
      console.log(error?.response?.data);
      setState(1);
    }
  }
  getPdf();
  },[])
  return(
    <div className="Pdffirst">
      <div className="Pdffirst_header"><img src={quizHeader}></img> </div>
     <div className="Pdffirts_main">
      <div className="pdf_1">
  <div className="main">
    {/* 왼쪽 */}
    <div className="main_left">
      <div className="main_header">📝 문제</div>
      {question?.slice(0, 3).map((q, i) => (
        <div className="main_middle" key={`left-${i}`}>
          <div>
            <button className="main_badge">{q.subject}</button>
            <button className="main_badge">{q.difficult}</button>
          </div>
          <div className="question_header">{i+1+` . `}{q.question}</div>
          <div className="question_button">
            <div className="question_button_top">
              <button>{q.select_1}</button>
              <button>{q.select_2}</button>
           
              <button>{q.select_3}</button>
              <button>{q.select_4}</button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* 오른쪽 */}
    <div className="main_right">
      {question?.slice(3, 6).map((q, i) => (
        <div className="main_middle" key={`right-${i}`}>
          <div>
            <button className="main_badge">{q.subject}</button>
            <button className="main_badge">{q.difficult}</button>
          </div>
          <div className="question_header">{i+4+` . `}{q.question}</div>
          <div className="question_button">
            <div className="question_button_top">
              <button>{q.select_1}</button>
              <button>{q.select_2}</button>
           
              <button>{q.select_3}</button>
              <button>{q.select_4}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    <div className="pdf_2">
  <div className="main">
    {/* 왼쪽 */}
    <div className="main_left_2">
      <div className="main_header"></div>
      {question2?.slice(0, 3).map((q, i) => (
        <div className="main_middle" key={`left-${i}`}>
          <div>
            <button className="main_badge">{q.subject}</button>
            <button className="main_badge">{q.difficult}</button>
          </div>
          <div className="question_header">{i+1 + ` . `}{q.question}</div>
          <div className="question_button">
            <div className="question_button_top">
              <button>{q.select_1}</button>
              <button>{q.select_2}</button>
          
              <button>{q.select_3}</button>
              <button>{q.select_4}</button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* 오른쪽 */}
    <div className="main_right">
      {question2?.slice(3, 6).map((q, i) => (
        <div className="main_middle" key={`right-${i}`}>
          <div>
            <button className="main_badge">{q.subject}</button>
            <button className="main_badge">{q.difficult}</button>
          </div>
          <div className="question_header">{i+4 + ` . `}{q.question}</div>
          <div className="question_button">
            <div className="question_button_top">
              <button>{q.select_1}</button>
              <button>{q.select_2}</button>
          
              <button>{q.select_3}</button>
              <button>{q.select_4}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
 <div className="pdf_3">
  <div className="main">
    {/* 왼쪽 */}
    <div className="main_left_2">
      <div className="main_header">🔍 해설</div>
      {explan?.slice(0, 5).map((q, i) => (
        <div className="main_middle" key={`left-${i}`}>
         
          <div className="question_headers">{i+1 + ` . `}{q.answer}</div>
         <div className="question_mains">
          {q?.explanation}
         </div>
        </div>
      ))}
    </div>

    {/* 오른쪽 */}
    <div className="main_rights">
      {explan?.slice(5, 10).map((q, i) => (
         <div className="main_middle" key={`left-${i}`}>
         
          <div className="question_headers">{i+6 + ` . `}{q.answer}</div>
         <div className="question_mains">
          {q?.explanation}
         </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
<Footer></Footer>
    </div>
  )
});

export default Pdffirst;