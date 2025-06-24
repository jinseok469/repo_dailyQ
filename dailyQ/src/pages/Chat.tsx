import "./Chat.css";
import quizHeader from "../assets/quizHeader.png";
import Footer from "../components/Footer";
import { useState,useEffect } from "react";
import tree from "../assets/tree.png";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ChatType = {
  last_message: string,
    last_message_time: string,
    level: number,
    nickname: string,
    profile: string,
    unread_count: number,
    user_id: number
}

type UserSerchType = {
    id: number,
    level: number,
    name: string,
    profile: string
}


const Chat = () =>{
  const[active, setActive] = useState<String>("chat");
  const [state, setState] = useState<number>(0);
  const [chat, setChat] = useState<ChatType[]|null>(null);
  const [user,setUser] = useState<UserSerchType[] | null>(null);
  const [input, setInput] = useState<string>("");
  const location = useLocation();
  const nav = useNavigate();
  const getUser = async () =>{
    const token = localStorage.getItem("token");
    if(input){
    try{
      const res = await axios.get(`http://3.38.212.8:8000/user/search?keyword=${input}`,{
        headers:{
          "access-token" : `Bearer ${token}`
        }
      })
      setUser(res?.data);
      setInput("");
    }catch(err){
      const error = err as AxiosError;
      console.log(error?.response?.data);
    }
  }else{
    return;
  }
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
      const getChat = async () =>{
        try{
          const res = await axios.get("http://3.38.212.8:8000/chat/list",{
            headers : {
              "access-token" : `Bearer ${token}`
            }
          })
              setState(res?.data?.length);
              setChat(res?.data);
        }catch(err){
          const error = err as AxiosError
          console.log(error?.response?.data)
        }
      }
      getChat();
  },[])


  return (
    <div className="Chat">
      <div className="Chat_header">
        <img src={quizHeader}></img>
      </div>
      <div className="Chat_main">
      <div className="main_radio">
        <button className={active === "chat" ? "active1" : ""} onClick={()=>setActive("chat")}>💬 채팅</button>
        <button className={active === "friend" ? "active1" : ""} onClick={()=>setActive("friend")}>👤 친구 찾기</button>
      </div>
      {state === 0 &&
      <div className={`main_zero_${active}`}>
      <span className="zero_top">😅 채팅방이 존재하지 않아요!</span> 
      <span className="zero_bottom">친구 찾기를 통해 채팅을 시작해보세요!</span>
      </div>}
      {state > 0 &&
      <div className={`main_chat_${active}`}>
        {chat?.map((q,i)=>
        <button className="main_chat_container" key={i} onClick={()=>nav("/chattingroom",{
            state : {
              user_id : q?.user_id
            }
          })}>
          <img src={q?.profile}></img>
          <div className="containerRight">
            <div className="align-items"><span className="containerLevel">Lv.{q?.level}</span><span className="containerText"> {q?.nickname}</span> </div>
            <div className="containerMessage">{q?.last_message}</div>
         
          </div>
          <div className="time">{q?.last_message_time}</div>
          </button>
          )}
      </div>
      }
      <div className={`main_friend_${active}`}>
       <div className="friendSearchBox">
  <input onKeyDown={(e)=>e.key ==="Enter" && getUser()} className="friendSearch" type="text" placeholder=" 친구 검색" value={input} onChange={(e)=>setInput(e.target.value)}/>
  <button className="friendSearchBtn" onClick={getUser}>검색</button>
  <div className="friend_container">
  {user?.map((q,i)=>
   <div className="main_friend_container" key={i}>
          <img src={q?.profile}></img>
          <div className="containerRight">
            <div className="align-items"><span className="containerLevel">Lv.{q?.level}</span><span className="friendText">{q?.name}</span> </div>
          </div>
          <button className="chatting" onClick={()=>nav("/chattingroom",{
            state : {
              user_id : q?.id
            }
          })}>채팅하기</button>
          </div>
          )}
          </div>
</div>

      </div>

      </div>
      <Footer location={location}></Footer>
    </div>
  )
}

export default Chat;