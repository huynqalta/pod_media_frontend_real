import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";
interface Iprops {
  item: any;
  active: boolean;
}
const ItemListLocation = ({ item, active }: Iprops) => {
  return (
    <li className="d-flex justify-content-between align-items-center">
      <Link to={`/dashboard/${item.id}/chart`}>
        <strong className={`${active && "location-active"}`}>
          {item.title}
        </strong>
      </Link>
      <Link to={`/dashboard/${item.id}/map`}>
        <FontAwesomeIcon
          icon={faMapMarkedAlt}
          className={`${active && "location-active"}`}
        />
      </Link>
    </li>
  );
};
export default React.memo(ItemListLocation);
