import React, { useEffect, useState } from "react";
import { Card, Row, Col, Empty } from "antd";
import { useApi } from "@server/apiCallAxios";
import { SurveyCustomer } from "@modules/Customers/service";

interface Iprops {
  idCustomer: string;
}

const DetailQuestion = ({ idCustomer }: Iprops) => {
  const [data, setData] = useState(null);
  const { execute } = useApi();

  const getSurveyByCustomer = (idCustomer) => {
    const body = {
      questionIds: null,
      userIds: null,
      historyIds: [idCustomer],
    };
    execute(SurveyCustomer(body)).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getSurveyByCustomer(idCustomer);
  }, []);
  console.log(data);

  return (
    <Card>
      {data && data.length > 0 ? (
        data.map((item, index: number) => {
          return (
            <div key={index}>
              <Row style={{ fontSize: "16px" }}>
                <Col span={24}>
                  <span
                    style={{
                      fontStyle: "italic",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Question:{" "}
                  </span>
                  {item.question?.content}
                </Col>
                <Col span={24}>
                  <span
                    style={{
                      fontStyle: "italic",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Answer:
                  </span>
                  <ul>
                    {item.answer.map((answer) => {
                      if (answer.selected) {
                        return (
                          <li style={{ listStyleType: "none" }}>
                            <Row>{"-  " + answer.content}</Row>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </Col>
              </Row>
              <hr />
            </div>
          );
        })
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có khảo sát"
        />
      )}
    </Card>
  );
};
export default React.memo(DetailQuestion);
