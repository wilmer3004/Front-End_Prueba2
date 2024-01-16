// Nav.js
import React from 'react';
import "./Nav.css"
import { Link } from 'react-router-dom';

const Nav = ({items},{path}) => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <nav>
            <div className={"title"}>
                <h1>Ventas</h1>
            </div>
            <div className={"botones"}>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.path.toLowerCase()}`} className={"data-button"}>
                                <button>
                                    {item.item}
                                </button>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button onClick={handleGoBack}>Atrás</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
