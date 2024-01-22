
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
import Default1 from '../../../components-reutilizables/default/default';
import GetAllClients from "../../cliente/layout/GetAllClients";
const authToken = Cookies.get('authToken');


const SuperAdministradorPage = () => {
    var rol = verifyToken(authToken).roles[0];
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
        setComponenteData(path);
    };

    React.useEffect(() => {

        if (rol !== "Super Administrador" || !Cookies.get('authToken') || responseState.status === 403) {
            handleLogOut();
        }
    }, []);

    const dataNav = [
        { item: "Usuario", path: "getalluser" },
        { item: "Servicios", path: "servicios" },
        { item: "Clientes", path: "getallclientes" },
        { item: "LogOut", path: "" },
    ];

    const componentMap = {
        "getalluser": <GetAll handleRedirect={handleRedirect}/>,
        "servicios": <ServiciosPage handleRedirect={handleRedirect}/>,
        "getallclientes": <GetAllClients handleRedirect={handleRedirect}/>,
        "default": <Default1 className="default" rol={rol}/>,
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

