import "./Days.css";
import { getPercentImage } from "../utils/getPercentImage";
import { useState } from "react";


type DaysType = {
  mode: any,
  date : any,
  monthlyExam : any
}



const Days = ({ mode, date, monthlyExam }:DaysType) => {
  const [state, setState] = useState(new Date().getDate());
  const today = date;
  const getStartOfWeek = (date:any) => {
    const day = date.getDay(); // 0(일) ~ 6(토)
    const diff = day === 0 ? -6 : 1 - day; // 일요일은 -6, 나머지는 1 - day
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  };

  // 월~일 날짜 배열 생성
  let dates:any = [];
  if (mode === "week") {
    const startOfWeek = getStartOfWeek(today);
    dates = Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      return newDate;
    });
  } else if (mode === "month") {
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay(); // 0(일) ~ 6(토)

    // 1. 앞쪽 빈 칸 추가 (startDay 만큼 null 삽입)
    const emptyDays = Array.from(
      { length: startDay === 0 ? 6 : startDay - 1 },
      () => null
    );

    // 2. 날짜 배열 만들기
    const monthDays = Array.from({ length: lastDay }, (_, i) => {
      return new Date(year, month, i + 1);
    });

    // 3. 합치기
    dates = [...emptyDays, ...monthDays];
  }
  //map 활용

  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div className="Days">
      <div className="Days_top">
        {weekdays.map((q, i) => (
          <div key={i}>{q}</div>
        ))}
      </div>
      <div className="Days_main">
        {dates.map((q:any, i:number) => {
          if (!q) return <div key={i}></div>; // 빈 칸 처리

          // 날짜 포맷을 서버에서 받은 형식과 맞추기 (yyyy-mm-dd)
          const dateStr = `${q.getFullYear()}-${String(
            q.getMonth() + 1
          ).padStart(2, "0")}-${String(q.getDate()).padStart(2, "0")}`;

          // monthlyExam에서 해당 날짜의 이미지 찾기
          const exam = monthlyExam.find((item:any) => item.date === dateStr);
          const imageUrl = exam?.image;

          return (
            <div key={i}>
              <span className={state === q.getDate() ? "today" : ""}>
                {q.getDate()}
              </span>
              <div className="Days_bottom">
                {imageUrl && <img src={imageUrl} alt="exam result" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Days;
