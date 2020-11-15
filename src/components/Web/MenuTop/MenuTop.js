import React from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { PoweroffOutlined, SettingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Logo from "../../../assets/img/png/logoFaci.png";
import "./MenuTop.scss";

import { logout } from "../../../api/auth";
import SubMenu from "antd/lib/menu/SubMenu";

export default function MenuTop(props) {
  const { user } = props;

  const logoutUser = () => {
    notification["success"]({
      message: "Desconectado correctamente",
      style: { backgroundColor: "#B8FB82" },
    });
    logout();

    window.location.reload();
  };

  return (
    <Menu className="menu-top" mode="horizontal">
      <Menu.Item className="menu-top__logo es">
        <Link to={"/"}>
          <img src={Logo} alt="facci" />
        </Link>
      </Menu.Item>
      <Menu.Item className="menu-top__item">
        <Link to={"/"}> Inicio </Link>
      </Menu.Item>
      <Menu.Item className="menu-top__item">
        <Link to={"/quienes-somos"}> ¿Quienes somos? </Link>
      </Menu.Item>
      <Menu.Item className="menu-top__item">
        <Link to={"/contact"}> Contactos </Link>
      </Menu.Item>

      <Menu.Item className="login">
        <h3>
          {user ? (
            user.role === "ADMIN" ? (
              <Button type="ghost" className="boton">
                <Link to={"/panel"}>Panel</Link>
              </Button>
            ) : null
          ) : null}
        </h3>
        <h3>
          {user ? (
            user.role === "DOCENTE" ? (
              <Button type="ghost" className="boton">
                <Link to={"/login"}>Panel</Link>
              </Button>
            ) : null
          ) : null}
        </h3>
      </Menu.Item>
      <SubMenu
        className="nombre"
        key="SubMenu"
        // icon={user ? <SettingOutlined /> : null}
        title={user ? [user.name, " ", user.lastname] : null}
      >
        <Menu.ItemGroup title="Usuario">
          <Menu.Item key="setting:1" className="subm">
            <Link to={`/profile/ ${user ? user.id : null}`}>Perfil</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">Modo oscuro</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item>
        {user ? (
          <Button type="link">
            <PoweroffOutlined onClick={logoutUser} />
          </Button>
        ) : (
          <Button type="ghost" className="boton">
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
      </Menu.Item>
      {/* <SocialLinks /> */}
    </Menu>
  );
}
