import React, { useEffect, useState } from "react";

import { Table, InputNumber, DatePicker, message, Steps } from "antd";
import Layouts from "../Layout";
import { Form, Row, Col, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { request, requestToken } from "../api";
import { URL } from "../api/url";
import { requestStatus } from "../enum";

const { Option } = Select;
const { Step } = Steps;

const AdvancedSearchForm = ({ onSearch, data }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name={"name"} label={"Tên phòng"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"status"} label={"Trạng thái"}>
            <Select defaultValue={null}>
              <Option value={null}>Tất cả</Option>
              <Option value={1}>Còn trống</Option>
              <Option value={0}>Đang sử dụng</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"minPrice"} label={"Giá thấp nhất"}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"maxPrice"} label={"Giá cao nhất"}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name={"desc"} label={"Mô tả"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"startTime"} label={"Ngày bắt đầu"}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"endTime"} label={"Ngày kết thúc"}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"type"} label={"Loại phòng"}>
            <Select defaultValue={null}>
              <Option value={null}>Tất cả</Option>
              <Option value={1}>Phòng đơn</Option>
              <Option value={2}>Phòng Đôi</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
            marginBottom: "24px",
          }}
        >
          <Button
            type="ghost"
            onClick={() => {
              requestToken({
                method: "POST",
                url: URL.EXPORT_EXCEL,
                data: {
                  data: data,
                  file_name: "list-room",
                },
                header: {
                  "Content-Type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
              })
                .then((res) => {
                  window.open(`http://localhost:3006/${res.data}`);
                })
                .catch(() => {
                  message.error("Error Export Excel file");
                });
            }}
          >
            Export Excel
          </Button>

          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>

          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên phòng",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Link to={`/room/${record.id}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (text, record) => `$ ${Intl.NumberFormat().format(text)}/ngày`,
    sorter: (a, b) => Number(a.price) - Number(b.price),
  },
  {
    title: "Loại",
    dataIndex: "type",
    key: "type",
    render: (text, record) => (record.type === 1 ? "Phòng đơn" : "Phòng đôi"),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (!record.status ? "Đang sử dụng" : "Còn trống"),
  },
  {
    title: "Mô tả",
    dataIndex: "desc",
    key: "desc",
    width: 400,
    render: (text, record) => <span style={{ maxWidth: "200px" }}>{text}</span>,
  },
];

const SearchRoom = () => {

  const timeoutRef = React.useRef(null)

  const [params, setParams] = useState({});

  const [data, setData] = useState([]);

  const [status, setStatus] = useState(0);

  const [loading, setLoading] = useState(false);

  const getRequest = React.useCallback((id) => {
    if (id) {
      requestToken({ method: "GET", url: URL.GET_REQUEST(id) }).then((res) => {
        if (requestStatus[res.data.status]?.step !== 6) {
          setStatus(requestStatus[res.data.status].step);
          timeoutRef.current = setTimeout(getRequest, 2000, id);
        } else {
          setStatus(7);
          setData(res.data.data);
          setLoading(false)
        }
      });
    }
  }, []);

  useEffect(() => {
    requestToken({ method: "GET", url: URL.GET_ROOMS, params })
      .then((res) => {
        if (res.data) {
          setLoading(true)
          getRequest(res.data.request_id);
        }
      })
      .catch(() => {
        message.error("Error in searching rooms");
      });
  }, [params, getRequest]);

  useEffect(() => {
    return () => {
      if(timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <Layouts>
      <Steps current={status} direction="vertical">
        {Object.entries(requestStatus).map(([k, v]) => (
          <Step
            description={
              status === v.step
                ? "In progress"
                : status > v.step
                ? "Finished"
                : "Waiting"
            }
            title={v.label}
          />
        ))}
      </Steps>
      <AdvancedSearchForm
        onSearch={(values) => {
          if (!loading) {
            setParams({ ...values });
          }
        }}
        data={data}
      />
      <Table columns={columns} dataSource={data} />
    </Layouts>
  );
};

export default SearchRoom;
