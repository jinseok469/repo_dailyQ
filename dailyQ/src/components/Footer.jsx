import "./Footer.css";
import footerRank from "../assets/footerRank.png";
import footerChat from "../assets/footerChat.png";
import footerPerson from "../assets/footerPerson.png";
import footerHome from "../assets/footerHome.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = ({ location }) => {
  const [state, setState] = useState("");
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
        <button className={state === "home" ? "active" : ""}>
          <img src={footerHome}></img>
        </button>
        <button className={state === "chat" ? "active" : ""}>
          <img src={footerChat}></img>
        </button>
        <button className={state === "person" ? "active" : ""}>
          <img src={footerPerson}></img>
        </button>
      </div>
    </section>
  );
};
export default Footer;
