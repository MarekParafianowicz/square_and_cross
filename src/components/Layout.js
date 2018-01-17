import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      <Link to="/">
        {/* <img className="logo" src="/img/logo-judo-heroes.png" alt="Judo Heroes logo" /> */}
      </Link>
    </header>
    <div className="app-content">{props.children}</div>
  </div>
);

export default Layout;
