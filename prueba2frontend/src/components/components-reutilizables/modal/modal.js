import React, { useEffect, useState } from "react";
import Formulario from "../formulario/formulario";
import './modal.css';

const Modal = ({ title }) => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    // Limpia el array de clases antes de agregar nuevas clases
    setClases([]);

    // Agrega clases en función del título
    if (title === "Registrar Compania1") {
      setClases((prevClases) => [...prevClases, 'pel1']);
    } else if (title === "Registrar Compania2") {
      setClases((prevClases) => [...prevClases, 'pel2', 'pel1']);
    } else if (title === "Registrar Compania") {
      setClases((prevClases) => [...prevClases, 'pel3', 'pel2', 'pel1']);
    }
  }, [title]);

  console.log(clases);

  return (
    <div className="modal">
      <div className="pipelin">
        <div className={`pelotica1 ${clases.length===1 || clases.length===2 || clases.length===3? `${clases.join(" ")}`: ''} `}></div>
        <div className={`pelotica2 ${clases.length===2 || clases.length===3 ? `${clases.join(" ")}`: ''} `}></div>
        <div className={`pelotica3 ${clases.length===3 ? `${clases.join(" ")}`: ''} `}></div>
        <div className={`barra ${clases.length===2 || clases.length===3? `${clases.join(" ")}`: ''} `}></div>
        <div className={`barra2 ${clases.length===3  ? `${clases.join(" ")}`: ''} `}></div>
      </div>
      <Formulario title={title} />
    </div>
  );
}

export default Modal;
