import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Empty, notification } from "antd";
import Card from "antd/es/card";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { PlusOutlined } from "@ant-design/icons";
import { useApi } from "@server/apiCallAxios";
import Modal from "antd/es/modal";
import TableComponent from "@components/commons/TableComponent";
import {
  getSessionQuestion,
  deleteSessionQuestion,
  getDetailSession,
  getQuestionSession,
  sortQuestion,
} from "./service";
import { getColumnsQuestion } from "./columns";
import ModalSurveyQuestion from "./components/ModalSurveyQuestion";
import { useParams } from "react-router";
import { useTranslate } from "@shared/Hook";
import { SurveyTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { LanguageContext } from "@shared/Context/Language";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

interface IDetailSession {
  name: string;
  title: string;
  description: string;
  userId: null;
  listQuestion: Array<any>;
  status: number;
}

const SurveyQuestion = (props) => {
  const tranSlateKey = useTranslate(SurveyTranslateKey);
  const {
    ADD_QUESTION,
    LIST_QUESTION_OF,
    DELETE_QUESTION_IN_SESSION,
    DELETE,
    CONFIRM_DELETE_QUESTION_IN_SESSION,
    EMPTY_QUESTION,
  } = tranSlateKey;
  const { id }: any = useParams();
  const { language } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState({ modal: false, data: null });
  const [detailSession, setDetailSession] = useState<IDetailSession>(null);
  const tableRef = useRef(null);
  const { execute } = useApi({ useRes: true });
  const callGetListQuestion = () => {
    execute(getQuestionSession(id)).then((res) => {
      const dataSort = res.data
        .map((item) => ({ ...item, orderSort: item.survey.order }))
        .sort((a, b) => {
          return a.orderSort - b.orderSort;
        });
      setDetailSession((pre) => ({
        ...pre,
        listQuestion: dataSort,
      }));
    });
  };
  useEffect(() => {
    execute(getDetailSession(id)).then((res) => {
      setDetailSession({
        ...res.data,
      });
    });
    callGetListQuestion();
  }, []);
  useEffect(() => {
    if (tableRef.current) {
      console.log(tableRef.current.response, "123123");
    }
  }, [tableRef]);
  const handleDelete = (surveyId) => {
    execute(deleteSessionQuestion(surveyId)).then((res) => {
      if (res) {
        notification.success({ message: res.message });
        callGetListQuestion();
      }
    });
  };

  const onDelete = (question) => {
    Modal.confirm({
      title: DELETE_QUESTION_IN_SESSION,
      content: `${CONFIRM_DELETE_QUESTION_IN_SESSION} ${question.content} ?`,
      onOk: () => handleDelete(question.survey.surveyId),
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

  const SortableItem = SortableElement(({ value }) => {
    return (
      <li className="items-question-session d-flex justify-content-between align-items-center mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon icon={faQuestion} />
          <h6>{value.content}</h6>
        </div>

        <ButtonComponent text={DELETE} onClick={() => onDelete(value)} />
      </li>
    );
  });

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items &&
          items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const arrayChange = arrayMove(
        detailSession.listQuestion,
        oldIndex,
        newIndex
      ).map((item, index) => {
        return {
          ...item,
          order: index,
        };
      });
      console.log(arrayChange);

      setDetailSession((pre) => ({ ...pre, listQuestion: arrayChange }));
      const dataSend = arrayChange.map((item) => ({
        surveyId: item.survey.surveyId,
        order: item.order,
      }));
      execute(sortQuestion(dataSend)).then((res) => {
        if (res) {
          notification.success({ message: res.message });
        }
      });
    }
  };

  const handleSuccess = useCallback(() => {
    console.log(1234);

    callGetListQuestion();
  }, [detailSession]);

  useEffect(() => {
    console.log(detailSession);
  }, [detailSession]);

  return (
    <>
      <Card>
        <div className="d-flex justify-content-between mb-4">
          <h6>
            {LIST_QUESTION_OF}
            {detailSession && detailSession.title}
          </h6>
          <ButtonComponent
            text={ADD_QUESTION}
            iconAnt={<PlusOutlined />}
            onClick={handleOpenModal}
          />
        </div>
        {detailSession &&
        detailSession.listQuestion &&
        detailSession.listQuestion.length > 0 ? (
          <SortableList
            items={detailSession.listQuestion}
            onSortEnd={onSortEnd}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
            description={<span>{EMPTY_QUESTION}</span>}
          ></Empty>
        )}

        {/* <TableComponent
          ref={tableRef}
          key="tableDevice"
          rowKey={"questionId"}
          title={() => (
            <></>
            //   <div className="d-flex justify-content-end">
            //     <ButtonComponent
            //       onClick={() => setOperatorModal(prev => ({ ...prev, visible: true }))}
            //       text={ADD_DEVICE}
            //       iconAnt={<FontAwesomeIcon className="mr-2" icon={faPlus} />}
            //     />
            //   </div>
          )}
          columns={columns}
          propsCustom={{
            paramsAxiosApi: getSessionQuestion,
            paginationServer: true,
            parmas: { id: id },
          }}
        /> */}
        <ModalSurveyQuestion
          visible={showModal.modal}
          data={showModal.data}
          translate={tranSlateKey}
          onCancel={() => setShowModal({ data: null, modal: false })}
          tableRef={tableRef}
          id={id}
          language={language}
          onSuccess={handleSuccess}
        />
      </Card>
    </>
  );
};

export default React.memo(SurveyQuestion);
