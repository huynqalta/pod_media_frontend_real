import MapComponent from '@components/commons/Map';
import DetailLocation from '@components/commons/Map/DetailLocation';
import { indexOfArrObject } from '@helper/functions';
import { paramsListLocation } from '@modules/Dashboard/service';
import DetailDevice from '@modules/Location/Details/Map/DetailDevice';
import { paramsDetailsOfLocation } from '@modules/Location/service';
import { useApi } from '@server/apiCallAxios';
import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

const MapLocations = () => {
    const { locationId, deviceId } = useParams();
    const [activeDevice, setActiveDevice] = useState(deviceId);
    const callLocationDetails = useApi({ useRes: true, initRes: [] });
    useEffect(() => {
        callLocationDetails.execute(paramsDetailsOfLocation(locationId));
    }, []);

    console.log(callLocationDetails.res.devices)

    const locationMap = useMemo(() => {
        return callLocationDetails.res.devices?.map((device) => ({
            lat: device.latitude || 0,
            lng: device.longtitue || 0,
            id: device.deviceId,
            deviceName: device.deviceName,
            deviceType: device.deviceType
        }));
    }, [callLocationDetails.res]);

    return (
        <div >
            <Card>
                <div style={{ height: "40vw" }}>
                    <MapComponent
                        position={locationMap}
                        active={activeDevice}
                        InfoComponent={DetailDevice}
                        onChangeActive={(device) => {
                            setActiveDevice(device.id)
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default MapLocations;