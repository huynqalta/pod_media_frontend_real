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
    showSTTCollumn?: Object;
    valueSearch?: any;
    filter?: Array<FilterObj>;
    parmas?: any;
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
  limit: 10,
  page: 1,
  totalRecord: 0,
};

const TableComponent = forwardRef((props: Props, ref) => {
  const {
    classNameCard,
    showSTTCollumn,
    paramsAxiosApi,
    paginationServer,
    configUseApi,
  } = props.propsCustom;
  const { execute, loading, res } = useApi({
    ...configUseApi,
    useRes: true,
    useLoading: true,
  });
  const [dataRequest, setDataRequest] = useState<DataRequest>(initDataRequest);

  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (paginationServer) {
      const pageQueryString: any = queryString.parse(
        get(history, ["location", "search"], "?page=1")
      );
      if (
        !!pageQueryString.page &&
        parseInt(pageQueryString.page) !== dataRequest.page
      ) {
        setDataRequest((prev) => ({
          ...prev,
          page: parseInt(pageQueryString.page),
        }));
      } else {
        setDataRequest((prev) => ({
          ...prev,
          page: 1,
        }));
      }
    } else {
      if (paramsAxiosApi) {
        getListDataFunc();
      }
    }
  }, []);
  useEffect(() => {
    props.changeComponent && props.changeComponent(res);
  }, [res]);

  const getListDataFunc = () => {
    execute(
      paramsAxiosApi({ ...dataRequest }, { ...props.propsCustom.parmas })
    ).then((res) => {
      const data = res.data;
      if (data.length == 0 && dataRequest.page != 1) {
        handleChangePage(dataRequest.page - 1);
      }
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      handleGetListDataFunc() {
        return getListDataFunc();
      },
      dataSource: res?.data || [],
      response: res,
    }),
    [res]
  );
  const handleChangeTable = (pagination, filters, sorter, extra) => {
    if (extra.action == "sort") {
      setDataRequest((prev) => ({
        ...prev,
        sortField: !!sorter.field ? sorter.field : "",
        sortOrder: !!sorter.order ? sorter.order : "",
      }));
    }
  };
  const handleChangePage = (page, value?) => {
    if (paginationServer) {
      const prevSearch = queryString.parse(history.location.search);

      const arraySearchFilter = [];
      for (let keys in prevSearch) {
        if (keys != "page") {
          arraySearchFilter.push(`${keys}=${prevSearch[keys]}`);
        }
      }
      const newSearch = join(arraySearchFilter, "&");
      if (value) {
        setDataRequest((prev) => ({ ...prev, ...value, page: page }));
      } else {
        setDataRequest((prev) => ({ ...prev, page: page }));
      }
      if (newSearch) {
        history.push({ search: `?${newSearch}&page=${page}` });
      } else {
        history.push({ search: `?page=${page}` });
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
    // setDataRequest(prev => ({ ...prev, ...valueSubmit, page: 1 }));
  };
  const handleChangeFilter = (valueChanges) => {};

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  useMemo(() => {
    if (paramsAxiosApi && dataRequest.page != -1) {
      getListDataFunc();
    }
  }, [dataRequest]);

  const pageQueryString: any = queryString.parse(
    get(history, ["location", "search"], "?page=1")
  );

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
      {/* <Card key="table" className={classNameCard}> */}
        <Table
          {...props}
          columns={props.columns}
          loading={loading}
          
          dataSource={res?.data || props.dataSource}
          onChange={handleChangeTable}
          title={()=><span>"props"</span>}
          pagination={{
            itemRender:itemRender,
            pageSize: dataRequest.limit,
            showSizeChanger: false,
            position: ["bottomRight"],
            total: res?.info?.totalRecord || undefined,
            current: paginationServer
              ? parseInt(pageQueryString.page) || 1
              : undefined,
            onChange: handleChangePage,
          }}
        />
      {/* </Card> */}
    </div>
  );
});

export default TableComponent;
