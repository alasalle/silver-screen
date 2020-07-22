import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo_transparent.png";
import "./Sections/Navbar.css";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <Button
        className="menu__mobile-button"
        type="primary"
        style={{
          margin: "22px auto",
          backgroundColor: "#344655",
          borderColor: "slategray",
        }}
        onClick={showDrawer}
      >
        <MenuFoldOutlined type="align-right" />
      </Button>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>

        <Drawer
          title="Silver Screen"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
