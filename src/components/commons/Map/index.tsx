import React, { useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import { GG_MAP_API_KEY } from "@config/apiKey";
import "./index.scss";
import { checkCoordinates } from "@helper/functions";
const marker = require("@assets/icons/map-marker.svg");
const picker = require("@assets/icons/location.svg");

interface Iprops {
  position?: Array<any>;
  defaultZoom?: number;
  active?: string;
  onChangeActive?: (newActiveId) => void;
  pickOnMap?: boolean;
  onPick?: (position) => void;
  defaultCenter?: any;
  InfoComponent?: any;
  refMap?: any;
}
const _defaultCenter = {
  lat: 16.054407,
  lng: 108.202164,
};
const MapComponent = (props: Iprops) => {
  let {
    position = [],
    defaultZoom = 6,
    active = "",
    onChangeActive,
    defaultCenter,
    InfoComponent,
    pickOnMap = false,
    onPick,
    refMap,
  } = props;

  useEffect(() => {
    onPick && onPick(_defaultCenter);
    if (refMap) {
      refMap.current = _defaultCenter;
    }
  }, []);

  const handleDragEnd = (map) => {
    const coordinates = {
      lng: map.center.lng(),
      lat: map.center.lat(),
    };
    onPick && onPick(coordinates);
    if (refMap) {
      refMap.current = coordinates;
    }
  };

  const replaceCoordinates = (coordinates) => {
    if (!coordinates || !coordinates.lat || !coordinates.lng)
      return _defaultCenter;
    if (checkCoordinates(coordinates)) {
      return coordinates;
    } else {
      return _defaultCenter;
    }
  };

  let centerLocation = useMemo(() => {
    if (active) {
      return {
        lat: position.find((item) => item.id == active)?.lat,
        lng: position.find((item) => item.id == active)?.lng,
      };
    } else {
      return _defaultCenter;
    }
  }, [active, position]);

  return (
    <div className="wrap-picker w-100 h-100">
      {pickOnMap && (
        <div className="pointer picker">
          <img src={picker} alt="marker" />
        </div>
      )}
      {centerLocation && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: GG_MAP_API_KEY }}
          defaultZoom={defaultZoom}
          center={defaultCenter ? defaultCenter : centerLocation}
          onDragEnd={handleDragEnd}
        >
          {position.map((item) => {
            return (
              <div className="marker" lat={item.lat} lng={item.lng}>
                <div
                  className="pointer"
                  onClick={() => {
                    onChangeActive(item);
                  }}
                >
                  <img src={marker} alt="marker" />
                </div>
                {InfoComponent && (
                  <InfoComponent detail={item} activeId={active} />
                )}
              </div>
            );
          })}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default MapComponent;
