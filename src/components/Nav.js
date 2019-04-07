import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
  return (
    <ul className="nav nav-pills" style={{marginBottom: '20px'}}>
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link" />
      </li>
      <li className="nav-item">
        <NavLink to="/products" className="nav-link" />
      </li>
      <li className="nav-item">
        <NavLink to="/users" className="nav-link" />
      </li>
    </ul>
  );
};

export default Nav;
