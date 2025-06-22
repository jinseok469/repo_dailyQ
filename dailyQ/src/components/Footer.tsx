import "./Footer.css";
import footerRank from "../assets/footerRank.png";
import footerChat from "../assets/footerChat.png";
import footerPerson from "../assets/footerPerson.png";
import footerHome from "../assets/footerHome.png";
import { useEffect, useState } from "react";
import type { Location } from "react-router-dom";
import { useNavigate } from "react-router-dom";



type FooterType = {
  location : Location;
}


const Footer = ({ location }:FooterType) => {
  const [state, setState] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (location.pathname === "/home") {
      setState("home");
    } else if (location.pathname === "/rank") {
      setState("rank");
    } else if (location.pathname === "/chat") {
      setState("chat");
    } else if (location.pathname === "/person") {
      setState("person");
    } else {
      setState("");
    }
  }, [location]);
  return (
    <section className="HomeFooter">
      <div className="HomeFooter_button">
        <button className={state === "rank" ? "active" : ""}>
          <img src={footerRank}></img>
        </button>
        <button onClick={()=>nav("/home")} className={state === "home" ? "active" : ""}>
          <img src={footerHome}></img>
        </button>
        <button className={state === "chat" ? "active" : ""}>
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
