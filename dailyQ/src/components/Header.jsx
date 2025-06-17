import dailyq_mark from "./../assets/dailyq_mark.png";
import "./Header.css";

const Header = ({ className }) => {
  return (
    <div className="Header">
      <img src={dailyq_mark} alt="" />
    </div>
  );
};

export default Header;
