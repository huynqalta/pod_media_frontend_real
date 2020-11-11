import React, { useEffect, useMemo } from "react";
import ListLocation from "./components/ListLocation";
import { useHistory, useParams } from "react-router-dom";

import "./styles.scss";
import MapComponent from "@components/commons/Map";
import DeviceDashboard from "./components/DeviceDashboard";
import { useApi } from "@server/apiCallAxios";
import { paramsListLocation } from "./service";
import DetailLocation from "@components/commons/Map/DetailLocation";

interface IParams {
  id: string;
  type: string;
}

const test = [
  {
    address: "chau uc",
    allDevice: 0,
    cleared: 0,
    id: "13b3c6d0-db4a-425d-a75c-f052af826c0a",
    lat: -25.401026518138142,
    lng: 134.6671448815269,
    stopped: 0,
    title: "test",
  },
  {
    address: "330 Âu cơ Đà Nẵng",
    allDevice: 4,
    cleared: 2,
    id: "1c4f8e95-5e78-4155-8ec8-368c0a2a7abf",
    lat: 15.991049797869556,
    lng: 108.22413665624995,
    stopped: 0,
    title: "Da Nang City",
  },
  {
    address: "ABCD",
    allDevice: 0,
    cleared: 0,
    id: "2284749f-c52e-43b9-8c22-8dc185586d3c",
    lat: 11.826053434650422,
    lng: 108.49699660022868,
    stopped: 0,
    title: "Đà Lạt",
  },
  {
    address: "330 Âu cơ Hà Nội",
    allDevice: 0,
    cleared: 0,
    id: "2ff18316-72a5-4f65-8696-6cdb96903d32",
    lat: 20.826099115815925,
    lng: 105.80714446874995,
    stopped: 0,
    title: "Hà Nội City",
  },
  {
    address: "au co",
    allDevice: 0,
    cleared: 0,
    id: "5edf866b-d5bd-4c45-b55d-0eaf48bcbd77",
    lat: 8.418066588012474,
    lng: 5.097337881803474,
    stopped: 0,
    title: "Phuc_test",
  },
  {
    address: "asdfwasdf",
    allDevice: 0,
    cleared: 0,
    id: "93dc9f7c-7637-4672-975c-cb813c34e2c2",
    lat: 14.379496111037604,
    lng: 107.98243743749995,
    stopped: 0,
  },
]

const DashBoard = (props) => {
  const { id, type }: IParams = useParams();
  const history = useHistory();
  const callLoation = useApi({ useRes: true, initRes: [] });

  useEffect(() => {
    callLoation.execute(paramsListLocation());
  }, []);

  const locationMap = useMemo(() => {
    return callLoation.res.map((x) => ({
      lat: x.locationLatitude,
      lng: x.locationLongtitue,
      id: x.locationId,
      title: x.locationName,
      address: x.locationAddress,
      allDevice: x.totalDevice || 0,
      cleared: x.totalActive || 0,
      stopped: x.totalUnactive || 0,
    }));
  }, [ callLoation.res ]);

  return (
    <section className="dashboard d-flex">
      <div className="" style={{ width: "20%", marginRight: "30px" }}>
        <ListLocation position={locationMap} idLocation={id} />
      </div>
      <div className="" style={{ width: "80%" }}>
        {id && type == "chart" ? (
          <DeviceDashboard position={locationMap} />
        ) : (
            <div className="w-100 h-100">
              <MapComponent
                position={locationMap}
                active={id}
                InfoComponent={DetailLocation}
                onChangeActive={(location) => {
                  history.push(`/dashboard/${ location.id }/map`);
                }}
              />
            </div>
          )}
      </div>
    </section>
  );
};
export default DashBoard;
