import React, { useEffect, useState } from "react";
import Default1 from "../../components-reutilizables/default/default";
import Cookies  from "js-cookie";
import AuthData from "../../../api/Auth";
import { verifyToken } from "../../../api/TokenDecode";
import GetAll from "../../components-services/User/layouts/getAll";
import ServiciosPage from "../../components-services/servicios/layout/ServiciosPage";
import GetAllClients from "../../components-services/cliente/layout/GetAllClients";
import Nav from "../../components-reutilizables/nav/Nav";
import Footer from "../../components-reutilizables/footer/Footer";
import './Administrador.css'
import TareasPage from "../../components-services/tarea/layout/TareaPage";
import DetalleTarea from "../../components-services/detalleUsuTarea/layout/DetalleTareaPage";

const AdministradorPage = ()=>{
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
        if (rol === "Empleado" || !Cookies.get('authToken') || responseState.status === 403){
            handleLogOut();
        }
    }

    useEffect(()=>{
        checkRoleAndToken();
        const intervalId = setInterval(checkRoleAndToken, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const dataNav= [
        { item: "Usuario", path: "getalluser" },
        { item: "Servicios", path: "servicios" },
        { item: "Clientes", path: "getallclientes" },
        { item: "Tareas", path: "tareas" },
        { item: "DetallesTareas", path: "detallestareas" },
        { item: "LogOut", path: "" },
    ]


    const componentMap = {
        "getalluser": <GetAll handleRedirect={handleRedirect}/>,
        "servicios": <ServiciosPage handleRedirect={handleRedirect}/>,
        "getallclientes": <GetAllClients handleRedirect={handleRedirect}/>,
        "tareas": <TareasPage handleRedirect={handleRedirect}/>,
        "detallestareas": <DetalleTarea handleRedirect={handleRedirect}/>,
        "default": <Default1 className="default"/>,
    }

    return (
        <div className={"Administrador"}>
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

export default AdministradorPage



