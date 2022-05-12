import React, { useEffect, useState } from "react";

import { Table, InputNumber, DatePicker, message } from "antd";
import Layouts from "../Layout";

import { Form, Row, Col, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { requestToken } from "../api";
import { URL } from "../api/url";

const { Option } = Select;

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
            <Select defaultValue={-1}>
              <Option value={-1}>Tất cả</Option>
              <Option value={0}>Còn trống</Option>
              <Option value={1}>Đang sử dụng</Option>
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
      </Row>

      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
            marginBottom: '24px'
          }}
        >
          <Button type="ghost" onClick={() => {
            requestToken({
              method: "POST", url: 'http://localhost:3006/excel', data: {
                data: data
              }
            })
              .then((res) => {
                // setData(res.data);
                console.log(res);
              })
              .catch(() => {
                message.error("Error in searching rooms");
              });
          }} >
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
  },
  {
    title: "Loại",
    dataIndex: "type",
    key: "price",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (record.status ? "Đang sử dụng" : "Còn trống"),
  },
  {
    title: "Mô tả",
    dataIndex: "desc",
    key: "desc",
  },
];

const SearchRoom = () => {
  const [params, setParams] = useState({});

  const [data, setData] = useState([]);

  useEffect(() => {
    requestToken({ method: "GET", url: URL.GET_ROOMS, params })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        message.error("Error in searching rooms");
      });
  }, [params]);

  return (
    <Layouts>
      <AdvancedSearchForm
        onSearch={(values) => {
          setParams({ ...values });
        }}
        data={data}
      />
      <Table columns={columns} dataSource={data} />
    </Layouts>
  );
};

export default SearchRoom;
