import { DEVICES, DEVICES_ADD, LOCATION_EDIT, LOCATION_MAP } from '@modules/router-paths';
import { useApi } from '@server/apiCallAxios';
import { useTranslate } from '@shared/Hook';
import { LocationTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';
import { Button, Card, Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { paramsDetailsOfLocation } from '../service';
import CollapseComponent from './Collapse'
import './styles.scss'

const DetailLocation = () => {
    const { execute, res } = useApi({ useRes: true, initRes: [] });
    // const [dataALocation, setDataALocation] = useState([]);
    const history = useHistory();
    const { TOTAL, MACHINES, ADDRESS, DATE_INSTALLATION, STATUS, SHOWING, EDIT, ADD, ACTIVE, INACTIVE, VIEW_ON_MAP } = useTranslate(LocationTranslateKey);

    const params: id<string> = useParams();

    useEffect(() => {
        params.id && execute(paramsDetailsOfLocation(params.id))
    }, [])


    const lengthDevice = res.devices?.length;

    return (
        <div className="locationPage">
            <Row>
                <Col span={7} style={{ marginRight: '1vw' }}>
                    <Row>
                        <Card className="leftCard image">
                            <img style={{ width: "22vw", height: "16vw", borderRadius: "22px" }} src={res?.locationImage ? `https://pod-api.dev-altamedia.com/location/${res?.locationImage}` : "https://bhmlib.org/wp-content/themes/cosimo-pro/images/no-image-box.png"} alt="trung tam thuong mai" />
                        </Card>
                    </Row>
                    <Row>
                        <Card className="leftCard">
                            <div className="titleDetails">
                                <h6>{res?.locationName}</h6>
                                <div className="actionLocation">
                                    <Button style={{ marginRight: "10px" }} onClick={() => { history.push(`${LOCATION_MAP}/${res?.locationId}`) }} >{VIEW_ON_MAP}</Button>
                                    <Button onClick={() => { history.push(`${LOCATION_EDIT}/${res?.locationId}`) }}>{EDIT}</Button>
                                </div>
                            </div>
                            <hr />
                            <div className="inforLocation">
                                <div className="rowDetails">
                                    <p>{ADDRESS}</p>
                                    <span>{res?.locationAddress}</span>
                                </div>
                                <div className="rowDetails">
                                    <p>{DATE_INSTALLATION}</p>
                                    <span>{moment(res?.createdAt).format('DD-MM-YYYY')}</span>
                                </div>
                                <div className="rowDetails">
                                    <p>{STATUS}</p>
                                    <span>{!(res?.locationStatus) ? ACTIVE : INACTIVE}</span>
                                </div>
                                {/* <div className="rowDetails">
                                <p>Phone</p>
                                <span>0123123123</span>
                            </div>
                            <div className="rowDetails">
                                <p>Email</p>
                                <span>abc@gmail.com</span>
                            </div> */}
                            </div>
                        </Card>
                    </Row>
                </Col>
                <Col span={16}>
                    <Card>
                        <div className="d-flex justify-content-between  collapse_Location">
                            <div className="right">
                                <h6>{res.locationName}</h6>
                                <p style={{ fontWeight: 400, fontSize: "18px" }}>{TOTAL} {lengthDevice} {MACHINES}</p>
                                <p style={{ fontStyle: "italic", fontSize: "16px", fontWeight: 400 }}>{SHOWING} {lengthDevice > 5 ? `5/${lengthDevice}` : `${lengthDevice}/${lengthDevice}`} {MACHINES}</p>
                            </div>
                            <Button type="primary" onClick={() => { history.push(DEVICES_ADD) }}>{ADD}</Button>

                        </div>

                        <CollapseComponent devices={res?.devices} />
                    </Card>
                </Col>

            </Row>
        </div>

    );
};

export default DetailLocation;