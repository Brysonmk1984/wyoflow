import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
export default class Header extends React.Component{
  render(){
    return(
      <header className="App-header">
        <div className="App-logo"></div>
        <div className="links">
          <ul>
            <li><Link  to={`/buyers`} activeclassname="active">Payors</Link></li>
            <li><Link  to={`/sellers`} activeclassname="active">Conservors</Link></li>
            <li><Link  to={`/validators`} activeclassname="active">Validators</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}