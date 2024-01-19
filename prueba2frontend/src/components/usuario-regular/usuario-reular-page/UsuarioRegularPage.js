import React from "react";
import Default1 from "../../components-reutilizables/default/default";
import Cookies  from "js-cookie";
import { verifyToken } from "../../../api/TokenDecode";
import './UsuarioRegular.css';

const UsuarioRegularPage = ()=>{
    const authToken = Cookies.get('authToken');
    var rol = verifyToken(authToken).roles[0];

    return <div className="empleado">
        <p>Soy la pagina de usuario regular</p>
        <Default1 rol={rol} className="default"/>

    </div>;
};

export default UsuarioRegularPage



