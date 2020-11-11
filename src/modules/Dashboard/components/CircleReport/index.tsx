import React, { useEffect, useRef } from "react";
import "./style.scss";
interface Iprops {
  type?: "Daily" | "Monthly";
  refills: number;
}
export const counter = (element, start, end, duration) => {
  if (end > 0) {
    let current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, step);
  } else {
    element.textContent = end;
  }
};
const CircleReport = ({ type, refills }: Iprops) => {
  const refCount = useRef(null);
  useEffect(() => {
    counter(refCount.current, 0, refills, 1200);
  }, [refills]);
  return (
    <div className={`circle ${type == "Monthly" && "circle-yellow"}`}>
      <div
        className={`circle-content ${
          type == "Monthly" && "circle-yellow-content"
        }`}
      >
        <div className="d-flex flex-column align-items-center">
          <h6 ref={refCount}>0</h6>
          <strong>refills</strong>
        </div>
      </div>
    </div>
  );
};
export default React.memo(CircleReport);
