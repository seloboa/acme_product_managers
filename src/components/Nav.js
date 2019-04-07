import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = props => {
  const {managers} = props;
  return (
    <ul className="nav nav-pills" style={{marginBottom: '20px'}}>
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/users" className="nav-link">
          Managers ({managers.length})
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
