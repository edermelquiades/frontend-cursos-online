import React, { useState, useEffect } from "react";
import "./UsersAdmin.scss";
import { getAccessToken } from "../../../api/auth";
import { getUserAdminActive } from "../../../api/user";
import ListUserA from "../../../components/Admin/Users/ListUserAdmin";
export default function UsersAdmin() {
  const [userAdminActive, setUserAdminActive] = useState([]);
  const [userAdminInactive, setUserAdminInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false)
  
  const token = getAccessToken();

  
  useEffect(() => {
    getUserAdminActive(token, true).then((response) => {
      setUserAdminActive(response.users);
    });
    getUserAdminActive(token, false).then((response) => {
      setUserAdminInactive(response.users);
      setReloadUsers(false)
    });
  }, [token, reloadUsers]);

  return (
    <div className="users-admin">
      <ListUserA setReloadUsers={setReloadUsers} userAdminActive={userAdminActive} userAdminInactive={userAdminInactive}/>
    </div>
  );
}
