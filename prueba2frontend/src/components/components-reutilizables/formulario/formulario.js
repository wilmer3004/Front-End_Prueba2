// Formulario.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import "./Formulario.css"
import Swal from "sweetalert2"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


const schema = yup.object().shape({
    username: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Debe ser un correo electrónico válido')
        .required('El correo electrónico es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
    codigo: yup.string().min(6,'El codigo de verificacion debe de ser al menos de 6 caracteres').required('El codigo de verificacion es requerido')
});

const Formulario = ({ title }) => {

    const apiURLRol = '/api/rol';
    const apiURLTipoDoc = '/api/tipoDoc';
    const apiURLCompania = '/api/compania';
    const apiURLCiudad = '/api/ciudad';
    const apiURLCliente = '/api/cliente';
    const apiURLServicio = '/api/servicio';
    const apiURLUser = '/api/user';

    const [tipoDoc, setTipoDoc] = useState([]);
    const [tipoRol, setTipoRol] = useState([]);
    const [compañia, setCompañia] = useState([]);
    const [ciudad, setCiudad] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedCompaniaIds, setSelectedCompaniaIds] = useState([]); // Nuevo estado para almacenar IDs de compañías seleccionadas

    const { register, handleSubmit, formState:{ errors }, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit' // Esto asegura que la validación se realice solo cuando se envíe el formulario
    });

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async(data)=>{
        const isValid = await trigger();
        if(!isValid){
            return;
        }
    }

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
          const responseUsers = await axios.get(apiURLUser, { headers });
  
          if (responseRol.status !== 200 && responseTipoDoc.status !== 200 && responseCompañia !== 200 && responseCiudad !== 200 && responseClientes !== 200 && responseServicios !== 200 && responseUsers !== 200) {
            throw new Error(`Request failed with status: ${responseRol.status} ${responseTipoDoc.status} ${responseCompañia.status} ${responseCiudad.status} ${responseClientes.status} ${responseServicios.status} ${responseUsers.status}`);
          }
  

          setTipoDoc(responseTipoDoc.data);
          setTipoRol(responseRol.data);
          setCompañia(responseCompañia.data)
          setCiudad(responseCiudad.data)
          setClientes(responseClientes.data)
          setServicios(responseServicios.data)
          setUsers(responseUsers.data)
        } catch (error) {
          console.error('Request failed:', error.message);
          throw error;
        }
      };
  
      handleGetAll();
    }, []); // E

    // Manejar cambios en la selección de compañías
    const handleCompaniaChange = (event) => {
        const selectedIds = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedCompaniaIds(selectedIds);
        console.log('IDs de compañías seleccionadas:', selectedIds);
    };



    const cancelar= ()=>{
        document.querySelector(".global").style.display="none";
        Swal.fire({
            title: "Se cancelo la acción",
            text: "Se cerro el formulario de creacion",
            icon: "error"
          });
    }

    return (
        <div className="global">
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap')
                </style> 
                <div className="contenedor">        
                    <section className='contenido'>
                        <div className={"title"}>
                            <h1>{ title }</h1>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <option value="1">Inactivo</option>
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
                                <label>
                                    Documento:
                                    <input type='file' className="document" />
                                </label>
                                <label className="2">
                                    Estado: 
                                    <select>
                                        <option value="1">Activo</option>
                                        <option value="1">Inactivo</option>
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
                                        <option value="1">Inactivo</option>
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
                                        <option value="1">Inactivo</option>
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
                                        <option value="1">Inactivo</option>
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
                                    Estado detalle: 
                                    <select>
                                        <option value="1">Activo</option>
                                        <option value="1">Inactivo</option>
                                    </select>
                                </label>
                            </>
                        ) : null}

                        {title === "Registrar Compañia"? (
                            <>
                                <label className="1">
                                    Nombre de la compañia:
                                    <input type='text' placeholder='Escribe el nombre de la compañia'/>
                                </label>
                                <label className="2">
                                    NIT de la compañia: 
                                <input type='number' placeholder='Digita el nit de la compañia'/>
                                </label>
                                <label className="1">
                                    Representante legar:
                                    <input type='text' placeholder='Escribe el nombre del representante legal de la empresa'/>
                                </label>
                                <label className="2">
                                    Estado Compañia: 
                                    <select>
                                        <option value="1">Activo</option>
                                        <option value="1">Inactivo</option>
                                    </select>
                                </label>
                                
                            </>
                        ) : null}

                        {title === "Registrar Proceso Cliente"? (
                            <>
                                <label className="1">
                                    Descripcion del proceso:
                                    <input type='text' placeholder='Escribe una breve descripcion del proceso'/>
                                </label>
                                <label className="2">
                                    Fecha del proceso: 
                                <input type='date' />
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
                                    Empleado: 
                                    <select>
                                        {users.map(user=>(
                                            user.estadoUsu === true && user.id_rolfk.nombreRol==='Empleado' ? (
                                            <option value={user.idUsuario}>{user.primerNombre} {user.primerApellido} -- {user.numDocUsu}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado Proceso: 
                                    <select>
                                        <option value="1">Activo</option>
                                        <option value="1">Inactivo</option>
                                    </select>
                                </label>
                                
                            </>
                        ) : null}

                        {title === "Registrar Proceso Compañia"? (
                            <>
                                <label className="1">
                                    Codigo de Aprobacion:
                                    <input type='number' placeholder='Digita el codigo el cual se enviara' {...register("codigo")}/>
                                    {errors.codigo && <span className={"text-error-label"}>{errors.codigo.message}</span>}
                                </label>
                                <label className="2">
                                    Fecha de envio del codigo: 
                                <input type='date' />
                                </label>
                                <label className="2">
                                    Compañia: 
                                    <select>
                                        {compañia.map(compa=>(
                                            compa.estadoCompania === true ? (
                                            <option value={compa.idCompania}>{compa.nombreCompania}</option>
                                            ): null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Administrador: 
                                    <select>
                                        {users.map(user=>(
                                            user.estadoUsu === true && user.id_rolfk.nombreRol!=='Empleado'  ? (
                                            <option value={user.idUsuario}>{user.primerNombre} {user.primerApellido} -- {user.numDocUsu}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado Proceso: 
                                    <select>
                                        <option value="1">Enviado</option>
                                        <option value="1">Pendiente</option>
                                    </select>
                                </label>
                                
                            </>
                        ) : null}

            {/* pendiente */}
                        {title === "Registrar Servicio"? (
                            <>
                                <label className="1">
                                    Nombre del Servicio:
                                    <input type='text' placeholder='Escribe el nombre del servicio'/>
                                </label>
                                <label className="2">
                                    Valor del servicio: 
                                <input type='double' />
                                </label>
                                <label className="2">
                                    Compañia: 
                                    <select  onChange={handleCompaniaChange}>
                                        {compañia.map(compa=>(
                                            compa.estadoCompania === true ? (
                                            <option value={compa.idCompania}>{compa.nombreCompania}</option>
                                            ): null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado Servicio: 
                                    <select>
                                        <option  value="1">Activo</option>
                                        <option value="1">Inactivo</option>
                                    </select>
                                </label>
                                
                            </>
                        ) : null}
                        
                        
                        <div className={"botones"}>
                            <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                            <button type="submit" className="btn btn-registrar" >{title}</button> 
                        </div>
                        </form>
                        
                    
                    </section>
                </div>   
        </div>
    );
};

export default Formulario;