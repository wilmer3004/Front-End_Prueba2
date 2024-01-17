import React from "react";
import "./Table.css";

const Table = ({ title,nameColumnsK,nameColumnsD, items, handleState }) => {
    if (!Array.isArray(items) || !items.length) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    const deepFind = (obj, path) => {
        let parts = path.split('.');
        for (let i = 0; i < parts.length; i++) {
            obj = obj[parts[i]];
            if (parts[i].includes("estado") ) {
                return obj ? 'Inactivo' : 'Activo';
            }
            if (typeof obj === 'object' && obj !== null) {
                if (parts[i].includes('fk')) {
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
            <table>
                <thead>
                {nameColumnsD.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
                <th>Estado</th>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        {nameColumnsK.map((key, idx) => (
                            <td key={idx}>{deepFind(item, key)}</td>
                        ))}
                        <td>
                            <button onClick={()=>handleState(item[nameColumnsK[0]])}>
                                {
                                    nameColumnsK.some(key => key.includes("estado") && item[key])?"Activar":"Inactivar"
                                }
                            </button>
                        </td>
                    </tr>

                ))}

                </tbody>
            </table>

        </div>
    );
}
export default Table;
