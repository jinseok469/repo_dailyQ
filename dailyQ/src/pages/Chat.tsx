import "./Chat.css";
import quizHeader from "../assets/quizHeader.png";
import Footer from "../components/Footer";
import { useState,useEffect } from "react";
import tree from "../assets/tree.png";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";

type ChatType = {
  last_message: string,
    last_message_time: string,
    level: number,
    nickname: string,
    profile: string,
    unread_count: number,
    user_id: number
}


const Chat = () =>{
  const[active, setActive] = useState<String>("chat");
  const [state, setState] = useState<number>(1);
  const [chat, setChat] = useState<ChatType[]|null>(null);
  const location = useLocation();

  useEffect(()=>{
    const token = localStorage.getItem("token");
      const getChat = async () =>{
        try{
          const res = await axios.get("http://3.38.212.8:8000/chat/list",{
            headers : {
              "access-token" : `Bearer ${token}`
            }
          })
              console.log(res?.data)
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
        <button className="main_chat_container">
          <img src={tree}></img>
          <div className="containerRight">
            <div className="align-items"><span className="containerLevel">Lv.</span><span className="containerText"> 나무쿵야</span> </div>
            <div className="containerMessage">ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ</div>
         
          </div>
          <div className="time">32분전</div>
          </button>
      </div>
      }
      <div className={`main_friend_${active}`}>
       <div className="friendSearchBox">
  <input className="friendSearch" type="text" placeholder=" 친구 검색" />
  <button className="friendSearchBtn">검색</button>
   <div className="main_friend_container">
          <img src={tree}></img>
          <div className="containerRight">
            <div className="align-items"><span className="containerLevel">Lv.11</span><span className="friendText">나무쿵야야</span> </div>
          </div>
          <button className="chatting">채팅하기</button>
          </div>
</div>
      </div>

      </div>
      <Footer location={location}></Footer>
    </div>
  )
}

export default Chat;