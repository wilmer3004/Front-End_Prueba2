
import Nav from "../../../components-reutilizables/nav/Nav";
import Table from "../../../components-reutilizables/table/Table";
import useServicioDataService from "../DataServicio";


const apiURL = "/api/servicio"


const ServiciosPage = ()=>{
    const { data, fetchData } = useServicioDataService();




    const nameColumnsDisplay =["ID Servicio","Nombre Servicio","Estado Servicio"];
    const nameColumnsKeys = ["idServicio","nombreServicio","estadoServicio"];




    return<div>
        <Table title={"Servicios"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={data}/>
    </div>



};

export default ServiciosPage;




