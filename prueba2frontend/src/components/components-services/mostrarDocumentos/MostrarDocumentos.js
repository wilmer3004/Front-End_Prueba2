import React from "react";
import {useSelector} from "react-redux";

const MostrarDocumentos = ()=>{

  const documento = useSelector(state=>state.documento)

  return(
      <div>hola sapo {documento.numeroCompania}</div>
  )
};

export default MostrarDocumentos;



