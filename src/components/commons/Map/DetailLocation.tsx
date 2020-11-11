import React, { useEffect, useRef } from "react";
import { FrownOutlined, InfoCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
const marker = require('@assets/icons/map-marker.svg');

interface IProps {
    lat: number,
    lng: number,
    detail: any,
    activeId: string,
}

const DetailLocation = (props: IProps) => {
    const { detail, activeId } = props;
    console.log('detail: ', detail);
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
        <div className={`detail-location`} style={{ display: isActive ? "unset" : "none" }} ref={ref}>
            <img className="image-location" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdgz3P7mZyZLshNrtPcgP6Jvc2u8xVnU0hXQ&usqp=CAU" alt="" />
            <div className="info">
                <div className="header d-flex-between-center">
                    <div className="title text-ellipsis">{detail.title}</div>
                    <Link to={`/dashboard${ detail.id ? '/' + detail.id : '' }/chart`}>
                        <InfoCircleOutlined
                            className='icon info-icon'
                        />
                    </Link>
                </div>
                <div className="location d-flex">
                    <img style={{ width: "17px", height: "17px" }} src={marker} alt="marker" />
                    <div className="number-of-devices">
                        <b className='text-ellipsis'>{detail.address || 'Stress, Ward, District, City'}</b>
                        <div className='text-ellipsis' style={{ color: 'gray' }}>{detail.allDevice} Installed Devices</div>
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
            </div>
        </div>
    )
}

export default DetailLocation;