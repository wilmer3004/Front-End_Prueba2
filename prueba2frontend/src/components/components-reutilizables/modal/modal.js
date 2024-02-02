import React, { useEffect, useState } from "react";
import Formulario from "../formulario/formulario";
import './modal.css';
import CargaDeDocumentos from "../../components-services/cargaDeDocumentos/CargaDeDocumentos";

const Modal = ({ title, handlePost }) => {
  const [clases, setClases] = useState([]);
  const [ titlee, setTitless] = useState(title)

  useEffect(() => {
    // Limpia el array de clases antes de agregar nuevas clases
    setClases([]);
    console.log(titlee);
    estado()
  }, [title,titlee,setTitless,setClases,handlePost]);
  
  const estado= () => {
    // Agrega clases en función del título
    if (titlee === "Registrar Compania") {
      setClases((prevClases) => [...prevClases, 'pel1']);
    } else if (titlee === "AsignarDocumentos") {
      setClases((prevClases) => [...prevClases, 'pel2', 'pel1']);
    } 
  }

  const volver= () =>{
    setTitless("Registrar Compania");
    console.log(titlee)
  }

  const cancelar =()=>{
    setTitless("");
  }

  
if(titlee===""){
  return null
} else {
    return (
      <div className="modal">
        <div className="pipelin">
          {titlee!=="Registrar Compania"? (
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
        <button onClick={cancelar} className="cancelar">Cancelar</button>
      </div>
    );
  }
}

export default Modal;
