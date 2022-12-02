import React, { Component } from "react";
import "./styles.css";

export class Top extends Component {
  render() {
    return <Header />;
  }
}

const Header = () => {
  return (
    <div className="header">
      <span className="header-title">Flower Web App</span>
      <br />
      <span className="header-text">.NET Internet Services Project</span>
    </div>
  );
};
