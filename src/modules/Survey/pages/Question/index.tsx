import React, { useContext, useEffect, useRef, useState } from "react";
import { notification } from "antd";
import Card from "antd/es/card";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { PlusOutlined } from "@ant-design/icons";
import { useApi } from "@server/apiCallAxios";
import Modal from "antd/es/modal";
import TableComponent from "@components/commons/TableComponent";
import { getQuestion, deleteQuestion } from "./service";
import { getColumnsQuestion } from "./columns";
import ModalSession from "./components/ModalSession";
import { useTranslate } from "@shared/Hook";
import { SurveyTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { LanguageContext } from "@shared/Context/Language";
import TableComponent_New from "@components/commons/TableComponent_New";

const Question = (props) => {
  const { language } = useContext(LanguageContext);
  const tranSlateKey = useTranslate(SurveyTranslateKey);
  const { ADD, DELETE_QUESTION, CONFIRM_DELETE_QUESTION } = tranSlateKey;
  const [showModal, setShowModal] = useState({ modal: false, data: null });
  const tableRef = useRef(null);
  const { execute } = useApi({ useRes: true });
  const handleDelete = (questionId) => {
    execute(deleteQuestion(questionId)).then((res) => {
      if (res) {
        notification.success({ message: res.message });
        tableRef.current.handleGetListDataFunc();
      }
    });
  };

  const onDelete = ({ questionId, title }) => {
    Modal.confirm({
      title: DELETE_QUESTION,
      content: `${CONFIRM_DELETE_QUESTION} ${title} ?`,
      onOk: () => handleDelete(questionId),
    });
  };
  const onUpdate = (rowData) => {
    setShowModal({
      modal: true,
      data: rowData,
    });
  };

  const columns = getColumnsQuestion(
    { onDelete, onUpdate },
    tranSlateKey,
    language
  );

  const handleOpenModal = () => {
    setShowModal({ modal: true, data: null });
  };

  return (
    <>
      <Card>
        <div className="d-flex justify-content-end mb-4">
          <ButtonComponent
            text={ADD}
            iconAnt={<PlusOutlined />}
            onClick={handleOpenModal}
          />
        </div>
        <TableComponent_New
            ref={tableRef}
            key="tableDevice"
            rowKey={"sessionId"}
            columns={columns}
            propsCustom={{
                showSTTCollumn:true,
                paramsAxiosApi: getQuestion,
                paginationServer: true,
            }}
        />
        <ModalSession
          visible={showModal.modal}
          data={showModal.data}
          translate={tranSlateKey}
          onCancel={() => setShowModal({ data: null, modal: false })}
          tableRef={tableRef}
          language={language}
        />
      </Card>
    </>
  );
};

export default React.memo(Question);
