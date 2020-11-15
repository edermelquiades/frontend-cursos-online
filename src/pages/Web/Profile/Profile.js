import React, { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NoAvatar from "../../../assets/img/png/no-avatar.png";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { isEmailValid } from "../../../utils/validation";

import moment from "moment";
import {
  getAvatarApi,
  uploadAvatarApi,
  getPerfil,
  updateUserApi,
} from "../../../api/user";

import jwt from "jwt-simple";
import { SECRET_KEY } from "../../../utils/constants";
import {
  Form,
  Input,
  Card,
  Button,
  DatePicker,
  Row,
  Col,
  Avatar,
  notification,
  Descriptions,
  BackTop,
  Skeleton,
} from "antd";
import { getAccessToken } from "../../../api/auth";
import { UpOutlined } from "@ant-design/icons";
import "./Profile.scss";
import { stringify } from "query-string";

export default function Profile() {
  const token = getAccessToken();
  const usera = jwt.decode(token, SECRET_KEY, true);
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#D6D7D7",
    color: "#000",
    // opacity: 0.35,
    textAlign: "center",
    fontSize: 14,
  };

  useEffect(() => {
    getPerfil(token, usera.id).then((response) => {
      setUser(response.Stored);
    });
    setReloadUsers(false);
  }, [token, usera.id, reloadUsers]);

  useEffect(() => {
    setUserData({
      name: user ? user.name : "",
      lastname: user ? user.lastname : "",
      email: user ? user.email : "",
      role: user ? user.role : "",
      avatar: user ? user.avatar : "",
      birthday: user ? user.birthday : "",
    });
  }, [user]);

  useEffect(() => {
    if (user ? user.avatar : null) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  if (!getAccessToken()) {
    return <Redirect to="/" />;
  }

  const updateUser = (e) => {
    e.preventDefault();
    let userUpdate = userData;
    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["warning"]({
          message: "Las contraseñas deben ser iguales",
          style: { backgroundColor: "#FADF62", marginTop: 48 },
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }
    if (!userUpdate.name || userUpdate.name === "") {
      notification["warning"]({
        message: "El nombre  es obligatorio",
        style: { backgroundColor: "#FADF62", marginTop: 48 },
      });
    } else if (!userUpdate.lastname || userUpdate.lastname === "") {
      notification["warning"]({
        message: "Los Apellidos son  obligatorios",
        style: { backgroundColor: "#FADF62", marginTop: 48 },
      });
    } else if (!isEmailValid(userUpdate.email)) {
      notification["warning"]({
        message: "Email invalido",
        style: { backgroundColor: "#FADF62", marginTop: 48 },
      });
      return null;
    } else if (!userUpdate.email || userUpdate.email === "") {
      notification["error"]({
        message: "El email es obligatorio",
        style: { marginTop: 48 },
      });
    }
    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
            style: { marginTop: 48 },
          });
        });

        // setIsVisibleModal(false);
        setReloadUsers(true);
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
          style: { backgroundColor: "#B8FB82", marginTop: 48 },
        });
      });

      // setIsVisibleModal(false);
      setReloadUsers(true);
    }
  };

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={12} className="columnas">
          <div className="site-card-border-less-wrapper">
            {/* <Button type="link">Inicio /</Button> */}
            <Link className="link" to={"/"}>
              Inicio
            </Link>
            /
            <Card className="card" title="Actualizar  Perfil" bordered={false}>
              {" "}
              <Skeleton loading={!user} active avatar>
                <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                <Form className="form-add" onSubmitCapture={updateUser}>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item>
                        <Input
                          // prefix={<UserOutlined />}
                          placeholder="Nombres"
                          value={userData ? userData.name : null}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item>
                        <Input
                          // prefix={<UserOutlined />}
                          placeholder="Apellidos"
                          value={userData ? userData.lastname : null}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              lastname: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Form.Item>
                        <Input
                          // prefix={<MailOutlined />}
                          placeholder="Email"
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item>
                        <Input
                          // prefix={<LockOutlined />}
                          placeholder="Contraseña"
                          type="password"
                          // value={userData.password}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              password: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item>
                        <Input
                          // prefix={<LockOutlined />}
                          type="password"
                          placeholder="Repetir contraseña"
                          name="repeatPassword"
                          value={userData.repeatPassword}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              repeatPassword: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item>
                        <DatePicker
                          placeholder="Fecha de Nacimiento: 1997-18-09"
                          defaultValue={userData ? userData.birthday : null}
                          // value={moment(userData.birthday)}
                          // selected={moment(userData.birthday)}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              birthday: e,
                            })
                          }
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                    >
                      Registrar
                    </Button>
                  </Form.Item>
                </Form>
              </Skeleton>
            </Card>
          </div>
        </Col>

        <Col span={12} className="columnas">
          <div className="site-card-border-less-wrapper">
            <Card
              className="card2 "
              title="Información del  Perfil"
              bordered={false}
            >
              <ListInfo user={user} avatar={avatar} />
            </Card>
          </div>
        </Col>
        <BackTop>
          <div style={style}>
            <UpOutlined />
          </div>
        </BackTop>
      </Row>
    </>
  );
}

function ListInfo(props) {
  const { user, avatar } = props;

  const fechaReg = moment(user ? user.registerDate : "").format("YYYY-MM-DD");
  const fecha = moment(user ? user.birthday : "").format("YYYY-MM-DD");
  return (
    <>
      <Skeleton loading={!user} active avatar>
        <Avatar
          style={{
            width: 50,
            height: 50,
            float: "right",
            marginBottom: 10,
            marginTop: -15,
          }}
          src={avatar ? avatar : NoAvatar}
        />
        <Descriptions title=" Personal" layout="vertical">
          <Descriptions.Item label="Nombres">
            {user ? user.name : null}
          </Descriptions.Item>
          <Descriptions.Item label="Apellidos">
            {user ? user.lastname : null}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Nacimiento">
            {fecha}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Contacto" layout="vertical">
          <Descriptions.Item label="Email">
            {user ? user.email : null}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Administrativo" layout="vertical">
          <Descriptions.Item label="Rol">
            {user ? user.role : null}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Registro">
            {fechaReg}
          </Descriptions.Item>
        </Descriptions>
      </Skeleton>
    </>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;

  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
