import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
interface IProps {
  item: any;
  type?: "Daily" | "Monthly";
}
const ColumnReport = ({ item, type }: IProps) => {
  const [reload, setReload] = useState(true);
  const ref = useRef(null);
  const refTotal = useRef(null);
  useEffect(() => {
    ref.current.classList.add("init");
    refTotal.current.classList.add("show-total");
    setTimeout(() => {
      ref.current.classList.remove("init");
      refTotal.current.classList.remove("show-total");
    }, 1500);
  }, [item]);
  return (
    <>
      <div className="column">
        <span>{item.timeReport}</span>
        <div className="column-progress" style={{ height: `150px` }}>
          {reload && (
            <>
              <div
                className={`column-progress-main ${
                  type == "Daily"
                    ? "color-progress-blue"
                    : "color-progress-yellow"
                }`}
                style={{ height: `${item.successShowReport}%` }}
                ref={ref}
              >
                <span className="column-total" ref={refTotal}>
                  {item.success}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default React.memo(ColumnReport);
