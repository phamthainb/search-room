import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { requestToken } from "../api";
import { URL } from "../api/url";
import Layouts from "../Layout";



const columns = [
  {
    title: "Khách hàng ID",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Nhân viên ID",
    dataIndex: "employee",
    key: "employee",
  },
  {
    title: "Bắt đầu",
    dataIndex: "start",
    key: "start",
    render: (text, record) => `${new Date(record.start).toLocaleTimeString('vi-VN')} - ${new Date(record.start).toLocaleDateString('vi-VN')}`,
  },
  {
    title: "Trả phòng",
    dataIndex: "end",
    key: "end",
    render: (text, record) => `${new Date(record.start).toLocaleTimeString('vi-VN')} - ${new Date(record.start).toLocaleDateString('vi-VN')}`,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (record.status === 1 ? "Đang sử dụng" : "Đã trả phòng"),
  }
];

export default function Room() {
  const params = useParams();

  const [data, setData] = useState(null);
  const [ldata, setLData] = useState([]);

  useEffect(() => {
    if (params.id) {
      // get detail rooom
      requestToken({ url: URL.GET_ROOM(params.id), method: "GET" })
        .then((res) => {
          if (res.data) {
            setData({ ...res.data });
          }
        })
        .catch();

      // get history room order
      requestToken({
        url: URL.GET_ROOM_ORDER, method: "GET", params: {
          room: params.id
        }
      })
        .then((res) => {
          if (res.data) {
            setLData(res.data);
          }
        })
        .catch();
    }
  }, [params]);

  return (
    <Layouts>
      <div style={{ maxWidth: 750, margin: "auto", marginBottom: "52px", fontSize: 16, paddingLeft: 100 }}>
        <Row>
          <Col span={8}>Tên :</Col>
          <Col span={16}>{data?.name}</Col>
        </Row>
        <Row>
          <Col span={8}>Loại :</Col>
          <Col span={16}>Phòng {data?.type === 1 ? 'đơn' : 'đôi'}</Col>
        </Row>
        <Row>
          <Col span={8}>Giá : </Col>
          <Col span={16}>$ {data?.price}</Col>
        </Row>
        <Row>
          <Col span={8}>Trạng thái :</Col>
          <Col span={16}>{data?.status ? "Còn trống" : "Đang sử dụng"}</Col>
        </Row>
        <Row>
          <Col span={8}>Mô tả :</Col>
          <Col span={16}>{data?.desc}</Col>
        </Row>
      </div>

      <h2>Lịch sử đặt phòng</h2>
      {ldata && <Table columns={columns} dataSource={ldata} />}
    </Layouts>
  );
}
