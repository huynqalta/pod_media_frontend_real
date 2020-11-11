import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import get from "lodash/get";
import join from "lodash/join";
// import ShowEntriesComponent from "../ShowEntriesComponent";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import { Card, Table } from "antd";

import {
  DataRequest,
  FilterObj,
  typeFilter,
  initDataRequest,
} from "./interface";
import { Form } from "antd";

import "./styles.scss";
import moment from "moment";
import { useApi } from "@server/apiCallAxios";
import { TableProps } from "antd/lib/table";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { DataResponse } from "../TableComponent_New/interface";
import { itemRender } from "@helper/functions";

// import {useTranslation} from "react-i18next";
interface propsCustom {
  columns?: Array<any>;
  selection?: boolean;
  receiveSelection?: (selectedKey?: any, selectedRowKey?: any) => void;
}
interface Props extends TableProps<any> {
  changeComponent?: (value) => void;
  propsCustom: {
    paramsAxiosApi?: (dataRequest?, params?: any) => void;
    classNameCard?: any;
    showSTTCollumn?: boolean;
    valueSearch?: any;
    filter?: Array<FilterObj>;
    params?: any;
    configUseApi?: {
      useRes?: boolean;
      useLoading?: boolean;
      _useDispatch?: boolean;
      initRes?: { data: Array<any>; info: null };
    };
    paginationServer?: boolean;
  };
}

const initInfoTable = {
  pageSize: 10,
  pageNumber: 1,
  totalRecord: 0,
};

const TableComponent_New = forwardRef((props: Props, ref) => {
  const {
    classNameCard,
    showSTTCollumn,
    paramsAxiosApi,
    paginationServer,
    configUseApi,
  } = props.propsCustom;
  const { execute, loading , res} = useApi<DataResponse>({
    ...configUseApi,
    useRes: true,
    useLoading: true,
  });
  
  const [dataRequest, setDataRequest] = useState<DataRequest>(initDataRequest);

  const history = useHistory();
  const [form] = Form.useForm();
  const pageQueryString: any = queryString.parse(
    get(history, ["location", "search"], "?pageNumber=1")
  );



  

  useEffect(() => {
    props.changeComponent && props.changeComponent(res);
  }, [res]);

  const getListDataFunc = ( params?:DataRequest):Promise<any> => {
    return execute(
      paramsAxiosApi({ ...dataRequest, ...params }, { ...props.propsCustom.params })
    ).then((res) => {
    
      const data = res.data;
      if (data.length == 0 && dataRequest.pageNumber != 1) {
        handleChangePage(dataRequest.pageNumber - 1);
      }
      return Promise.resolve(res)
    },err => {
      return Promise.reject(err.response)
    });
  }

  useImperativeHandle(ref, () => ({
    handleGetListDataFunc(params?:DataRequest):Promise<any> {
      if(!paginationServer) {
        return getListDataFunc({...params , pageNumber:undefined , pageSize:undefined })}
      return  getListDataFunc(params);
    },
    dataSource: res?.data || [],
    resoponse: res,
    
  }),[res]);
  
  const handleChangeTable = (pagination, filters, sorter, extra) => {
    if (extra.action == "sort") {
      let orderByQuery = ""
      if(sorter.field && sorter.order){
        orderByQuery = sorter.field + " " + sorter.order
      }

      setDataRequest((prev) => ({
        ...prev,
        orderByQuery
      }));
    }
  };
  const handleChangePage = (pageNumber, value?) => {
    if (paginationServer) {
      const prevSearch = queryString.parse(history.location.search);

      const arraySearchFilter = [];
      for (let keys in prevSearch) {
        if (keys != "pageNumber") {
          arraySearchFilter.push(`${keys}=${prevSearch[keys]}`);
        }
      }
      const newSearch = join(arraySearchFilter, "&");
      if (value) {
        setDataRequest((prev) => ({ ...prev, ...value, pageNumber: pageNumber }));
      } else {
        setDataRequest((prev) => ({ ...prev, pageNumber: pageNumber }));
      }
      if (newSearch) {
        history.push({ search: `?${newSearch}&pageNumber=${pageNumber}` });
      } else {
        history.push({ search: `?pageNumber=${pageNumber}` });
      }
    }
  };
  const handleSubmitSearch = (valueSubmit: DataRequest) => {
    const index = props.propsCustom.filter.findIndex(
      (i) => i.type == typeFilter.RangeDate
    );
    if (index != -1) {
      const nameRangeDate = props.propsCustom.filter[index].name;
      const valueSubmitRangeDate = valueSubmit[nameRangeDate];

      if (valueSubmitRangeDate) {
        const valueDateForm = moment(valueSubmitRangeDate[0]).format(
          "YYYY/MM/DD"
        );
        const valueDateTo = moment(valueSubmitRangeDate[1]).format(
          "YYYY/MM/DD"
        );
        valueSubmit.dateFrom = valueDateForm;
        valueSubmit.dateTo = valueDateTo;
        valueSubmit[nameRangeDate] = undefined;
      }
    }
    handleChangePage(1, valueSubmit);
    // setDataRequest(prev => ({ ...prev, ...valueSubmit, pageNumber: 1 }));
  };
  const handleChangeFilter = (valueChanges) => {};

  useMemo(() => {
    if (paramsAxiosApi && dataRequest.pageNumber === parseInt(pageQueryString?.pageNumber || 1)) {
      getListDataFunc();
    }
  }, [dataRequest]);
  useMemo(() => {
    const __pageNumber = pageQueryString?.pageNumber || "1"
     if (paginationServer && 
       parseInt(__pageNumber) !== dataRequest.pageNumber
       ) {
       // if (
       //   !!pageQueryString.pageNumber 
       //   // parseInt(pageQueryString.pageNumber) !== dataRequest.pageNumber
       // ) {
         setDataRequest((prev) => ({
           ...prev,
           pageNumber: parseInt(__pageNumber),
         }));
       // }
     } else if(!paginationServer){
       if (paramsAxiosApi) {
         getListDataFunc({pageNumber:undefined,pageSize:undefined});
       }
     }
   }, [history.location.search]);

  useEffect(()=>{
  if(res?.data?.length  > 0 && showSTTCollumn){
      res.data.map((item,index)=>{
        item.stt =  res.info.pageSize * (res.info.currentPage - 1) + (index + 1);
        return item
      })
  }
  },[res])
  return (
    <div className="table-component-custom">
      {props.propsCustom.filter?.length > 0 && (
        <Card className="mb-3" key="filter">
          <Form
            key="form-filter"
            name="filter"
            className="form-custom"
            form={form}
            onFinish={handleSubmitSearch}
            onChange={handleChangeFilter}
          >
            {props.propsCustom.filter?.map((i, index) => {
              const checked =
                i.type === typeFilter.Checked ? "checked" : undefined;
              return (
                <Form.Item
                  style={{ width: i.width ? i.width : "100%" }}
                  className={checked}
                  key={index}
                  name={i.name}
                  valuePropName={checked}
                >
                  {i.children}
                </Form.Item>
              );
            })}
            <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
              <Form.Item className="btn-submit" key="button-search">
                {/*<Button icon={<SearchOutlined/>} htmlType="submit" className="button-component-antd">*/}
                {/*    Tìm kiếm*/}
                {/*</Button>*/}
                <button className="fw-btn-fill btn-gradient-yellow">
                  {"SEARCH"}
                </button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      )}
      <Card key="table" className={classNameCard}>
        <Table
          {...props}
          columns={props.columns}
          loading={loading}
          dataSource={res?.data || props.dataSource}
          onChange={handleChangeTable}
          
          pagination={{
            itemRender:itemRender,
            pageSize: paginationServer ? dataRequest.pageSize : undefined,
            showSizeChanger: false,
            position: ["bottomRight"],
            total: res?.info?.totalCount || undefined,
            current: paginationServer
              ? parseInt(pageQueryString.pageNumber) || 1
              : undefined,
            onChange: handleChangePage,
          }}
        />
      </Card>
    </div>
  );
});

export default TableComponent_New;
