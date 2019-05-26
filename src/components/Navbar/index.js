import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
          <ul className="navbar">
            <li>
              <Link to="/traveller-fe/">Add Traveller</Link>
            </li>
            <li>
              <Link to="/traveller-fe/list/">Traveller list</Link>
            </li>
          </ul>
        </nav>
  );
}

export default Navbar;
