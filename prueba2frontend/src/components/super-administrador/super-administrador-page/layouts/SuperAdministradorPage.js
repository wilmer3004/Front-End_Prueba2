import React from "react";
import { useNavigate } from 'react-router-dom';
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import {verifyToken} from "../../../../api/TokenDecode";

const SuperAdministradorPage = () => {
    const { responseState } = AuthData();
    const navigate = useNavigate();

    // ----------------------------------------------------------
    // MAEJO DE ROLES Y AUTENTIFICACION
    React.useEffect(() => {
        const authToken = Cookies.get('authToken');
        let rol = verifyToken(authToken).roles[0]
        if(rol !=="Super Administrador"){
            Cookies.remove('authToken');
            window.location.href = '/'
        }
        if (!Cookies.get('authToken')) {
            navigate('/');
            Cookies.remove('authToken');
        }
        if (responseState.status === 403) {
            Cookies.remove('authToken');
            navigate('/');
        }

    }, []);

    const dataNav = [
        { item: "Inicio", path: "" },
        { item: "Registrar Usuario", path: "getalluser" },
    ];

    return (
        <div>
            <p>Soy la pagina de super administrador</p>
        </div>
    );
};

export default SuperAdministradorPage;
