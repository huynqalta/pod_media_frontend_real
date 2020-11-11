import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./style.scss";
const image = require("@assets/images/location.jpg");
import ItemListLocation from "../ItemListLocation";
import { useTranslate } from "@shared/Hook";
import { CustomersTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { LocationTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";

const ListLocation = ({ position, idLocation }) => {
  const { LIST_OF_LOCATION } = useTranslate(CustomersTranslateKey);

  return (
    <div className="list-location">
      <div className="list-location-image">
        <img src={image} alt="" />
      </div>
      <div className="list-location-content">
        <div className="list-location-content-header">
          <h6>{LIST_OF_LOCATION}</h6>
        </div>
        <ul>
          {position.map((item) => (
            <ItemListLocation
              item={item}
              key={item.id}
              active={idLocation == item.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ListLocation;
