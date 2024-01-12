// Formulario.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import "./Formulario.css"





const Formulario = ({ title }) => {

    const apiURLRol = '/api/rol';
    const apiURLTipoDoc = '/api/tipoDoc';
    const apiURLCompania = '/api/compania';
    const apiURLCiudad = '/api/ciudad';
    const apiURLCliente = '/api/cliente';
    const apiURLServicio = '/api/servicio';

    const [tipoDoc, setTipoDoc] = useState([]);
    const [tipoRol, setTipoRol] = useState([]);
    const [compañia, setCompañia] = useState([]);
    const [ciudad, setCiudad] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
      const handleGetAll = async () => {
        try {
          const authToken = Cookies.get('authToken');
          const headers = {
            'Authorization': `Bearer ${authToken}`
          };
  
          if (authToken) {
            headers.Authorization = `Bearer ${authToken}`;
          }
  
          const responseRol = await axios.get(apiURLRol, { headers });
          const responseTipoDoc = await axios.get(apiURLTipoDoc, { headers });
          const responseCompañia = await axios.get(apiURLCompania, { headers });
          const responseCiudad = await axios.get(apiURLCiudad, { headers });
          const responseClientes = await axios.get(apiURLCliente, { headers });
          const responseServicios = await axios.get(apiURLServicio, { headers });
  
          if (responseRol.status !== 200 && responseTipoDoc.status !== 200 && responseCompañia !== 200 && responseCiudad !== 200 && responseClientes !== 200 && responseServicios !== 200) {
            throw new Error(`Request failed with status: ${responseRol.status} ${responseTipoDoc.status} ${responseCompañia.status} ${responseCiudad.status} ${responseClientes.status} ${responseServicios.status}`);
          }
  
          setTipoDoc(responseTipoDoc.data);
          setTipoRol(responseRol.data);
          setCompañia(responseCompañia.data)
          setCiudad(responseCiudad.data)
          setClientes(responseClientes.data)
          setServicios(responseServicios.data)
        } catch (error) {
          console.error('Request failed:', error.message);
          throw error;
        }
      };
  
      handleGetAll();
    }, []); // E

    return (
        <nav>
            <div className={"title"}>
                <h1>{ title }</h1>
            </div>

            <form>
            {title === "Registrar Usuario"? (
                <>
                    <label className="1">
                        Primer Nombre:
                        <input type='text' />
                    </label>
                    <label className="2">
                        Segundo Nombre: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Primer Apellido: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Segundo Apellido: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Numero de documento: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Tipo de documento: 
                        <select>
                            {tipoDoc.map(doc=>(
                                doc.estadoTipoDoc === true ? (
                                <option value={doc.idTipoDoc}>{doc.nombreTipoDoc}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                    <label className="2">
                        Telefono: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Estado: 
                        <select>
                            <option value="1">Activo</option>
                            <option value="1">Inhactivo</option>
                        </select>
                    </label>
                    <label className="2">
                        Password: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Username: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Rol: 
                        <select>
                            {tipoRol.map(rol=>(
                                rol.estadoRol === true ? (
                                <option value={rol.idRol}>{rol.nombreRol}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                </>
            ) : null}

            {title === "Registrar Documento" ? (
                <>
                     <label className="1">
                        Documento:
                        <input type='file' />
                    </label>
                    <label className="2">
                        Estado: 
                        <select>
                            <option value="1">Activo</option>
                            <option value="1">Inhactivo</option>
                        </select>
                    </label>
                    <label className="2">
                        Compania: 
                        <select>
                            {compañia.map(compa=>(
                                compa.estadoCompania === true ? (
                                <option value={compa.idCompania}>{compa.nombreCompania}</option>
                                ): null
                            ))}
                        </select>
                    </label>
                </>
            ): null}

            {title === "Registrar Accion" ? (
                <>
                    <label className="1">
                        Nombre Accion:
                        <input type='text' />
                    </label>
                    <label className="2">
                        Estado: 
                        <select>
                            <option value="1">Activo</option>
                            <option value="1">Inhactivo</option>
                        </select>
                    </label>
                </>
            ): null} 

            {title === "Registrar Cliente"? (
                <>
                    <label className="1">
                        Primer Nombre:
                        <input type='text' />
                    </label>
                    <label className="2">
                        Segundo Nombre: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Primer Apellido: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Segundo Apellido: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Numero de documento: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Tipo de documento: 
                        <select>
                            {tipoDoc.map(doc=>(
                                doc.estadoTipoDoc === true ? (
                                <option value={doc.idTipoDoc}>{doc.nombreTipoDoc}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                    <label className="2">
                        Telefono: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Estado: 
                        <select>
                            <option value="1">Activo</option>
                            <option value="1">Inhactivo</option>
                        </select>
                    </label>
                    <label className="2">
                        Correo: 
                    <input type='text' />
                    </label>
                    <label className="2">
                        Ciudad: 
                        <select>
                            {ciudad.map(ciudad => (
                                ciudad.estadoCiudad === true ? (
                                    <option key={ciudad.idCiudad} value={ciudad.idCiudad}>{ciudad.nombreCiudad}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                </>
            ) : null}

            {title === "Registrar DetalleServicio"? (
                <>
                    <label className="1">
                        Fecha Inicio Servicio:
                        <input type='date' placeholder='Fecha en la que contrato el servicio'/>
                    </label>
                    <label className="2">
                        Fecha Fin Servicio: 
                    <input type='date' />
                    </label>
                    <label className="2">
                        Estado Pago: 
                        <select>
                            <option value="1">Pendiente</option>
                            <option value="1">Pagado</option>
                        </select>
                    </label>
                    <label className="2">
                        Cliente: 
                        <select>
                            {clientes.map(cliente=>(
                                cliente.estadoCliente === true ? (
                                <option value={cliente.idCliente}>{cliente.pnombreCliente} {cliente.papellidoCliente} -- {cliente.numIdentCliente}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                    <label className="2">
                        Servicio: 
                        <select>
                            {servicios.map(servicio=>(
                                servicio.estadoServicio === true ? (
                                <option value={servicio.idServicio}>{servicio.nombreServicio} -- {servicio.valorServicio}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                    <label className="2">
                        Estado: 
                        <select>
                            <option value="1">Activo</option>
                            <option value="1">Inhactivo</option>
                        </select>
                    </label>
                </>
            ) : null}

            {title === "Registrar DetalleTarea"? (
                <>
                    <label className="1">
                        Fecha Asignacion Tarea:
                        <input type='date' placeholder='Fecha en la se le asigno la tarea al empleado'/>
                    </label>
                    <label className="2">
                        Fecha Fin Servicio: 
                    <input type='date' />
                    </label>
                    <label className="2">
                        Estado Pago: 
                        <select>
                            <option value="1">Pendiente</option>
                            <option value="1">Pagado</option>
                        </select>
                    </label>
                    <label className="2">
                        Cliente: 
                        <select>
                            {clientes.map(cliente=>(
                                cliente.estadoCliente === true ? (
                                <option value={cliente.idCliente}>{cliente.pnombreCliente} {cliente.papellidoCliente} -- {cliente.numIdentCliente}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                    <label className="2">
                        Servicio: 
                        <select>
                            {servicios.map(servicio=>(
                                servicio.estadoServicio === true ? (
                                <option value={servicio.idServicio}>{servicio.nombreServicio} -- {servicio.valorServicio}</option>
                                ) : null
                            ))}
                        </select>
                    </label>
                    <label className="2">
                        Estado: 
                        <select>
                            <option value="1">Activo</option>
                            <option value="1">Inhactivo</option>
                        </select>
                    </label>
                </>
            ) : null}
            </form>



            <div className={"botones"}>
                <button className="btn btn-registrar" >Registrar</button> 
                <button className="btn btn-cancelar">Cancelar</button>
            </div>
        </nav>
    );
};

export default Formulario;