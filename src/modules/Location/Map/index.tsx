import MapComponent from '@components/commons/Map';
import DetailLocation from '@components/commons/Map/DetailLocation';
import { paramsListLocation } from '@modules/Dashboard/service';
import { useApi } from '@server/apiCallAxios';
import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

const MapLocations = () => {
    const { id } = useParams();
    const [activeLocation, setActiveLocation] = useState(id);
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
    }, [callLoation.res]);

    return (
        <div >
            <Card>
                <div style={{ height: "40vw" }}>
                    <MapComponent
                        position={locationMap}
                        active={activeLocation}
                        InfoComponent={DetailLocation}
                        onChangeActive={(location) => {
                            setActiveLocation(location.id)
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default MapLocations;