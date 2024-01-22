import React, {useEffect, useState} from "react";
import "./Table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const Table = ({ title,nameColumnsK,nameColumnsD, items, handleState,abrirForm,titleForm,handleEdit,handleFetchDataByID }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simula la espera de los datos
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Cambia este valor según cuánto tiempo tarda en cargarse tus datos
    }, []);

    if (isLoading) {
        return <div className={"data-notfound-messaje"}>
            <h1>
                Cargando datos...
            </h1>
        </div>;
    }

    if (!Array.isArray(items) || !items.length) {
        return <div className={"data-notfound-messaje"}>
            <h1>
                No hay datos de la tabla {title} disponibles para mostrar.
            </h1>
            <div className={"button-registrar-notfound"}>
                <button onClick={() => abrirForm(titleForm)}>{titleForm}</button>

            </div>

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
                <button onClick={() => abrirForm(titleForm)}>{titleForm}</button>

            </div>
            <table>
                <thead>
                <tr>
                    {nameColumnsD.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Estado</th>
                    <th>Editar</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        {nameColumnsK.map((key, idx) => (
                            <td key={idx}>{deepFind(item, key)}</td>
                        ))}
                        <td>
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
                                <FontAwesomeIcon icon={faEdit} className={"img-edit"} onClick={() => handleFetchDataByID(item[nameColumnsK[0]])}/>
                            </div>
                        </td>

                    </tr>

                ))}

                </tbody>
            </table>

        </div>
    );
}
export default Table;
