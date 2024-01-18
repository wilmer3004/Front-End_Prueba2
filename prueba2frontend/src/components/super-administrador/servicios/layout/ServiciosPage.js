
import Nav from "../../../components-reutilizables/nav/Nav";
import Table from "../../../components-reutilizables/table/Table";
import useServicioDataService from "../DataServicio";
import Swal from "sweetalert2";


const apiURL = "/api/servicio"


const ServiciosPage = ()=>{
    const { data, fetchData,updateState } = useServicioDataService();

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




    return<div>
        <Table title={"Servicios"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={data} handleState={handleState}/>
    </div>



};

export default ServiciosPage;




