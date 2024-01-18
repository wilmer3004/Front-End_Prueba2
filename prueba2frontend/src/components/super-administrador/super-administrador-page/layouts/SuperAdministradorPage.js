
// SuperAdministradorPage.js
import React, {useState} from "react";
import './SuperAdministrador.css';
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import { verifyToken } from "../../../../api/TokenDecode";
import Nav from "../../../components-reutilizables/nav/Nav";
import GetAll from "../../User/layouts/getAll";
import ServiciosPage from "../../servicios/layout/ServiciosPage";
import Footer from "../../../components-reutilizables/footer/Footer";

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
        "getalluser": <GetAll handleRedirect={handleRedirect}/>,
        "servicios": <ServiciosPage/>,
        "default": <div></div>,
    };

    const dataFooter = ["Pagina de ventas de srvicios","hola"];


    return (
        <div className={"superAdmin"}>
            <Nav
                items={dataNav}
                handleLogOut={handleLogOut}
                handleGoBack={handleGoBack}
                handleRedirect={handleRedirect}
            />
            {componentMap[componenteData] || componentMap["default"]}
            <Footer/>
        </div>
    );
};


export default SuperAdministradorPage;

