/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../../../Auth0/LoginButton";
import LogoutButton from "../../../../Auth0/LogoutButton";

function RightMenu(props) {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (error) {
    console.error(error);
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="error">
          <div className="auth-helper-text">Oops...{error.message}</div>
        </Menu.Item>
      </Menu>
    );
  }

  if (isLoading) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="loading">
          <div className="auth-helper-text" style={{ padding: "0px 5px" }}>
            Loading...
          </div>
        </Menu.Item>
      </Menu>
    );
  }

  if (isAuthenticated) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout" style={{ padding: "0px 5px" }}>
          <LogoutButton />
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login" style={{ padding: "0px 5px" }}>
          <LoginButton />
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
