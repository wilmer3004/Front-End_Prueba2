
import Nav from "../../../components-reutilizables/nav/Nav";
import Table from "../../../components-reutilizables/table/Table";
import useServicioDataService from "../DataServicio";
import Swal from "sweetalert2";
import React, {useState} from "react";
import Formulario from "../../../components-reutilizables/formulario/formulario";




const ServiciosPage = ({handleRedirect})=>{
    const { servicios, fetchData,updateState,postHttp } = useServicioDataService();
    const [titlee, settitlee] = useState('');

    const handleState= (id)=>{
        updateState(id);
        Swal.fire({
            title: `Se edito el estado`,
            text: `Se edito estado correctamte del servicio con id ${id} en la base de datos :D`,
            icon: "success"
        });
    }



    const nameColumnsDisplay =["ID Servicio","Nombre Servicio","Estado Servicio"];
    const nameColumnsKeys = ["idServicio","nombreServicio","estadoServicio"];

    const abrirForm=(title)=>{
        settitlee(title);
    }
    const handlePost=(data)=>{
        postHttp(data)
        settitlee('')
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamte el servicio en la base de datos :D",
            icon: "success"
        });
        handleRedirect("servicios");
    }





    return<div>
        <Table title={"Servicios"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={servicios} handleState={handleState} abrirForm={abrirForm} titleForm={"Registrar Servicio"}/>

        {titlee === "Registrar Servicio" ? (
            <>
                <Formulario title={titlee} setTitle={settitlee} handlePost={handlePost}/>
            </>
        ): null}

    </div>



};

export default ServiciosPage;




