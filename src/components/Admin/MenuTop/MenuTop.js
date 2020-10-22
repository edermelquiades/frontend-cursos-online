import React, { useState } from "react";
import { logout } from "../../../api/auth";
import { Button, notification } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  SyncOutlined
} from "@ant-design/icons";
import logoFacci from "../../../assets/img/png/logoFaci.png";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const [logoutValid, setLogoutValid] = useState(false)
  
  const logoutUser = () => {
    notification["success"]({
      message: "Desconectado correctamente",
      style: {backgroundColor: '#B8FB82'} 
    })
    logout();
    
    setLogoutValid(true)
    
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={logoFacci} alt="facci" />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
  { logoutValid ? <SyncOutlined spin /> : <PoweroffOutlined /> }
        </Button>
      </div>
    </div>
  );
}
