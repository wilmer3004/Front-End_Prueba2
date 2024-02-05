import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import "./MostrarDocumentos.css";
import {changeDocument} from "../../../redux/documetoSlice";
import {verifyToken} from "../../../api/TokenDecode";
import AuthData from "../../../api/Auth";
import Animacion from "../../components-reutilizables/animacionCarga/animation";

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

  // Seguridad
  let rol;
  if (authToken) {
    const decodedToken = verifyToken(authToken);
    if (decodedToken && decodedToken.roles) {
      rol = decodedToken.roles[0];
    }
  }

  const { responseState } = AuthData();


  const checkRoleAndToken = () => {
    if(rol !=="Super Administrador" && rol !=="Administrador"){
      Cookies.remove('authToken');
      window.location.href = '/'
    }
    if (!Cookies.get('authToken')) {
      window.location.href = '/'
      Cookies.remove('authToken');
    }
    if (responseState.status === 403) {
      Cookies.remove('authToken');
      window.location.href = '/'
    }
  };

  useEffect(() => {
    checkRoleAndToken();
    const intervalId = setInterval(checkRoleAndToken, 1000);
    return () => clearInterval(intervalId);
  }, []);


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
      return <div className={"data-notfound-messaje"}>
      <h1>
        Cargando documentos...
      </h1>
      <Animacion />
    </div>;// Muestra este mensaje mientras los documentos se están cargando
  }

  const handleChangeDocumento=(dataDocumento)=>{
    dispatch(changeDocument(dataDocumento))
  };


  return (
      <div className={"showfiles"}>
        <div className={"files"}>
          <h1>Id de compañía: {idCompania}</h1>
          {console.log(documentos)}
          {documentos.length>=1?(
            <>
            {documentos.map((documentoA, index) => (
                <div key={index}>
                  <button onClick={()=>{
                    handleChangeDocumento(documentoA.archivoDocumentoBase64);
                  }}>
                    <h1>Archivo {index+1}</h1>
                  </button>
                </div>
            ))}
            </>
          ):(
            <h1 className="error">No hay documento registrados para esta compañia</h1>
          )}
        </div>
          <div className={"file"}>
            { documento.documento !== '' ? (
                         <iframe src={`data:application/pdf;base64,${documento.documento}`}/>
                        ) : null
            }

          </div>

      </div>
  );
};

export default MostrarDocumentos;