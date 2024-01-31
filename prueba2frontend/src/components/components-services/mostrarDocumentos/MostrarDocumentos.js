import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const MostrarDocumentos = () => {
  const apiUrl = "api/documento/documentoByIDCompany";
  const authToken = Cookies.get('authToken');
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };

  const documento = useSelector(state => state.documento);
  const idCompania = parseInt(documento.numeroCompania);

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

  return (
      <div>
        <h1>Id de compañía: {idCompania}</h1>
        {documentos.map((documento, index) => (
            <div key={index}>
              <h1>{documento.idDocumento}</h1>
            </div>
        ))}
      </div>
  );
};

export default MostrarDocumentos;
