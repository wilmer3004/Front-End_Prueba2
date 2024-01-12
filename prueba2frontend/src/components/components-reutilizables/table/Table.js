import React from "react";

const Table = ({ title,nameColumnsK,nameColumnsD, items }) => {
    if (!Array.isArray(items) || !items.length) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    const deepFind = (obj, path) => {
        let parts = path.split('.');
        for (let i = 0; i < parts.length; i++) {
            obj = obj[parts[i]];
            if (parts[i].includes("estado") ) {
                return obj[parts[i]] ? 'Inactivo' : 'Activo';
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
        <div>
            <h1>hola soy una tabla de {title}</h1>
            <p>Los items son:</p>
            <table>
                <thead>
                {nameColumnsD.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        {nameColumnsK.map((key, idx) => (
                            <td key={idx}>{deepFind(item, key)}</td>
                        ))}
                    </tr>
                ))}

                </tbody>
            </table>

        </div>
    );
}
export default Table;
