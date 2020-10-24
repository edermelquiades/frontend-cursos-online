import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getUserDocentesActive } from "../../../api/user";
import ListUserDoc from "../../../components/Admin/Users/ListUserDocentes";
import "./UsersDocentes.scss";

export default function Users() {
 const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]); 
  const token = getAccessToken();
 const [reloadUsers, setReloadUsers] = useState(false)
  
 useEffect(() => {
    getUserDocentesActive(token, true).then((response) => {
      setUsersActive(response.users);
    });
    getUserDocentesActive(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false)
  }, [token, reloadUsers]);
  return (
    <div className="users">
      <ListUserDoc
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
