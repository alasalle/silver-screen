/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../../../Auth0/LoginButton";
import LogoutButton from "../../../../Auth0/LogoutButton";

function RightMenu(props) {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  
    if (error) {
      console.log({ERROR: error})
      return <div>Oops... {error.message}</div>;
    }
  
    if (isLoading) {
      return <div>Loading...</div>;
    }

  console.log({AUTH: isAuthenticated, USER: user})

  if (isAuthenticated) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <LogoutButton />
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login">
          <LoginButton />
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
