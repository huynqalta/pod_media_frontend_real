import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faLocationArrow,
  faMap,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { LOCATION } from "@modules/router-paths";
import { useHistory, useParams } from "react-router";
import UploadMediaComponent from "./UploadMediaComponent/UploadMediaComponent";
import Modal from "antd/lib/modal/Modal";
import MapComponent from "@components/commons/Map";
import { useApi } from "@server/apiCallAxios";
import {
  paramsDetailsOfLocation,
  paramsStoreLocation,
  paramsUploadLocation,
} from "../service";
import { useForm } from "antd/es/form/Form";
import { paramsDetailLocation } from "@modules/Dashboard/service";
import { useTranslate } from "@shared/Hook";
import { LocationTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";

const EditLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    LOCATION_NAME,
    ADDRESS,
    MARK_MAP,
    CANCEL,
    SAVE,
    LANG,
    LAT,
  } = useTranslate(LocationTranslateKey);
  const ref = useRef({});
  const params: { id: string } = useParams();
  const [form] = Form.useForm();
  const closeModal = () => {
    setShowModal(false);
  };
  const history = useHistory();

  const { execute, res } = useApi({
    useRes: true,
    initRes: [],
    showSuccess: true,
  });
  const { execute: loadDataInit } = useApi({
    useRes: true,
  });
  const cancelEditLocaiton = () => {
    history.push(LOCATION);
  };
  const [isActive, setIsActive] = useState(true);
  const [location, setLocation] = useState({ lng: 0, lat: 0 });

  const onchangeChecked = (event) => {
    event.target.checked == true && setIsActive(!isActive);
  };
  const [imageUrl, setImageUrl] = useState({ url: "", file: "" });
  const onFinish = (values) => {
    console.log(values);
    params.id
      ? execute(
          paramsUploadLocation(params.id, values, imageUrl.file, location)
        ).then((res) => {
          history.push(LOCATION);
        })
      : execute(paramsStoreLocation(values, imageUrl.file, location)).then(
          (res) => {
            history.push(LOCATION);
          }
        );
  };

  useEffect(() => {
    params.id &&
      loadDataInit(paramsDetailsOfLocation(params.id)).then((res) => {
        form.setFieldsValue(res);
        setImageUrl((pre) => ({ ...pre, url: res.locationImage }));
        setLocation((pre) => ({
          ...pre,
          lng: res.locationLongtitue,
          lat: res.locationLatitude,
        }));
      });
  }, []);

  // console.log(params.id)
  return (
    <div className="editLocation">
      {/* <div className="editLocation_ButtonAction">
                <Button onClick={cancelEditLocaiton}>Cancel</Button>
                <Button type="primary" htmlType="submit">Save</Button>
            </div> */}
      <div className="editLocation_Card">
        <Card>
          {/* <div className="editLocation_CardImage">
                        <div className="editLocation_selectImage" onClick={()=>{console.log("select Image")}}>
                        <FontAwesomeIcon icon={faFileImage}/>
                        <p>Location's Image</p>
                        </div>
                        <div className="editLocation_CardButton">
                            {/* <Button>Remove current photo</Button> */}
          {/* <Button>Browser</Button>
                        </div>
                    </div> */}
          <div className="editLocation_CardFields">
            <Form onFinish={onFinish} form={form}>
              <Row justify="space-around">
                <Col span={8}>
                  <Form.Item name="Image">
                    <div className="w-100">
                      <UploadMediaComponent
                        media={imageUrl.url}
                        height={"15rem"}
                        onChange={(media) =>
                          setImageUrl({
                            url: media,
                            file: media,
                          })
                        }
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[{ required: true }]}
                    label={LOCATION_NAME}
                    name="locationName"
                  >
                    <Input />
                  </Form.Item>
                  {/* <Form.Item label="Address"> 
                                        </Form.Item> */}
                  {/* <Form.Item label="Country"> 
                                                <Select defaultValue={provinceData[0]}  >
                                                    {provinceData.map(province => (
                                                        <Select.Option key={province} value={province}>{province}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="City"> 
                                                <Select defaultValue={provinceData[0]}  >
                                                    {provinceData.map(province => (
                                                        <Select.Option key={province} value={province}>{province}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="District"> 
                                                <Select defaultValue={provinceData[0]}  >
                                                    {provinceData.map(province => (
                                                        <Select.Option key={province} value={province}>{province}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="Ward"> 
                                                <Select defaultValue={provinceData[0]}  >
                                                    {provinceData.map(province => (
                                                        <Select.Option key={province} value={province}>{province}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item> */}
                  <Form.Item
                    rules={[{ required: true }]}
                    label={ADDRESS}
                    name="locationAddress"
                  >
                    <Input />
                  </Form.Item>
                  <div className="selectOnMap d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      style={{ marginTop: "4px" }}
                    />
                    <a
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      {MARK_MAP}
                    </a>
                    <div
                      className="d-flex locationDevice "
                      style={{ marginLeft: "4vw" }}
                    >
                      <p>{LANG}:</p>
                      <span>{location.lng}</span>
                      <p style={{ marginLeft: "2vw" }}>{LAT}:</p>
                      <span>{location.lat}</span>
                    </div>
                  </div>

                  {/* <Form.Item label="Contact"> 
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label="Email"> 
                                        <Input/>
                                    </Form.Item> */}
                  {/* <Form.Item label="Status" >
               
                                        <Checkbox checked={isActive} value={0} onChange={onchangeChecked} >Active</Checkbox>
                                        <Checkbox checked={!isActive} value={1} onChange={onchangeChecked} >Inactived</Checkbox>
                                    </Form.Item> */}
                  <Form.Item style={{ textAlign: "center" }}>
                    <Button onClick={cancelEditLocaiton}>{CANCEL}</Button>
                    <Button type="primary" htmlType="submit">
                      {SAVE}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </div>

      <Modal
        visible={showModal}
        title="Picked Map"
        onOk={() => {
          setLocation((pre) => ({
            ...pre,
            lng: ref.current?.lng || 0,
            lat: ref.current?.lat || 0,
          }));
          closeModal();
        }}
        onCancel={() => {
          closeModal();
        }}
      >
        <div className="modalMap" style={{ height: "47vw !important" }}>
          <MapComponent pickOnMap refMap={ref} defaultCenter={location} />
        </div>
      </Modal>
    </div>
  );
};

export default EditLocation;
