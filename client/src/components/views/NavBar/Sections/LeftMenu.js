import React from "react";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
function LeftMenu(props) {
  const { isLoading, isAuthenticated } = useAuth0();
  return (
    <Menu mode={props.mode} className="leftMenu">
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      {!isLoading && isAuthenticated && (
        <Menu.Item key="faves">
          <a href="/favorites">Favorites</a>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default LeftMenu;
