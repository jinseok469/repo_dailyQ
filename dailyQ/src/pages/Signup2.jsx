import "./Signup2.css";
import Header from "../components/Header";
import Button from "../components/Button";
import suninjang from "../assets/suninjang.png";
import flower from "../assets/flower.png";
import mushroom from "../assets/mushroom.png";
import tree from "../assets/tree.png";
const Signup2 = () => {
  return (
    <div className="Signup2">
      <Header></Header>
      <div className="Signup2_main">
        <section className="section1">
          <div className="Signup2_main_headerText">👋 반가워요</div>
          <div className="Signup2_main_headersubText">
            서비스를 이용하기 전에 취향을 알려주세요!
          </div>
        </section>
        <section className="section2">
          <div className="section2_headerText">나의 반려식은?</div>
          <div className="section2_button1">
            <Button>
              <img src={tree} alt=""></img>
            </Button>
            <Button>
              <img src={suninjang}></img>
            </Button>
          </div>
          <div className="section2_button2">
            <Button>
              <img src={mushroom} alt="" />
            </Button>
            <Button>
              <img src={flower}></img>
            </Button>
          </div>
        </section>
        <section className="section3"></section>
        <section className="section4"></section>
        <section className="section5"></section>
      </div>
    </div>
  );
};

export default Signup2;
