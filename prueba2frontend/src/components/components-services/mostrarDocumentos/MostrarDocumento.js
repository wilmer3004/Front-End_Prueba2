import React from "react";
import useDataServiceDocument from "../documento/DataDocumenService";

const MostrarDocumento = ({idCompania})=>{

    const{documento}=useDataServiceDocument()


console.log(documento)

    return(
        <div>
            Hello, I am the component to display the document.
            {idCompania}
        </div>
    )

}

export default MostrarDocumento;









