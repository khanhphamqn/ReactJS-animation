import React, { Component } from 'react';
import './index.scss';
import { Link } from "react-router-dom";

class SideBar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <ul className="list-unstyled">
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>
            <Link className="link" to="/slide">Slide</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;