import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  ReactNode,
} from "react";
import get from "lodash/get";
import join from "lodash/join";
// import ShowEntriesComponent from "../ShowEntriesComponent";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import {  List } from "antd";

import {
  DataRequest,
  initDataRequest,
} from "./interface";

import { useApi } from "@server/apiCallAxios";
import { DataResponse } from "../TableComponent_New/interface";
import { ListProps } from "antd/lib/list";
import { itemRender } from "@helper/functions";

import "./styles.scss";


// import {useTranslation} from "react-i18next";

interface Props extends ListProps<any> {

  propscustom: {
    initDataRequest?: DataRequest
    paramsAxiosApi: (dataRequest?, params?: any) => void;
    classNameCard?: any;
    showSTTCollumn?: boolean;
    params?: any;
    configUseApi?: {
      useRes?: boolean;
      useLoading?: boolean;
      _useDispatch?: boolean;
      initRes?: { data: Array<any>; info: null };
    };
    paginationServer: boolean;
    renderItem?: (item, index) => ReactNode
  };
}


const ListComponent = forwardRef((props: Props, ref) => {
  const {
    renderItem,
    classNameCard,
    showSTTCollumn,
    paramsAxiosApi,
    paginationServer,
    configUseApi,
  } = props.propscustom;
  const { execute, loading, res } = useApi<DataResponse>({
    ...configUseApi,
    useRes: true,
    useLoading:true
  });

  const [dataRequest, setDataRequest] = useState<DataRequest>(props?.propscustom?.initDataRequest || { ...initDataRequest, pageSize: 5 });

  const history = useHistory();
  const pageQueryString: any = queryString.parse(
    get(history, ["location", "search"], "?pageNumber=1")
  );


 
  const getListDataFunc = (params?: DataRequest) => {

    execute(
      paramsAxiosApi({ ...dataRequest, ...params }, { ...props.propscustom.params },)
    ).then((res) => {
      const data = res.data;
      if (data.length == 0 && dataRequest.pageNumber != 1) {
        handleChangePage(dataRequest.pageNumber - 1);
      }
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      handleGetListDataFunc(params?) {
        return getListDataFunc(params);
      },
      dataSource: res?.data || [],
      response: res,
    }),
    [res]
  );

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
        getListDataFunc();
      }
    }
  }, [history.location.search]);


  useEffect(() => {
    if (res?.data?.length > 0 && showSTTCollumn) {
      res.data.map((item, index) => {
        item.stt = res.info.pageSize * (res.info.currentPage - 1) + (index + 1);
        return item
      })
    }
  }, [res])

   useImperativeHandle(ref, () => ({
    handleGetListDataFunc() {
      return getListDataFunc();
    },
    dataSource: res?.data || [],
    resoponse: res,
  }), [res?.data]);



 const propsList = JSON.parse(JSON.stringify(props));
 propsList.propscustom =  undefined;
  return (
    <div className="table-list-component-custom">
      <List
        {...propsList}
        loading={loading}
        pagination={(res?.info?.totalCount != 0) ? {
          pageSize: dataRequest.pageSize,
          itemRender:itemRender,
          showSizeChanger: false,
          total: res?.info?.totalCount || undefined,
          current: paginationServer
            ? parseInt(pageQueryString.pageNumber) || 1
            : undefined,
          onChange: handleChangePage,
        } : undefined}
        itemLayout="horizontal"
        dataSource={res?.data}
        renderItem={(item, index) => renderItem(item, index)}
      />

      {/* </Card> */}
    </div>
  );
});

export default ListComponent;
