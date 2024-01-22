import React, { useEffect, useState } from "react";
import Default1 from "../../components-reutilizables/default/default";
import Cookies  from "js-cookie";
import AuthData from "../../../api/Auth";
import { verifyToken } from "../../../api/TokenDecode";
import './UsuarioRegular.css';
import GetAll from "../../components-services/User/layouts/getAll";
import ServiciosPage from "../../components-services/servicios/layout/ServiciosPage";
import GetAllClients from "../../components-services/cliente/layout/GetAllClients";
import Nav from "../../components-reutilizables/nav/Nav";
import Footer from "../../components-reutilizables/footer/Footer";

const UsuarioRegularPage = ()=>{
    const authToken = Cookies.get('authToken');
    var rol;

    const {responseState } =  AuthData();
    const [componentData, setComponentData] = useState("");  

    if(authToken){
        const decodedToken= verifyToken(authToken);
        if (decodedToken && decodedToken.roles){
            rol= decodedToken.roles[0];
        }
    }

    const handleLogOut = ()=>{
        Cookies.remove('authToken');
        window.location.href= '/';
    }

    const handleGoBack = ()=>{
        setComponentData("");
    }

    const handleRedirect= (path) => {
        setComponentData(path);
    };

    const checkRoleAndToken= () =>{
        if (!Cookies.get('authToken') || responseState.status === 403){
            handleLogOut();
        }
    }

    useEffect(()=>{
        checkRoleAndToken();
        const intervalId = setInterval(checkRoleAndToken, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const dataNav= [
        { item: "Servicios", path: "servicios" },
        { item: "Clientes", path: "getallclientes" },
        { item: "LogOut", path: "" },
    ]


    const componentMap = {
        "servicios": <ServiciosPage handleRedirect={handleRedirect}/>,
        "getallclientes": <GetAllClients handleRedirect={handleRedirect}/>,
        "default": <Default1 className="default" />,
    }

    return (
        <div className={"empleado"}>
            <div>
                <Nav
                    items={dataNav}
                    handleLogOut={handleLogOut}
                    handleGoBack={handleGoBack}
                    handleRedirect={handleRedirect}
                />
                {componentMap[componentData] || componentMap["default"]}

            </div>

            <div>
                <Footer className="sa"/>
            </div>


        </div>
    )
};

export default UsuarioRegularPage



