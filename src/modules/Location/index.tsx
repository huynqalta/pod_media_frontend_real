import { Button, Card, Form, Input, Modal, notification, Pagination, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faMap, faMapMarkedAlt, faMapMarkerAlt, faTrash, prefix } from '@fortawesome/free-solid-svg-icons';
import { LOCATION_DETAIL, LOCATION_EDIT, LOCATION_MAP } from '@modules/router-paths';
import { useHistory } from 'react-router';
import Axios from 'axios';
import { useApi } from '@server/apiCallAxios';
import { paramsDeleteLocation, paramsGetAllLocation, paramsUpdateStatusLocation } from './service';
import { useTranslate } from '@shared/Hook';
import { LocationTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';
import ListComponent from '@components/commons/ListComponent';
import { getRenderItem } from './listLocation';


const Location = () => {

	const { ADD_NEW, VIEW_STATIC, EDIT, INACTIVE, ACTIVE } = useTranslate(LocationTranslateKey);

	const [pagination, setPagination] = useState({ totalCount: 0, pageSize: 5, currentPage: 1 })
	const [listLocation, setListLocation] = useState([]);

	const { execute } = useApi();
	const tableRef = useRef(null);

	const history = useHistory();

	const onAddLocation = () => {
		history.push(LOCATION_EDIT);
	}

	const updateStatus = (data) => {
		execute(paramsUpdateStatusLocation(data)).then(res => {
			tableRef.current.handleGetListDataFunc();
			notification.success({
				message: res.message,
				duration: 2,
				placement: "bottomRight"
			})
		})
	}

	const onDelete = (id) => {
		Modal.confirm({
			title: "DELETE_LOCATION",
			content: `${"CONFIRM_DELETE_LOCATION"} ${name} ?`,
			onOk: () => {
				execute(paramsDeleteLocation(id)).then(res => {
					tableRef.current.handleGetListDataFunc();
					notification.success({
						message: res.message,
						duration: 2,
						placement: "bottomRight"
					})
				});
			}
		});
	}



	return (
		<div className="locationPage">
			<Card>

				{/* <div className="locationPage_field">
				<Form form={form} onFinish={onFinish}>
					<Form.Item>
					<Select
          defaultValue={provinceData[0]}
          style={{ width: 120 }}
        //   onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => (
            <Select.Option key={province} value={province}>{province}</Select.Option>
          ))}
        </Select>
					</Form.Item>
					<Form.Item>
					<Select
          defaultValue={provinceData[0]}
          style={{ width: 120 }}
        //   onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => (
            <Select.Option key={province} value={province}>{province}</Select.Option>
          ))}
        </Select>
						</Form.Item>
					<Form.Item>
						<Button type="primary">Submit</Button>
					</Form.Item>
				</Form>
            </div> */}
				<div className="locationPage_list">
					<div className="locationPage_title">
						<Button type="primary" onClick={onAddLocation}>{ADD_NEW}</Button>
					</div>

					<ListComponent
						ref={tableRef}
						key="listLocation"

						propscustom={{
							renderItem: (item, index) => getRenderItem({ updateStatus, onDelete }, useTranslate(LocationTranslateKey), item, index),
							paramsAxiosApi: paramsGetAllLocation,
							paginationServer: true,

						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default Location;