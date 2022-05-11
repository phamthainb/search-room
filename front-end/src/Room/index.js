import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { requestToken } from "../api";
import { URL } from "../api/url";
import Layouts from "../Layout";

export default function Room() {
  const params = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (params.id) {
      requestToken({ url: URL.GET_ROOM(params.id), method: "GET" })
        .then((res) => {
          if (res.data) {
            setData({ ...res.data });
          }
        })
        .catch();
    }
  }, [params]);

  return (
    <Layouts>
      <div style={{ maxWidth: 750, margin: "auto", fontSize: 16, paddingLeft: 100 }}>
        <Row>
          <Col span={8}>Tên :</Col>
          <Col span={16}>Tên phòng</Col>
        </Row>
        <Row>
          <Col span={8}>Loại :</Col>
          <Col span={16}>Đơn/đôi</Col>
        </Row>
        <Row>
          <Col span={8}>Giá : </Col>
          <Col span={16}>129999</Col>
        </Row>
        <Row>
          <Col span={8}>Trạng thái :</Col>
          <Col span={16}>Trống / đang sử dụng</Col>
        </Row>
        <Row>
          <Col span={8}>Mô tả :</Col>
          <Col span={16}>Mô tả của room</Col>
        </Row>
        <Row>
          <Col span={8}>Khách hàng đang sử dụng :</Col>
          <Col span={16}>098788788</Col>
        </Row>
      </div>
    </Layouts>
  );
}
