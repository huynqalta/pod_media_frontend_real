import React, { useContext } from "react";

import { Button, notification } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

export const correctEmail = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
};

export const correctLink = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const debounce = (callback, delay) => {
  let timeoutHandler = null;
  return (...args) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      callback(...args);
      timeoutHandler = null;
    }, delay);
  };
};

export const indexOfArrObject = (arr, key, value) => {
  let index = -1;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[ i ][ key ] === value) {
      index = i;
      break;
    }
  }
  return index;
};

export const inrange = (min, number, max) => {
  if (!isNaN(number) && (number >= min) && (number <= max)) {
    return true;
  } else {
    return false;
  };
}

export const checkCoordinates = (coordinates: { lat: number, lng: number }) => {
  if (inrange(-90, coordinates.lat, 90) && inrange(-180, coordinates.lng, 180)) {
    return true;
  } else {
    return false
  }
}
export const  itemRender = (current, type, originalElement)=> {
  if (type === 'prev') {
    return <Button className="ant-pagination-item-link"><CaretLeftOutlined /> </Button>;
  }
  if (type === 'next') {

    return <Button className="ant-pagination-item-link"><CaretRightOutlined /></Button>;
  }
  return originalElement;
}