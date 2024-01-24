import React, {useState} from "react";
import useDataServiceDocument from "../documento/DataDocumenService";

const CargaDeDocumentos = (idCompania)=>{

    const {documento,postHttp}=useDataServiceDocument();

    const [estadoDocumento, setEstadoDocumento] = useState(true);
    const [archivoDocumento, setArchivoDocumento] = useState(null);
    const [idCompaniaFK, setIdCompaniaFK] = useState(1);
    const [dataBaseEncode, setDataBaseEncode] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files) {
            setArchivoDocumento(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const response = await postHttp(archivoDocumento,idCompaniaFK);
        console.log(response);
        setDataBaseEncode(response.data.archivoDocumento);
    };

    return(
        <div className={"contenedor-cargadocumentos"}>
                <input type={"file"} name={"file"} onChange={handleFileChange}/>
                <button type="submit" onClick={()=>handleSubmit()}>Cargar</button>
            {dataBaseEncode? (
                <iframe src={`data:application/pdf;base64,${dataBaseEncode}`} width="100%" height="500px"/>
            ):null}

        </div>
    );

};

export default CargaDeDocumentos;





