import React from "react";
import { SmileTwoTone } from "@ant-design/icons";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        {" "}
        Happy Coding <SmileTwoTone />
      </p>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  );
}

export default Footer;
