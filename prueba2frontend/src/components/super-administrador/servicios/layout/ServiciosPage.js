
import Nav from "../../../components-reutilizables/nav/Nav";
import Table from "../../../components-reutilizables/table/Table";
import useServicioDataService from "../DataServicio";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import Formulario from "../../../components-reutilizables/formulario/formulario";




const ServiciosPage = ({handleRedirect})=>{
    const { servicios,serviciosByID, fetchData,updateState,postHttp,fetchDataByID } = useServicioDataService();
    const [titlee, settitlee] = useState('');
    const [dataEdit,setDataEdit]=useState({});




    const handleState= async (id) => {
        await updateState(id);
        Swal.fire({
            title: `Se edito el estado`,
            text: `Se edito estado correctamte del servicio con id ${id} en la base de datos :D`,
            icon: "success"
        });
    }



    const nameColumnsDisplay =["ID Servicio","Nombre Servicio","Valor Servicio","Estado Servicio"];
    const nameColumnsKeys = ["idServicio","nombreServicio","valorServicio","estadoServicio"];

    const abrirForm=(title)=>{
        setDataEdit({
            idSer:null,
            nombreSer : "",
            precioSer:"",
            estadoSer:"",
            compañiaSer:"",
        });
        settitlee(title);

    }
    const handlePost= async (data)=>{
        await postHttp(data);
        settitlee('');
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamte el servicio en la base de datos :D",
            icon: "success"
        });


        handleRedirect("servicios");
    }
    const handleFetchDataByID = async (id) => {

        const dataS = await fetchDataByID(id);
        await setDataEdit({
            idSer: dataS.idServicio,
            nombreSer: dataS.nombreServicio,
            precioSer: dataS.valorServicio,
            estadoSer: dataS.estadoServicio ? "1" : "0",
            compañiaSer: dataS.detalleServicios,
        });

        settitlee("Registrar Servicio")
    }








    return<div>
        <Table title={"Servicios"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={servicios} handleState={handleState}  handleFetchDataByID={handleFetchDataByID} abrirForm={abrirForm} titleForm={"Registrar Servicio"}/>

        {titlee === "Registrar Servicio" ? (
            <>
                <Formulario title={titlee} setTitle={settitlee} handlePost={handlePost} valuesDataR={dataEdit}/>
            </>
        ): null}

    </div>



};

export default ServiciosPage;




