// SuperAdministradorPage.js
import React, {useState} from "react";
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import { verifyToken } from "../../../../api/TokenDecode";
import Nav from "../../../components-reutilizables/nav/Nav";
import GetAll from "../../User/layouts/getAll";
import ServiciosPage from "../../servicios/layout/ServiciosPage";

const SuperAdministradorPage = () => {
    const { responseState } = AuthData();
    const [componenteData, setComponenteData] = useState("");

    const handleLogOut = () => {
        Cookies.remove('authToken');
        window.location.href = '/';
    };

    const handleGoBack = () => {
        setComponenteData("")
    };

    const handleRedirect = (path) => {
        console.log(`${path}`);
        setComponenteData(path);
    };

    React.useEffect(() => {
        const authToken = Cookies.get('authToken');
        let rol = verifyToken(authToken).roles[0];

        if (rol !== "Super Administrador" || !Cookies.get('authToken') || responseState.status === 403) {
            handleLogOut();
        }
    }, []);

    const dataNav = [
        { item: "Usuario", path: "getalluser" },
        { item: "Servicios", path: "servicios" },
        { item: "LogOut", path: "" },
    ];
    const componentMap = {
        "getalluser": <GetAll/>,
        "servicios": <ServiciosPage/>,
        "default": <div></div>,
    };


    return (
        <div>
            <Nav
                items={dataNav}
                handleLogOut={handleLogOut}
                handleGoBack={handleGoBack}
                handleRedirect={handleRedirect}
            />
            {componentMap[componenteData] || componentMap["default"]}

        </div>
    );
};

export default SuperAdministradorPage;