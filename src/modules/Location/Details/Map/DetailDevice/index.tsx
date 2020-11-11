import React, { useEffect, useRef } from "react";
import { FrownOutlined, InfoCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Card } from "antd";
const marker = require('@assets/icons/map-marker.svg');

interface IProps {
    lat: number,
    lng: number,
    detail: any,
    activeId: string,
}

const DetailDevice = (props: IProps) => {
    const { detail, activeId } = props;
    const isActive = detail.id == activeId
    const ref = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            if (isActive) {
                ref.current.classList.add('top-35')
            } else {
                ref.current.classList.remove('top-35')
            }
        }, 10)
    }, [ isActive ])

    return (
        <div className='detail-location detail-devices' style={{ display: isActive ? "unset" : "none", width: 'unset' }} ref={ref}>
            <Card style={{ width: "max-content", borderRadius: "10px", padding: 0 }}>
                <p style={{ color: "#1d8bca", fontSize: "15px", fontWeight: "bold", padding: "0px", margin: "0px" }}>{detail.deviceName}</p>
                <p style={{ padding: "0px", margin: "0px" }}>{detail.deviceType == 1 ? "POD Hi-Pro" : detail.deviceType == 2 ? "POD Refresh" : "POD Vital"}</p>
            </Card>

            {/* <img className="image-location" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdgz3P7mZyZLshNrtPcgP6Jvc2u8xVnU0hXQ&usqp=CAU" alt="" />
            <div className="info">
                <div className="header d-flex-between-center">
                    <div className="title text-ellipsis">{detail.title}</div>
                    <Link to={`/dashboard${detail.id ? '/' + detail.id : ''}/chart`}>
                        <InfoCircleOutlined
                            className='icon info-icon'
                        />
                    </Link>
                </div>
                <div className="location d-flex">
                    <img style={{ width: "17px", height: "17px" }} src={marker} alt="marker" />
                    <div className="number-of-devices">
                        <b className='text-ellipsis'>{detail.address || 'Stress, Ward, District, City'}</b>
                        <div className='text-ellipsis' style={{ color: 'gray' }}>3 Installed Devices</div>
                    </div>
                </div>

                <div className="number-of-devices mt-2 text-ellipsis" style={{ textAlign: 'center' }}>
                    <b style={{ fontSize: "19px" }}>100</b> All Entry
                    </div>
                <div className="reaction d-flex-between-center">
                    <div className="item">
                        <SmileOutlined className='reaction-icon mr-1' />
                        <span >{detail.cleared || 0} Cleared</span>
                    </div>
                    <div className="item">
                        <FrownOutlined className='reaction-icon mr-1' />
                        <span >{detail.stopped || 0} Stopped</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default DetailDevice;