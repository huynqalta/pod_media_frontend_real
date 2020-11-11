import React, { useRef } from "react";
import "./style.scss";

interface IProps {
  title?: string;
}

const TitleComponent = (props: IProps) => {
  return (
    <div className="heading-layout1">
      <div className="item-title">
        <h3>{props.title || ""}</h3>
      </div>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
  if (prevProps.title != nextProps.title) {
    return false;
  }
  return true;
}

export default React.memo(TitleComponent, areEqual);

// fas fa-filter
