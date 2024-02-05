import React, { useEffect, useState } from "react";
import Formulario from "../formulario/formulario";
import './modal.css';
import CargaDeDocumentos from "../../components-services/cargaDeDocumentos/CargaDeDocumentos";
import {changeModal, changeEstadoModal} from "../../../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import useDataServiceCompania from "../../components-services/compañia/DataCompService";
import Swal from "sweetalert2"



const Modal = ({ title, handlePost, handleRedirect }) => {
  const [clases, setClases] = useState([]);
  const [ titlee, setTitless] = useState(title)
  const [historia, setHistoria] = useState("");
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const {compania} = useDataServiceCompania();



  useEffect(() => {
    // Limpia el array de clases antes de agregar nuevas clases
    setClases([]);
    console.log(modal, historia);
    estado()

    if (modal.estadoModal==="Actualizar Compania existente"){
        setHistoria("Actualizar Compania existente")
    }
    
  }, [title,titlee,setTitless,setClases,handlePost]);
  
  const estado= () => {
    // Agrega clases en función del título
    if (modal.estadoModal === "Registrar Compania" || modal.estadoModal === "Actualizar Companiaa" || modal.estadoModal==="Actualizar Compania existente") {
      setClases((prevClases) => [...prevClases, 'pel1']);
    } else if (modal.estadoModal === "AsignarDocumentos") {
      setClases((prevClases) => [...prevClases, 'pel2', 'pel1']);
    } 
  }

  const volver= () =>{
    if (historia!==""){
      var dataEdit=compania[compania.length-1];
      const dataComp= {
        idCompania: dataEdit.idCompania,
        nombreComp: dataEdit.nombreCompania,
        nombreRepre: dataEdit.representanteLegalCompania,
        NIT: dataEdit.nitCompania,
        estadoComp: dataEdit.estadoCompania
      }
      dispatch(changeModal(dataComp))
    }
    dispatch(changeEstadoModal("Actualizar Companiaa"))
    }

  const cancelar =()=>{
    dispatch(changeEstadoModal(""))
    Swal.fire({
      title: "Se cancelo la acción",
      text: "Se cerro el formulario de creacion",
      icon: "error"
  });
  }

  
if(titlee===""){
  return null
} else {
    return (
      <div className="modal">
        <div className="pipelin">
          {modal.estadoModal==="AsignarDocumentos" ? (
            <button type="button" onClick={volver} className="atras">Volver</button>
          ): null}
          <div className={`pelotica1 ${clases.length===1 || clases.length===2 || clases.length===3? `${clases.join(" ")}`: ''} `}></div>
          <div className={`pelotica2 ${clases.length===2 || clases.length===3 ? `${clases.join(" ")}`: ''} `}></div>
        </div>
        {titlee==="Registrar Compania" ? (
          <Formulario title={titlee} handlePost={handlePost}/>
        ): null}
        {titlee==="AsignarDocumentos"? (
          <CargaDeDocumentos />
        ): null}
        {titlee==="Actualizar Companiaa" ? (
          <Formulario title={"Registrar Compania"} valuesDataR={modal} handlePost={handlePost}/>
        ): null}
        {titlee==="Actualizar Compania existente" ? (
          <Formulario title={"Registrar Compania"} valuesDataR={modal} handlePost={handlePost}/>
          
        ): null}
        <button onClick={cancelar} className="cancelar">Cancelar</button>
      </div>
    );
  }
}

export default Modal;
