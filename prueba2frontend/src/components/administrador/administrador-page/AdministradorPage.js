import React from "react";
import Default1 from "../../components-reutilizables/default/default";
import Cookies  from "js-cookie";
import { verifyToken } from "../../../api/TokenDecode";
import './Administrador.css'

const AdministradorPage = ()=>{
    const authToken = Cookies.get('authToken');
    var rol = verifyToken(authToken).roles[0];

    return <div className="admin">
        <p>Soy la pagina de administrador</p>
        <Default1 rol={rol} className="default"/>
    </div>;
};

export default AdministradorPage