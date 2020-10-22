import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import AddUserDocente from "../AddUserDocForms";
import {UserAddOutlined} from "@ant-design/icons";
import { getAccessToken } from "../../../../api/auth";
import "./ListUserDocentes.scss";
const { confirm } = ModalAntd;

export default function ListUserDocentes(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUserActives, setviewUserActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
   setIsVisibleModal(true);
   setModalTitle("Creando Nuevo Usuario");
   setModalContent(
     <AddUserDocente setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>
   )
  }

  return (
    <div className="list-users">
      <div className="list-users__header">

        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setviewUserActives(!viewUserActives)}
          />
          <span>
            {viewUserActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button className="boton" type="primary" onClick={addUserModal}>
        <UserAddOutlined />  Nuevo Usuario
        </Button>
      </div>
      {viewUserActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          setReloadUsers={setReloadUsers}
          usersInactive={usersInactive}
        />
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;
  const editUserDoc = (user) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar a :  ${user.name} ${user.lastname}`);
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUserDoc={editUserDoc}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}
function UserActive(props) {
  const { user, editUserDoc, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessToken();

    activateUserApi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };
  const showDeleteConfirm = () => {
    const accessToken = getAccessToken();
    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que deseas eliminar a ${user.name} ${user.lastname}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
            //     .then((response) => {

            //     .catch((err) => {
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUserDoc(user)}>
          <EditOutlined />
        </Button>,
        <Button
          type="danger"
          style={{ backgroundColor: "#E9D22E", borderColor: "#E9D22E" }}
          onClick={desactivateUser}
        >
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
         ${user.name ? user.name : "..."}
         ${user.lastname ? user.lastname : "..."}
         `}
        description={`${user.email}`}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive setReloadUsers={setReloadUsers} user={user} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessToken();

    activateUserApi(accessToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };
  const showDeleteConfirm = () => {
    const accessToken = getAccessToken();
    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que deseas eliminar a ${user.name} ${user.lastname}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
            //     .then((response) => {

            //     .catch((err) => {
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          style={{ backgroundColor: "#5A9401", borderColor: "#5A9401" }}
          onClick={activateUser}
        >
          <CheckOutlined />
        </Button>,

        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
         ${user.name ? user.name : "..."}
         ${user.lastname ? user.lastname : "..."}
         `}
        description={`${user.email}`}
      />
    </List.Item>
  );
}
