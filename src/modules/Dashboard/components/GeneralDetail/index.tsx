import React, { useContext } from "react";
import { DeviceDashboardContext } from "../DeviceDashboard";
import "./style.scss";
const checkTypeColor = (status) => {
  switch (status) {
    case "success":
      return "color-green";
    case "error":
      return "color-red";
    default:
      return "color-yellow";
  }
};
const createElementFirst = (name, element, col) => {
  return (
    <div className={`col-${col} p-0 general-item`}>
      <div className="general-item-header">{name}</div>
      <div className="general-item-content">
        <strong className={checkTypeColor(element.type)}>
          {element.value}
        </strong>
      </div>
    </div>
  );
};
const createElementSecond = (name, element) => {
  return (
    <div className="col-2 p-0 general-item">
      <div className="general-item-header">{name}</div>
      <div className="general-item-content">
        <div className="content-block">
          <div className="d-flex justify-content-center">
            <strong className={checkTypeColor(element.type)}>
              {element.value}
            </strong>
          </div>
          <p className={`text-center ${checkTypeColor(element.type)}`}>
            {element.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
};
const GeneralDevice = ({ generalDevice }) => {
  console.log(generalDevice, "GeneralDevice");
  const {
    power,
    internet,
    handsSanitizer,
    pumps,
    scanner,
    supplyTanks,
    tapWater,
    wastedWater,
  } = generalDevice.deviceStatusActive;

  return (
    <div className="general">
      <div className="row m-auto">
        {createElementFirst("Power", power, 1)}
        {createElementFirst("Internet", internet, 1)}
        {createElementFirst("Scanner", scanner, 1)}
        {createElementFirst("Pumps", pumps, 1)}
        {createElementFirst("Tap water", tapWater, 2)}
        {createElementSecond("Supply Tanks", supplyTanks)}
        {createElementSecond("Hands Sanitizer", handsSanitizer)}
        {createElementSecond("Wasted Water", wastedWater)}
      </div>
    </div>
  );
};
export default React.memo(GeneralDevice);
