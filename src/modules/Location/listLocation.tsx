import { faLocationArrow, faMap, faMapMarkedAlt, faMapMarkerAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LOCATION_DETAIL, LOCATION_EDIT, LOCATION_MAP } from "@modules/router-paths";
import { useTranslate } from "@shared/Hook";
import { Button, Card } from "antd";
import React from "react";
import { useHistory } from "react-router";

export const getRenderItem = ({ onDelete, updateStatus }, translatekey, item, index) => {

    const { ADD_NEW, VIEW_STATIC, EDIT, INACTIVE, ACTIVE, VIEW_ON_MAP, DELETE } = translatekey;
    const history = useHistory();

    // const onSubmit = (value) => {
    //   console.log(value);
    // };

    return (
        <Card>
            <div className="locationPage_card" style={{ display: "flex" }}>
                <img width="155px" height="100px" src={item.locationImage ? `https://pod-api.dev-altamedia.com/location/${item.locationImage}` : "https://bhmlib.org/wp-content/themes/cosimo-pro/images/no-image-box.png"} alt={item.locationName}></img>
                <div className="locationPage_cardAdrress">
                    <h3>{item.locationName}</h3>
                    <p><span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>{item.locationAddress}</p>
                </div>
                <p className="status" onClick={() => { updateStatus(item) }}>{item.locationStatus == 0 ? <span style={{ color: "red" }} >{INACTIVE}</span> : ACTIVE}</p>
                <div className="locationPage_cardAction">
                    <Button onClick={() => { history.push(`${LOCATION_DETAIL}/${item.locationId}`) }}>{VIEW_STATIC}</Button>
                    <Button onClick={() => { history.push(`${LOCATION_EDIT}/${item.locationId}`) }}>{EDIT}</Button>
                    <Button onClick={() => { history.push(`${LOCATION_MAP}/${item.locationId}`) }} >{VIEW_ON_MAP}</Button>
                    <Button danger onClick={() => { onDelete(item.locationId) }} >{DELETE}</Button>
                </div>
            </div>
        </Card>
    )
}