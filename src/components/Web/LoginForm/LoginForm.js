import React, { useState } from "react";
import { Form, Input, Button, notification, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { apiLogin } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { signUpLoading, setSignUpLoading } = props;
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    setSignUpLoading(true);
    e.preventDefault();
    const result = await apiLogin(inputs);
    if (result.messsage) {
      notification["error"]({
        message: result.messsage,
        style: { marginTop: 45 },
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({
        message: "login correcto",
        style: { marginTop: 45 },
      });
      window.location.href = "/";
    }
  };

  return (
    <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
      <Form.Item>
        <Input
          prefix={<UserOutlined className="icon" />}
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined className="icon" />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          {!signUpLoading ? "Iniciar sesion" : <Spin animation="border" />}
        </Button>
      </Form.Item>
    </Form>
  );
}
