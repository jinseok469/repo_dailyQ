import "./Footer.css";
import footerRank from "../assets/footerRank.png";
import footerChat from "../assets/footerChat.png";
import footerPerson from "../assets/footerPerson.png";
import footerHome from "../assets/footerHome.png";
import { useEffect, useState } from "react";
import type { Location } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";



type FooterType = {
  location? : Location;
}


const Footer = ({ location }:FooterType) => {
  const [state, setState] = useState("");
  const locations = useLocation();
  const path = locations.pathname;
  const nav = useNavigate();
  useEffect(() => {
    if (path === "/home") {
      setState("home");
    } else if (path === "/rank") {
      setState("rank");
    } else if (path === "/chat") {
      setState("chat");
    } else if (path === "/person") {
      setState("person");
    } else if (path === "/chattingroom") {
      setState("chattingroom");
    } else if (path === "/quizcomplete") {
      setState("quizcomplete");
    } else {
      setState("");
    }
  }, [location]);
  return (
    <section className="HomeFooter">
      <div className="HomeFooter_button">
        <button onClick={()=>nav("/rank")} className={state === "rank" ? "active" : ""}>
          <img src={footerRank}></img>
        </button>
        <button onClick={()=>nav("/home")} className={state === "home" || state === "quizcomplete"? "active" : ""}>
          <img src={footerHome}></img>
        </button>
        <button onClick={()=>nav("/chat")} className={state === "chat" || state === "chattingroom" ? "active" : ""}>
          <img src={footerChat}></img>
        </button>
        <button onClick={()=>nav("/person")} className={state === "person" ? "active" : ""}>
          <img src={footerPerson}></img>
        </button>
      </div>
    </section>
  );
};
export default Footer;
