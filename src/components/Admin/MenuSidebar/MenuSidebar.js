import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UsergroupDeleteOutlined, HomeOutlined } from "@ant-design/icons";

import "./MenuSidebar.scss";

function MenuSidebar(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;
  return (
    <Sider className="admin-sidebar" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={"/admin"} className="center">
            <HomeOutlined />
            <span className="nac-text">Inicio</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/usersDocente">
          <Link to={"/admin/usersDocente"} className="center">
            <UsergroupDeleteOutlined />
            <span className="nac-text">Usuarios Docente</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default withRouter(MenuSidebar);
