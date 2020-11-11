import { SurveyCustomer } from "@modules/Customers/service";
import { useApi } from "@server/apiCallAxios";
import { useTranslate } from "@shared/Hook";
import { CustomersTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { Card, Col, Modal, Row } from "antd";
import React, { Suspense, useEffect, useState } from "react";

const DetailQuestion = React.lazy(() => import("./DetailQuestion"));

const FormSurvey = ({ displayForm, closeForm, dataRow }) => {
  const { SURVEY } = useTranslate(CustomersTranslateKey);
  return (
    <>
      <Modal
        visible={displayForm}
        onCancel={closeForm}
        footer={null}
        title={`${SURVEY} ${(dataRow && dataRow.device?.deviceName) || ""}`}
        className="modalCustomer"
        width="800px"
      >
        {displayForm && dataRow && (
          <Suspense fallback={<div></div>}>
            <DetailQuestion idCustomer={dataRow.historyId} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};

export default React.memo(FormSurvey);
