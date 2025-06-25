import "./Chattingroom.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import flower from "../assets/flower.png";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {useState, useEffect,useRef} from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

type chat_detailType = {
   content: string,
      created_at: string,
      is_user_send: boolean,
      user_id: number,
}

type user_infoType = {
   level: number,
    nickname: string,
    profile: string
}
const Chattingroom = ()=>{
  const [chat_detail, setChat_detail] = useState<chat_detailType[]|null>(null);
  const [user_info, setUser_info] = useState<user_infoType|null>(null);
  const [input, setInput] = useState<string>("");
  const location = useLocation();
  const nav = useNavigate();
  const lastMessageRef = useRef<HTMLDivElement>(null);
   const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage?.getItem("token");

    const ws = new WebSocket(`ws://3.38.212.8:8000/chat/ws?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      // 필요하면 초기 메시지 전송
      // ws.send(JSON.stringify({ type: "join", user_id: 10 }));
    };

    ws.onmessage = (event) => {
      console.log("📩 Message received:", event.data);
     try {
    const data = JSON.parse(event.data);

    const newMessage: chat_detailType = {
      user_id: data.user_id,
      content: data.content,
      created_at: data.created_at ,
      is_user_send: data.is_user_send
    };

    setChat_detail(prev => prev ? [...prev, newMessage] : [newMessage]);
  } catch (err) {
    console.error("❌ Failed to parse WebSocket message", err);
  }
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.onclose = () => {
      console.warn("🔌 WebSocket closed");
    };

    // 컴포넌트 언마운트 시 소켓 종료
    return () => {
      ws.close();
    };
  }, []);



 

useEffect(() => {
  lastMessageRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
}, [chat_detail]); // chat_detail이 바뀔 때마다 스크롤 내려줌
  if(!location?.state.user_id){
     Swal.fire({
     icon: 'error',
     title: '오류 발생!',
     text: '정상적이지 않은 접근입니다!',
     confirmButtonText: '확인',
     confirmButtonColor:'#00664F'
   });
    return <Navigate to="/chat" replace={true}></Navigate>
  }
  const postMessage = async ()=>{
    console.log("🔼 postMessage 호출됨");
    const token = localStorage.getItem("token");
    if(input === ""){
      return;
    }
    const newItem = {
      content : input,
      user_id : location?.state.user_id,
    }
    try{
      const res = await axios.post("https://dailyq.jeeyeonnn.site/chat/send",newItem,{
        headers : {
          "access-token": `Bearer ${token}`
        }
      })
      setInput("");
      const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes().toString().padStart(2, "0");
const ampm = hours < 12 ? "AM" : "PM";

hours = hours % 12;
if (hours === 0) hours = 12;

const customFormattedTime = `${ampm} ${hours}:${minutes}`;
       const newMessage: chat_detailType = {
      user_id: -1,
      content: input,
      created_at:  customFormattedTime,
      is_user_send: true
    };
     setChat_detail(prev => prev ? [...prev, newMessage] : [newMessage]);
      lastMessageRef.current?.scrollIntoView({ behavior: "auto", inline: "end" })
    }catch(err){
      const error = err as AxiosError
      console.log(error?.response?.data);
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const getChat = async ()=>{
      try{
        const res = await axios.get(`https://dailyq.jeeyeonnn.site/chat/detail?user_id=${location?.state?.user_id}`,{
          headers : {
            "access-token" : `Bearer ${token}`
          }
        })
        console.log(res?.data);
        setChat_detail(res?.data.chat_detail);
        setUser_info(res?.data?.user_info);
      }catch(err){
        const error = err as AxiosError
        console.log(error?.response?.data);
      }
    }
    getChat();
  },[])

  useEffect(() => {
  const handleResize = () => {
    // 키보드 올라왔을 때
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
    }, 0);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);


  return(
    <div className="Chattingroom">
      <div className="Chattingroom_header">
        <Button text={"< \u00a0채팅방으로 돌아가기"} onClick={()=>nav("/chat")} className="Chattingroom_header_button"></Button>
      </div>
      <div className="Chattingroom_header_user">
        <span className="level">Lv. {user_info?.level}</span><span className="userName">{user_info?.nickname}</span>
      </div>
      <div className="Chattingroom_main">
        {chat_detail?.map((q,i)=>
        q?.is_user_send === false || q?.user_id === location?.state.user_id ?
        <div className="main_another" key={i} ref={i === chat_detail.length - 1 ? lastMessageRef : null}>
          <img src={user_info?.profile} ></img>
          <div className="info">
             <div className="info_name_wrapper">
            <div className="info_name">{user_info?.nickname}</div>
            </div>
            <div className="info_message">{q?.content}</div>
          </div>
          <div className="info_date">{q?.created_at}</div>
        </div>
:
        <div className="main_mine" key={i} ref={i === chat_detail.length - 1 ? lastMessageRef : null}>
          <div className="mine">
            <div className="info_date">{q?.created_at}</div>
            <div className="mine_message">{q?.content}</div>
          </div>
        </div>
        )}
      </div>
  
     <div className="message_submit">
  <div className="chat_input_wrapper">
    <textarea rows={1} className="chat_input"  value={input} onChange={(e)=>setInput(e.target.value)} onKeyUp={(e)=> {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // textarea 줄바꿈 방지
    postMessage();
  }
}} onFocus={()=>{lastMessageRef.current?.scrollIntoView({ behavior: "auto", inline: "end" }) ; console.log("sdfdsf")}}/>
    <button className="chat_button" onClick={postMessage} >전송</button>
  </div>
</div>

      <Footer location={location}></Footer>
    </div>
  )
}

export default Chattingroom;