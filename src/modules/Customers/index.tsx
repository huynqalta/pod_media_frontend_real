import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import Card from 'antd/es/card';
import ModalAddCustomer from '@modules/Customers/component/AddCustomer';
import ButtonComponent from '@components/commons/ButtonComponent/Button.Component';
import {PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {useApi} from '@server/apiCallAxios';
import {delCustomer, listCustomer} from '@modules/Customers/service';
import Divider from 'antd/es/divider';
import {useRouter, useTranslate} from '@shared/Hook';
import {CUSTOMER_DETAIL} from '@modules/router-paths';
import {InitPageCustomer} from '@modules/Customers/interface';
import Modal from 'antd/es/modal';
import {CustomersTranslateKey} from '@shared/TranslateKey/ImportTranslateKey';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NotificationComponent from '@components/commons/NotificationComponent';
import './styles.scss';
import moment from 'moment';

const {confirm} = Modal;

const Customers = (props) => {
    const [showModal, setShowModal] = useState({modal: false, data: null});
    const {execute, res, loading} = useApi({
        showSuccess: true,
        useLoading: true,
        initRes: [],
        useRes: true,
    });
    const router = useRouter();
    const [pagination, setPagination] = useState(InitPageCustomer);
    const {
        FULL_NAME,
        AGE,
        SEX,
        PHONE,
        ADDRESS,
        BTN_EDIT,
        BTN_DETAIL,
        BTN_DEL,
        AVATAR,
        CODE,
        MALE,
        FEMALE,
        OTHER,
        BTN_ADD,
    } = useTranslate(CustomersTranslateKey);

    useEffect(() => {
        GetListCustomers(pagination);
    }, []);

    const GetListCustomers = (raw?: any) => {
        execute(listCustomer(raw)).then((res) => {
            setPagination((prev) => ({...prev, total: res.info.totalRecord}));
        });
    };

    const GoDetailCustomer = (data) => {
        router.push({
            pathname: CUSTOMER_DETAIL,
            search: `?key=${data.customerID}&name=${data.customerName}`,
        });
    };
    const DeleteCustomer = (data) => {
        confirm({
            icon: <ExclamationCircleOutlined/>,
            content: <h4>Delete {data.customerName} ?</h4>,
            onOk() {
                execute(delCustomer(data.customerID)).then((res) => {
                    NotificationComponent({
                        type: 'success',
                        notificationProps: {message: res.message},
                    });
                    GetListCustomers(pagination);
                });
            },
        });
    };

    const columns = [
        {
            title: AVATAR,
            dataIndex: 'imagetLink',
            render: (text) =>
                text ? (
                    <img
                        src={text}
                        alt=''
                        style={{width: '45px', borderRadius: '100%', height: '45px'}}
                    />
                ) : (
                    <FontAwesomeIcon
                        color='#198bca'
                        style={{fontSize: '2rem'}}
                        icon={faUserCircle}
                    />
                ),
        },
        {
            title: CODE,
            dataIndex: 'customerCode',
        },
        {
            title: FULL_NAME,
            dataIndex: 'customerName',
        },
        {
            title: AGE,
            dataIndex: 'customerAge',
        },
        {
            title: SEX,
            dataIndex: 'customerGender',
            render: (text) => (text == 0 ? MALE : text == 1 ? FEMALE : OTHER),
        },
        {
            title: ADDRESS,
            dataIndex: 'customerAddress',
        },
        {
            title: 'Ngày Khám',
            dataIndex: 'customerCreatedAt',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: PHONE,
            dataIndex: 'customerPhone',
        },
        {
            title: '',
            dataIndex: '',
            render: (text, record) => (
                <>
                    <a
                        className=' tag-a-btn tag-a-btn-normal'
                        onClick={() => GoDetailCustomer(record)}
                    >
                        {BTN_DETAIL}
                    </a>
                    <Divider type='vertical'/>
                    <a
                        className='tag-a-btn-normal tag-a-btn'
                        onClick={() => DeleteCustomer(record)}
                    >
                        {BTN_DEL}
                    </a>
                    <Divider type='vertical'/>
                    <a
                        className='tag-a-btn-del tag-a-btn'
                        onClick={() => handleOpenModalEdit(record)}
                    >
                        {BTN_EDIT}
                    </a>
                </>
            ),
        },
    ];

    const handleOpenModal = () => {
        setShowModal({modal: true, data: null});
    };

    const handleOpenModalEdit = (data?: any) => {
        // console.log(data,"data===")
        setShowModal({modal: true, data: data});
    };

    const handleCloseModal = (e) => {
        setShowModal((prev) => ({...prev, modal: false}));
        if (e == false) {
            GetListCustomers(pagination);
        }
    };

    const handleChangeTable = (page) => {
        // console.log(pagination,'pagination=====')
        // setPagination(prev=>({...prev, page: page.current}))
        GetListCustomers({...pagination, page: page.current});
    };

    return (
        <>
            <Card>
                <div className='d-flex justify-content-end mb-4'>
                    <ButtonComponent
                        text={BTN_ADD}
                        iconAnt={<PlusOutlined/>}
                        onClick={handleOpenModal}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={res.data}
                    rowKey={'customerID'}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleChangeTable}
                />
                <ModalAddCustomer
                    visible={showModal.modal}
                    closeModal={handleCloseModal}
                    dataEdit={showModal.data}
                />
            </Card>
        </>
    );
};

export default Customers;
