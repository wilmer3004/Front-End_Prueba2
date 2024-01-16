import React from 'react';
import "./Nav.css"

const Nav = ({ items, handleLogOut, handleGoBack, handleRedirect }) => {


    const handleClick = (path) => {
        if (path === "") {
            handleLogOut();
        } else if (path === "back") {
            handleGoBack();
        } else {
            handleRedirect(path);
        }
    };

    return (
        <nav className={"nav-page"}>
            <div className={"title"}>
                <h1>Ventas</h1>
            </div>
            <div className={"botones"}>
                <ul>
                    <li>
                        <button onClick={() => handleClick("back")}>Atrás</button>
                    </li>
                    {items.map((item, index) => (
                        <li key={index}>
                            <button onClick={() => handleClick(item.path.toLowerCase())} className={"data-button"}>
                                {item.item}
                            </button>
                        </li>
                    ))}

                </ul>
            </div>
        </nav>
    );
};

export default Nav;
