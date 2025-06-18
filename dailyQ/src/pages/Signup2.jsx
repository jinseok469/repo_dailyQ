import "./Signup2.css";
import Header from "../components/Header";
import Button from "../components/Button";
import suninjang from "../assets/suninjang.png";
import flower from "../assets/flower.png";
import mushroom from "../assets/mushroom.png";
import tree from "../assets/tree.png";
import notice from "../assets/notice.png";
import Select from "react-select";
import { useState } from "react";
const Signup2 = () => {
  const [imgClick, setImgClick] = useState(0);
  const [selectOption, setSelectOption] = useState([
    {
      value: 1,
      label: "서울시",
    },
    { value: 2, label: "경기도" },
  ]);

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
            <Button
              onClick={() => setImgClick(1)}
              className={imgClick === 1 ? "imgClick" : ""}
            >
              <img src={tree} alt=""></img>
            </Button>
            <Button
              onClick={() => setImgClick(2)}
              className={imgClick === 2 ? "imgClick" : ""}
            >
              <img src={suninjang}></img>
            </Button>
          </div>
          <div className="section2_button2">
            <Button
              onClick={() => setImgClick(3)}
              className={imgClick === 3 ? "imgClick" : ""}
            >
              <img src={mushroom} alt="" />
            </Button>
            <Button
              onClick={() => setImgClick(4)}
              className={imgClick === 4 ? "imgClick" : ""}
            >
              <img src={flower}></img>
            </Button>
          </div>
        </section>
        <section className="section3">
          <div className="section3_header_text">나의 반려식의 이름은?</div>
          <div className="section3_main_input">
            <input type="text"></input>
          </div>
          <div className="section3_notice">
            <div className="section3_notice1">
              <img src={notice} alt="" />
              <span>5글자를 넘길 수 없어요!</span>
            </div>

            <div className="section3_notice2">
              <img src={notice}></img>
              <span>이름은 한글과 영어로만 구성할 수 있어요!</span>
            </div>
          </div>
        </section>
        <section className="section4">
          <div className="section4_header_text">어디에 거주하시나요?</div>
          <div className="section4_select">
            <div className="select_wrapper">
              <Select
                isSearchable={false} // 읽기전용
                options={selectOption}
                placeholder={"경기도"}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    cursor: "pointer",
                    padding: "5px 5px",
                    backgroundColor: "white",
                    border: "2px solid #00664F",
                    borderRadius: "10px",
                    "&:hover": {
                      border: "2px solid #00664F",
                    },
                  }),
                  option: (optionBase, optionState) => ({
                    ...optionBase,
                    padding: "5px 5px",
                    backgroundColor: optionState.isSelected
                      ? "#E9F5EF"
                      : "white",
                    color: optionState.isSelected ? "black" : "",
                    border: optionState.isFocused
                      ? "3px solid #00664F"
                      : "3px solid transparent",
                    width: "100%",
                    height: "100%",

                    borderRadius: optionState.isFocused ? "10px" : "",

                    borderRadius: "3px",
                  }),
                }}
                components={{
                  DropdownIndicator: () => (
                    <span style={{ color: "#00664F", fontSize: "25px" }}>
                      ▼
                    </span>
                  ),
                  IndicatorSeparator: () => null,
                }}
              ></Select>
            </div>
            <div className="select_wrapper">
              <Select
                isSearchable={false}
                placeholder={"남양주시"}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    cursor: "pointer",
                    padding: "5px 5px",
                    backgroundColor: "white",
                    border: state.isFocused
                      ? "2px solid #00664F"
                      : "2px solid #00664F",
                    borderRadius: "10px",
                    "&:hover": {
                      border: "2px solid #00664F",
                    },
                  }),
                  option: (optionBase, optionState) => ({
                    ...optionBase,
                    padding: "5px 5px",
                    backgroundColor: optionState.isSelected
                      ? "#E9F5EF"
                      : "white",
                    color: optionState.isSelected ? "black" : "",
                    border: optionState.isFocused
                      ? "3px solid #00664F"
                      : "3px solid transparent",
                    width: "100%",
                    height: "100%",

                    borderRadius: optionState.isFocused ? "10px" : "",

                    borderRadius: "3px",
                  }),
                }}
                components={{
                  DropdownIndicator: () => (
                    <span style={{ color: "#00664F", fontSize: "25px" }}>
                      ▼
                    </span>
                  ),
                  IndicatorSeparator: () => null,
                }}
              ></Select>
            </div>
          </div>
          <div className="section4_footer">
            <img src={notice}></img>
            <span>거주지는 랭킹에 반영됩니다</span>
          </div>
        </section>
        <section className="section5">
          <Button
            className={"section5_button"}
            text={"서비스 이용하러 가기"}
          ></Button>
        </section>
      </div>
    </div>
  );
};

export default Signup2;
