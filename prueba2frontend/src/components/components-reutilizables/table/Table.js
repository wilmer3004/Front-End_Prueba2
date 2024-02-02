import React, {useEffect, useState} from "react";
import "./Table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from "react-redux";
import {changeNumCompani} from "../../../redux/documetoSlice";
import Animacion from '../animacionCarga/animation'

const Table = ({ title,nameColumnsK,nameColumnsD, items, handleState,abrirForm,titleForm,handleRedirect,handleFetchDataByID }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [showStatusButton, setShowStatusButton] = useState(false);
    const [dataRedirect, setDataRedirect]=useState("default");

// redux
    const numeroCompania = useSelector((state)=>state.documento.numeroCompania);
    const dispatch = useDispatch();
    const handleChange = (numCompani)=>{
        dispatch(changeNumCompani(numCompani));
    };

    useEffect(() => {
        // Simula la espera de los datos
        setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Cambia este valor según cuánto tiempo tarda en cargarse tus datos
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        // Aquí puedes actualizar tus datos para mostrar solo los elementos entre startIndex y endIndex
    }, [currentPage, itemsPerPage]);
    useEffect(()=>{
        setShowStatusButton(title === "Compañias");
        setDataRedirect(title === "Compañias"?"mostrarDocumentos":"default");
    })

    if (isLoading) {
        return <div className={"data-notfound-messaje"}>
            <h1>
                Cargando datos...
            </h1>
            <Animacion />
        </div>;
    }

    if (!Array.isArray(items) || !items.length) {
        return <div className={"data-notfound-messaje"}>
            <h1>
                No hay datos de la tabla {title} disponibles para mostrar.
            </h1>
            {
                title === "Compañias"?(
                    <div className={"button-registrar-notfound"}>
                        <button onClick={() => abrirForm(titleForm)}>{titleForm}</button>
                    </div>

                ):(
                    <div className={"button-registrar-notfound"}>
                        <button onClick={() => abrirForm(titleForm)}>{titleForm}</button>
                    </div>
                )
            }
            

        </div>;
    }

    const deepFind = (obj, path) => {
        let parts = path.split('.');
        for (let i = 0; i < parts.length; i++) {
            obj = obj[parts[i]];
            if (parts[i].includes("estado") ) {
                return obj ? 'Activo' : 'Inactivo';
            }
            if (typeof obj === 'object' && obj !== null) {
                if (parts[i].includes('fk')||parts[i].includes('FK')||parts[i].includes('Fk')||parts[i].includes('fK')) {
                    const keys = Object.keys(obj);
                    const nameKey = keys.find(key => key.includes('nombre'));
                    return obj[nameKey];

                }


                return deepFind(obj, parts.slice(i + 1).join('.'));
            }
        }
        return obj;
    };






    return (
        <div className={"contenedor-tabla"}>
            <div className={"title-tabla"}>
                <h1>
                    {title}: {items.length}
                </h1>
            </div>

            <div className={"button-registrar"}>
                {
                    title === "Compañias"?(

                <button onClick={() => abrirForm(titleForm)}>{titleForm}</button>

                    ):(
                        <button onClick={() => abrirForm(titleForm)}>{titleForm}</button>
                    )
                }

            </div>
            <table>
                <thead>
                <tr>
                    {nameColumnsD.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th id={"button-td-state"}>Estado</th>
                    <th>Editar</th>
                    {showStatusButton?(
                        <th className={"th-mostrar-documentos"}>Mostrar Documentos</th>
                    ):null}
                </tr>
                </thead>
                <tbody>
                {items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                    <tr key={index}>
                        {nameColumnsK.map((key, idx) => (
                            <td key={idx} title={deepFind(item, key)}>{deepFind(item, key)}</td>
                        ))}
                        <td id={"button-td-state"}>
                            <button
                                onClick={() => handleState(item[nameColumnsK[0]])}
                                className={`button-state-table ${nameColumnsK.some(key => key.includes("estado") && item[key]) ? 'active' : 'inactive'}`}
                            >
                                {
                                    nameColumnsK.some(key => key.includes("estado") && item[key]) ? "Inactivar" : "Activar"
                                }

                            </button>
                        </td>
                        <td>
                            <div className={"edit-container"}>
                                <FontAwesomeIcon icon={faEdit} className={"img-edit"}
                                                 onClick={() => handleFetchDataByID(item[nameColumnsK[0]]
                                                 )}/>
                            </div>
                        </td>
                        {showStatusButton?(
                            <td>
                                <div className={"edit-container"}>

                                    <FontAwesomeIcon icon={faSearch} className={"img-edit"} onClick={()=> {
                                        handleChange(item[nameColumnsK[0]])
                                        handleRedirect(dataRedirect);
                                    }}/>

                                </div>
                            </td>
                        ):null}

                    </tr>

                ))}

                </tbody>
            </table>
            <div className={"contenedor-paginacion-table"}>
                <div className={"paginacion-table"}>
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior
                    </button>
                    <h3>
                        {currentPage}
                    </h3>
                    <button onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>Siguiente
                    </button>
                </div>
            </div>

        </div>
    );
}
export default Table;
