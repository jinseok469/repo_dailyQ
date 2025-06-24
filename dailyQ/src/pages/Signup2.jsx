import "./Signup2.css";
import Header from "../components/Header";
import Button from "../components/Button";
import suninjang from "../assets/suninjang.png";
import flower from "../assets/flower.png";
import mushroom from "../assets/mushroom.png";
import tree from "../assets/tree.png";
import notice from "../assets/notice.png";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup2 = () => {
  const nav = useNavigate();
  const [imgClick, setImgClick] = useState(1);
  const [name, setName] = useState("");
  const refs = {
    name: useRef(null),
    selectMain: useRef(null),
    selectSub: useRef(null),
  };
  const [selectMain, setSelectMain] = useState(null);
  const [selectSub, setSelectSub] = useState(null);
  const [selectOption, setSelectOption] = useState([
    {
      value: null,
      label: null,
    },
  ]);
  const [selectOptionSub, setSelectOptionSub] = useState([
    {
      value: null,
      label: null,
    },
  ]);
  const [selectRegion, setSelectRegion] = useState(0);
  useEffect(() => {
    const region = async () => {
      try {
        const res = await axios.get("http://3.38.212.8:8000/region");

        const options = res.data.map((region) => ({
          value: region.id, // Select 내부에서 value로 사용됨
          label: region.name, // 보여지는 이름
        }));
        setSelectOption(options);
      } catch (err) {}
    };
    region();
  }, []);

  useEffect(() => {
    const regionSub = async () => {
      try {
        const res = await axios.get(
          `http://3.38.212.8:8000/region/${selectRegion}/sub-regions`
        );
        const options = res.data.map((region) => ({
          value: region.id,
          label: region.name,
        }));
        setSelectOptionSub(options);
      } catch (err) {}
    };
    regionSub();
  }, [selectRegion]);

  const signup2 = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const newItem = {
      nickname: name,
      pet_type: imgClick,
      region_id: selectSub?.value,
    };
    if (name === "" || /[^a-zA-Z가-힣]/.test(name)) {
      refs.name.current.focus();
      return;
    } else if (!selectMain) {
      alert("지역을 선택해주세요 !");
      return;
    } else if (!selectSub) {
      alert("지역을 선택해주세요 !");
      return;
    }

    try {
      const res = await axios.post(
        "http://3.38.212.8:8000/account/onboarding",
        newItem,
        {
          headers: {
            "access-token": `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("is_signup_done", true);
      nav("/home");
    } catch (err) {
      console.log("🔥 서버 응답:", err.response?.data);
    }
  };
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
            <input
              ref={refs.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              maxLength={5}
            ></input>
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
                ref={refs.selectMain}
                isSearchable={false} // 읽기전용
                options={selectOption}
                value={selectMain}
                onChange={(selectOption) => {
                  setSelectRegion(selectOption.value),
                    setSelectMain(selectOption);
                  setSelectSub(null);
                  setSelectOptionSub([]);
                }}
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

                    borderRadius: optionState.isFocused ? "" : "",
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
                ref={refs.selectSub}
                value={selectSub}
                isSearchable={false}
                placeholder={"남양주시"}
                options={selectOptionSub}
                onChange={(option) => setSelectSub(option)}
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

                    borderRadius: optionState.isFocused ? "" : "",
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
            onClick={signup2}
            className={"section5_button"}
            text={"서비스 이용하러 가기"}
          ></Button>
        </section>
      </div>
    </div>
  );
};

export default Signup2;
