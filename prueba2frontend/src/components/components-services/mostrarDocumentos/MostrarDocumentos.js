import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import "./MostrarDocumentos.css";
import {changeDocument} from "../../../redux/documetoSlice";

const MostrarDocumentos = () => {
  const apiUrl = "api/documento/documentoByIDCompany";
  const authToken = Cookies.get('authToken');
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };

  const documento = useSelector(state => state.documento);
  const idCompania = parseInt(documento.numeroCompania);
  const dispatch = useDispatch();


  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  useEffect(() => {
    setLoading(true); // Inicia la carga
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${idCompania}`, { headers });
        setDocumentos(response.data);
      } catch (error) {
        console.error("Error al cargar los documentos:", error);
      } finally {
        setLoading(false); // Finaliza la carga independientemente del resultado
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return <div>Cargando documentos...</div>; // Muestra este mensaje mientras los documentos se están cargando
  }

  const handleChangeDocumento=(dataDocumento)=>{
    dispatch(changeDocument(dataDocumento))
  };


  return (
      <div className={"showfiles"}>
        <div className={"files"}>
          <h1>Id de compañía: {idCompania}</h1>
          {documentos.map((documentoA, index) => (
              <div key={index}>
                <button onClick={()=>{
                  handleChangeDocumento(documentoA.archivoDocumentoBase64);
                }}>
                  <h1>Archivo {index+1}</h1>
                </button>
              </div>
          ))}
        </div>
        <div className={"file"}>
          { documento.documento !== '' ? (
                       <iframe src={`data:application/pdf;base64,${documento.documento}`} width="100%" height="500px"/>
                      ) : null
          }

        </div>

      </div>
  );
};

export default MostrarDocumentos;