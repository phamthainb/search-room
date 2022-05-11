import { Form, Input, Button, Row, message } from "antd";
import { request } from "../api";
import { URL } from "../api/url";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  //employee1 - 1

  const onFinish = (values) => {
    request({ method: "POST", url: URL.LOGIN, data: values })
      .then((res) => {
        localStorage.setItem("token", res.data);
        nav("/");
      })
      .catch((err) => {
        message.error("Invalid account !");
      });
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ height: "100vh" }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
        style={{
          padding: "40px",
          maxWidth: "800px",
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
