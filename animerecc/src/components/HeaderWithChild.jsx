import React, { Component } from "react";
import "./styles.css";

class HeaderWithChild extends Component {
  render() {
    return (
      <div className="main header">
        <div className="header-left">
          <img className="left-img" src="img/seige.png" alt="anime-girl-with-gun" />
        </div>
        <div className="header-right">
          <img className="right-img" src="img/leviside.png" alt="levi" />
        </div>
        <div className="header-child">{this.props.children}</div>
      </div>
    );
  }
}

export default HeaderWithChild;
