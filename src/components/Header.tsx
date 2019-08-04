import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import logo from '../logo.svg';
import {NavLink} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} className="App-logo" alt="logo"/>
          <NavLink exact to="/" className="nav-link" activeClassName="nav-link-active">
            <Typography variant="h6" className="mx-3 cursor-pointer">
              Home
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </header>
  )
};

export default Header;
