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
  // function actual() {
  //   let fecha = new Date(); //Actualizar fecha.
  //   let hora = fecha.getHours(); //hora actual
  //   let minuto = fecha.getMinutes(); //minuto actual
  //   let segundo = fecha.getSeconds(); //segundo actual
  //   if (hora < 10) {
  //     //dos cifras para la hora
  //     hora = "0" + hora;
  //   }
  //   if (minuto < 10) {
  //     //dos cifras para el minuto
  //     minuto = "0" + minuto;
  //   }
  //   if (segundo < 10) {
  //     //dos cifras para el segundo
  //     segundo = "0" + segundo;
  //   }
  //   //devolver los datos:
  //   let mireloj = hora + " : " + minuto + " : " + segundo;
  //   return mireloj;
  // }
  // function actualizar() {
  //   //función del temporizador
  //   let mihora = actual(); //recoger hora actual
  //   let mireloj = document.getElementById("reloj"); //buscar elemento reloj
  //   mireloj.innerHTML = mihora; //incluir hora en elemento
  // }
  // setInterval(actualizar, 1000); //iniciar temporizador

  return (
    <>
    
      {/* <div id="reloj"> 00 : 00 : 00</div> */}
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
    </>
  );
}
