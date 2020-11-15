import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  FontColorsOutlined,
  FolderAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import "./MenuSidebar.scss";

function MenuSidebar(props) {
  const { menuCollapsed, location } = props;

  const { Sider } = Layout;
  return (
    <Sider className="panel-sidebar" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/panel">
          <Link to={"/panel"} className="center">
            <HomeOutlined />
            <span className="nac-text">Inicio</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/panel/cursos">
          <Link to={"/panel/cursos"} className="center">
            <FolderAddOutlined />
            <span className="nac-text">Crear Curso</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default withRouter(MenuSidebar);
