
// SuperAdministradorPage.js
import React, {useEffect, useState} from "react";
import './SuperAdministrador.css';
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import { verifyToken } from "../../../../api/TokenDecode";
import Nav from "../../../components-reutilizables/nav/Nav";
import GetAll from "../../../components-services/User/layouts/getAll";
import ServiciosPage from "../../../components-services/servicios/layout/ServiciosPage";
import Footer from "../../../components-reutilizables/footer/Footer";
import Default1 from '../../../components-reutilizables/default/default';
import GetAllClients from "../../../components-services/cliente/layout/GetAllClients";
import CargaDeDocumentos from "../../../components-services/cargaDeDocumentos/CargaDeDocumentos";
import CompaniaPage from "../../../components-services/compañia/layout/CompaniaPage";
import TareasPage from "../../../components-services/tarea/layout/TareaPage";
import MostrarDocumentos from "../../../components-services/mostrarDocumentos/MostrarDocumentos";



const SuperAdministradorPage = () => {
    const authToken = Cookies.get('authToken');
    let rol;
    if (authToken) {
        const decodedToken = verifyToken(authToken);
        if (decodedToken && decodedToken.roles) {
            rol = decodedToken.roles[0];
        }
    }

    const {responseState } =  AuthData();
    const [componenteData, setComponenteData] = useState("");

    const handleLogOut = () => {
        Cookies.remove('authToken');
        window.location.href = '/';
    };

    const handleGoBack = () => {
        setComponenteData("")
    };

    const handleRedirect = (path) => {
        setComponenteData(path);
    };
    const checkRoleAndToken = () => {
        if (rol !== "Super Administrador" || !Cookies.get('authToken') || responseState.status === 403) {
            handleLogOut();
        }
    };

    useEffect(() => {
        checkRoleAndToken();
        const intervalId = setInterval(checkRoleAndToken, 1000);
        return () => clearInterval(intervalId);
    }, []);


    const dataNav = [
        { item: "Usuario", path: "getalluser" },
        { item: "Servicios", path: "servicios" },
        { item: "Clientes", path: "getallclientes" },
        { item: "Compañias", path: "companias" },
        { item: "Tareas", path: "tareas" },
        { item: "Documentos", path: "documentos" },
        { item: "LogOut", path: "" },
    ];

    const componentMap = {
        "getalluser": <GetAll handleRedirect={handleRedirect}/>,
        "servicios": <ServiciosPage handleRedirect={handleRedirect}/>,
        "getallclientes": <GetAllClients handleRedirect={handleRedirect}/>,
        "companias": <CompaniaPage handleRedirect={handleRedirect}/>,
        "tareas": <TareasPage handleRedirect={handleRedirect}/>,
        "documentos":<CargaDeDocumentos handleRedirect={handleRedirect}/>,
        "mostrarDocumentos":<MostrarDocumentos handleRedirect={handleRedirect}/>,
        "default": <Default1 className="default" />,
    };

    return (
        <div className={"superAdmin"}>
            <div>
                <Nav
                    items={dataNav}
                    handleLogOut={handleLogOut}
                    handleGoBack={handleGoBack}
                    handleRedirect={handleRedirect}
                />
                {componentMap[componenteData] || componentMap["default"]}

            </div>

            <div>
                <Footer className="sa"/>
            </div>

        </div>
    );
};


export default SuperAdministradorPage;

