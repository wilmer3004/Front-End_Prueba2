// Nav.js

import React from 'react';
import "./Nav.css"
import { Link } from 'react-router-dom';

const Nav = ({ items }) => {
    return (
        <nav>
            <div className={"title"}>
                <h1>Accesorios de computadores</h1>
            </div>
            <div className={"botones"}>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.toLowerCase()}`} className={"data-button"}>
                                <button>
                                    {item}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
