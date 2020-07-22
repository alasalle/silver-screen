import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu
      mode={props.mode}
      className="leftMenu"
    >
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="faves">
        <a href="/favorites">Favorites</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
