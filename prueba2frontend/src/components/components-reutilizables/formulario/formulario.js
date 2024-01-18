// Formulario.js

import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import "./Formulario.css"
import Swal from "sweetalert2"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useDataService from "../../super-administrador/User/DataUSerService";
import useDataServiceTipoDoc from '../../super-administrador/tipoDocumento/DataTipoDocService';
import useDataServiceTipoRol from '../../super-administrador/rol/DataRolService';
import useDataServiceTarea from '../../super-administrador/tarea/DataTareaService';
import useDataServiceCompania from '../../super-administrador/compañia/DataCompService';
import {verifyToken} from "../../../api/TokenDecode";
import AuthData from "../../../api/Auth";
import useDataServiceCliente from '../../super-administrador/cliente/DataClientService';
import useDataServiceCiudad from '../../super-administrador/ciudad/DataCiudadService';
import useServicioDataService from '../../super-administrador/servicios/DataServicio';

// -------------------------------------------------------------------------------------------------------
// Esquemas o estructura de datos por formulario

// Esquema Usuario
const schemaUsers= yup.object().shape({
    pNombre: yup.string().min(2, 'El primer nombre debe tener al menos 2 caracteres').required('Este campo es requerido'),
    pApellido: yup.string().min(4, 'El primer apellido debe tener al menos 4 caracteres').required('Este campo es requerido'),
    numDoc: yup.string().min(7,'El numero de documento debe de tener al menos 7 digitos').required('Este campo es requerido'),
    telefono: yup.string().min(7,'El numero de telefono debe de tener al menos 7 digitos').required('Este campo es requerido'),
    username: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Debe ser un correo electrónico válido').required('El correo electrónico es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
    segundoNombre:yup.string(),
    segundoApellido:yup.string(),
    rol:yup.number(),
    estadoUsuario:yup.number(),
    tipoDocumento:yup.number()
});

const schemaDocument= yup.object().shape({
    document: yup.mixed(),
    estadoDocumento: yup.number(),
    numCompaniaDoc: yup.number(),
});

const schemaAccion= yup.object().shape({
    nombreAccion: yup.string().min(2, 'El primer nombre debe tener al menos 2 caracteres').required('Este campo es requerido'),
    estadoAccion: yup.number(),
    numCompaniaDoc: yup.number(),
});

const schemaCliente= yup.object().shape({
    pNombreCli: yup.string().min(2, 'El primer nombre debe tener al menos 2 caracteres').required('Este campo es requerido'),
    sNombreCli: yup.string(),
    pApellidoCli: yup.string().min(4, 'El primer apellido debe tener al menos 4 caracteres').required('Este campo es requerido'),
    sApellidoCli: yup.string(),
    TipoDocCli: yup.number(),
    estadoCli: yup.number(),
    ciudadCli: yup.number(),
    numDocCli: yup.string().min(7,'El numero de documento debe de tener al menos 7 digitos').required('Este campo es requerido'),
    telefonoCli: yup.string().min(7,'El numero de telefono debe de tener al menos 7 digitos').required('Este campo es requerido'),
    usernameCli: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Debe ser un correo electrónico válido').required('El correo electrónico es requerido'),
});

const schemaDetalleSer= yup.object().shape({
    fechaIniDetalleSer: yup.date(),
    fechaFinDetalleSer: yup.date(),
    estadoPagoDetSer: yup.number(),
    clienteDetSer: yup.number(),
    servicioDetSer: yup.number(),
    estadoDetSer: yup.number(),
});

const schemaDetalleTar= yup.object().shape({
    fechaAsigDetTa: yup.date(),
    fechaFinDetTa: yup.date(),
    estadoDetTar: yup.number(),
    empleadoDetTarea: yup.number(),
    tareaDetTar: yup.number(),
});

const schemaCompañia= yup.object().shape({
    nombreComp: yup.string().min(2, 'El nombre de la compañia debe tener al menos 2 caracteres').required('Este campo es requerido'),
    NIT: yup.string().min(9,'El NIT debe de ser al menos de 9 caracteres').required('El NIT es requerido'),
    nombreRepre: yup.string().min(14, 'El nombre completo debe tener al menos 14 caracteres').required('Este campo es requerido'),
    estadoComp: yup.number(),
});

const schemaProcCli= yup.object().shape({
    descripPro:yup.string().min(20, 'La descripcion debe tener al menos 20 caracteres').required('Este campo es requerido'),
    clienteProcCli: yup.number(),
    fechaProCli: yup.date(),
    estadoProcCli: yup.number(),
    empleadoProcCli: yup.number(),
});

const schemaProcComp= yup.object().shape({
    codVer: yup.string().min(6,'El codigo de verificacion debe de ser al menos de 6 caracteres').required('El codigo de verificacion es requerido'),
    fechaPC: yup.date(),
    compañiaProcComp: yup.number(),
    administradorProcComp: yup.number(),
    estadoProcComp: yup.number()

});


const schemaServicio = yup.object().shape({
    nombreSer: yup.string().min(2,'El nombre del servicio debe ser al menos de 2 caracteres').required('Este campo es requerido'),
    precioSer: yup.string().required('Este campo es requerido'),
    compañiaSer: yup.number(),
    estadoSer: yup.number()
});



const Formulario = ({ title,setTitle, handlePost  }) => {

    const { responseState } = AuthData();


    // ----------------------------------------------------------
    // MAEJO DE ROLES Y AUTENTIFICACION
    React.useEffect(() => {
        const authToken = Cookies.get('authToken');
        let rol = verifyToken(authToken).roles[0]
        if(rol !=="Super Administrador"){
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

    }, []);


    const [schema ,setSchema]=useState();

    // -----------------------------------------------------------------------
    // hooks

    
    const { data} = useDataService();
    const { tipoDoc } = useDataServiceTipoDoc();
    const { tipoRol } = useDataServiceTipoRol();
    const { tareas } = useDataServiceTarea();
    const { compañia } = useDataServiceCompania();
    const { clientes } = useDataServiceCliente();
    const { ciudad } = useDataServiceCiudad();
    const { servicios } = useServicioDataService();

    const [showForm, setShowForm] = useState(true);

    const [selectedCompaniaIds, setSelectedCompaniaIds] = useState([]); // Nuevo estado para almacenar IDs de compañías seleccionadas

    // Validacion y funcionamiento onsubmit
    const { register, handleSubmit, formState:{ errors }, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit' // Esto asegura que la validación se realice solo cuando se envíe el formulario
    });


    // ----------------------------------------------------------------------
    // Funcion para




    const onSubmit = async(data)=>{
        console.log(data);
        try{
            handlePost(data)
        } catch(error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    }

    // Manejar cambios en la selección de compañías
    const handleCompaniaChange = (event) => {
        const selectedIds = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedCompaniaIds(selectedIds);
        console.log('IDs de compañías seleccionadas:', selectedIds);
    };



    // ----------------------------------------------------------------------
    // swetalert

    const cancelar= ()=>{
        setTitle("");
        Swal.fire({
            title: "Se cancelo la acción",
            text: "Se cerro el formulario de creacion",
            icon: "error"
        });
    }

    // ----------------------------------------------------------------------
    // Validacion para esquemas
    useEffect(() => {
        if (title === "Registrar Usuario") {
            setSchema(schemaUsers);
        } else if(title === "Registrar Documento"){
            setSchema(schemaDocument);
        } else if(title === "Registrar Accion"){
            setSchema(schemaAccion);
        } else if(title === "Registrar Cliente"){
            setSchema(schemaCliente);
        } else if(title === "Registrar DetalleServicio"){
            setSchema(schemaDetalleSer);
        } else if(title === "Registrar DetalleTarea"){
            setSchema(schemaDetalleTar);
        } else if(title === "Registrar Compañia"){
            setSchema(schemaCompañia);
        } else if(title === "Registrar Proceso Cliente"){
            setSchema(schemaProcCli);
        } else if(title === "Registrar Proceso Compañia"){
            setSchema(schemaProcComp);
        } else if(title === "Registrar Servicio"){
            setSchema(schemaServicio);
        } 
    }, [title]);



    return (
        showForm && (
        <div className="global">
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap')
                </style>
                <div className="contenedor">
                    <section className='contenido'>
                        <div className={"title"}>
                            <h1>{ title }</h1>
                        </div>

                        {title === "Registrar Usuario"? (
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <label className="1">
                                        Primer Nombre:
                                        <input type='text' {...register("pNombre")}/>
                                        {errors.pNombre &&
                                            <span className={"text-error-label"}>{errors.pNombre.message}</span>}

                                    </label>
                                    <label className="2">
                                        Segundo Nombre:
                                        <input type='text' {...register("segundoNombre")}/>

                                    </label>
                                    <label className="2">
                                        Primer Apellido:
                                        <input type='text' {...register("pApellido")}/>
                                        {errors.pApellido &&
                                            <span className={"text-error-label"}>{errors.pApellido.message}</span>}

                                    </label>
                                    <label className="2">
                                        Segundo Apellido:
                                        <input type='text' {...register("segundoApellido")}/>
                                    </label>
                                    <label className="2">
                                        Numero de documento:
                                        <input type='text' {...register('numDoc')}/>
                                        {errors.numDoc &&
                                            <span className={"text-error-label"}>{errors.numDoc.message}</span>}

                                    </label>
                                    <label className="2">
                                        Tipo de documento:
                                        <select {...register('tipoDocumento')}>
                                            {tipoDoc.map(doc => (
                                                doc.estadoTipoDoc === true ? (
                                                    <option value={doc.idTipoDoc}>{doc.nombreTipoDoc}</option>
                                                ) : null
                                            ))}
                                        </select>
                                    </label>
                                    <label className="2">
                                        Telefono:
                                        <input type='text' {...register("telefono")}/>
                                        {errors.telefono &&
                                            <span className={"text-error-label"}>{errors.telefono.message}</span>}
                                    </label>
                                    <label className="2">
                                        Estado:
                                        <select {...register("estadoUsuario")}>
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                    </label>
                                    <label className="2">
                                        Password:
                                        <input type='text' {...register("password")}/>
                                        {errors.password &&
                                            <span className={"text-error-label"}>{errors.password.message}</span>}
                                    </label>
                                    <label className="2">
                                        Username:
                                        <input type='text' {...register("username")}/>
                                        {errors.username &&
                                            <span className={"text-error-label"}>{errors.username.message}</span>}
                                    </label>
                                    <label className="2">
                                        Rol:
                                        <select {...register("rol")}>
                                            {tipoRol.map(rol => (
                                                rol.estadoRol === true ? (
                                                    <option value={rol.idRol}>{rol.nombreRol}</option>
                                                ) : null
                                            ))}
                                        </select>
                                    </label>
                                    <div className={"botones"}>
                                        <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                        <button type="submit" className="btn btn-registrar" >{title}</button>
                                    </div>
                                </form>
                            </>
                        ) : null}

                        {title === "Registrar Documento" ? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>
                                    Documento:
                                    <input type='file' className="document" {...register("document")}/>
                                </label>
                                <label className="2">
                                    Estado:
                                    <select {...register("estadoDocumento")}>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>
                                <label className="2">
                                    Compania:
                                    <select {...register("numCompaniaDoc")}>
                                        {compañia.map(compa=>(
                                            compa.estadoCompania === true ? (
                                            <option value={compa.idCompania}>{compa.nombreCompania}</option>
                                            ): null
                                        ))}
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ): null}

                        {title === "Registrar Accion" ? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Nombre Accion:
                                    <input type='text' {...register("nombreAccion")}/>
                                {errors.nombreAccion && <span className={"text-error-label"}>{errors.nombreAccion.message}</span>}

                                </label>
                                <label className="2">
                                    Estado:
                                    <select {...register("estadoAccion")}>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ): null}

                        {title === "Registrar Cliente"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Primer Nombre:
                                <input type='text'{...register("pNombreCli")} />
                                {errors.pNombreCli && <span className={"text-error-label"}>{errors.pNombreCli.message}</span>}

                                </label>
                                <label className="2">
                                    Segundo Nombre:
                                <input type='text' {...register("sNombreCli")}/>
                                </label>
                                <label className="2">
                                    Primer Apellido:
                                <input type='text' {...register("pApellidoCli")}/>
                                {errors.pApellidoCli && <span className={"text-error-label"}>{errors.pApellidoCli.message}</span>}

                                </label>
                                <label className="2">
                                    Segundo Apellido:
                                <input type='text' {...register("sApellidoCli")}/>
                                </label>
                                <label className="2">
                                    Numero de documento:
                                <input type='text' {...register("numDocCli")}/>
                                {errors.numDocCli && <span className={"text-error-label"}>{errors.numDocCli.message}</span>}

                                </label>
                                <label className="2">
                                    Tipo de documento:
                                    <select {...register("TipoDocCli")}>
                                        {tipoDoc.map(doc=>(
                                            doc.estadoTipoDoc === true ? (
                                            <option value={doc.idTipoDoc}>{doc.nombreTipoDoc}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Telefono:
                                <input type='text' {...register("telefonoCli")}/>
                                {errors.telefonoCli && <span className={"text-error-label"}>{errors.telefonoCli.message}</span>}

                                </label>
                                <label className="2">
                                    Estado:
                                    <select {...register("estadoCli")}>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>
                                <label className="2">
                                    Correo:
                                <input type='text' {...register("usernameCli")}/>
                                {errors.usernameCli && <span className={"text-error-label"}>{errors.usernameCli.message}</span>}

                                </label>
                                <label className="2">
                                    Ciudad:
                                    <select {...register("ciudadCli")}>
                                        {ciudad.map(ciudad => (
                                            ciudad.estadoCiudad === true ? (
                                                <option value={ciudad.idCiudad}>{ciudad.nombreCiudad}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}

                        {title === "Registrar DetalleServicio"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Fecha Inicio Servicio:
                                    <input type='date' placeholder='Fecha en la que contrato el servicio' {...register("fechaIniDetalleSer")}/>
                                </label>
                                <label className="2">
                                    Fecha Fin Servicio:
                                <input type='date' {...register("fechaFinDetalleSer")}/>
                                </label>
                                <label className="2">
                                    Estado Pago:
                                    <select {...register("estadoPagoDetSer")}>
                                        <option value="1">Pendiente</option>
                                        <option value="0">Pagado</option>
                                    </select>
                                </label>
                                <label className="2">
                                    Cliente:
                                    <select {...register("clienteDetSer")}>
                                        {clientes.map(cliente=>(
                                            cliente.estadoCliente === true ? (
                                            <option value={cliente.idCliente}>{cliente.pnombreCliente} {cliente.papellidoCliente} -- {cliente.numIdentCliente}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Servicio:
                                    <select {...register("servicioDetSer")}>
                                        {servicios.map(servicio=>(
                                            servicio.estadoServicio === true ? (
                                            <option value={servicio.idServicio}>{servicio.nombreServicio} -- {servicio.valorServicio}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado:
                                    <select {...register("estadoDetSer")}>
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}

                        {title === "Registrar DetalleTarea"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Fecha Asignacion Tarea:
                                    <input type='date' placeholder='Fecha en la se le asigno la tarea al empleado' {...register("fechaAsigDetTa")}/>
                                </label>
                                <label className="2">
                                    Fecha Fin Tarea:
                                <input type='date' {...register("fechaFinDetTa")}/>
                                </label>
                                <label className="2">
                                    Estado Tarea:
                                    <select {...register("estadoDetTar")}>
                                        <option value="1">Pendiente</option>
                                        <option value="0">Finalizada</option>
                                    </select>
                                </label>
                                <label className="2">
                                     Empleado:
                                    <select {...register("empleadoDetTarea")}>
                                        {data.map(user=>(
                                            user.estadoUsu === true && user.id_rolfk.nombreRol==='Empleado' ? (
                                            <option value={user.idUsuario}>{user.primerNombre} {user.primerApellido} -- {user.numDocUsu}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>           
                                <label className="2">
                                    Tarea:
                                    <select {...register("tareaDetTar")}>
                                        {tareas.map(tarea=>(
                                            tarea.estadoTarea === true ? (
                                            <option value={tarea.idTarea}>{tarea.nombreTarea}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}

                        {title === "Registrar Compañia"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Nombre de la compañia:
                                <input type='text' placeholder='Escribe el nombre de la compañia' {...register("nombreComp")}/>
                                {errors.nombreComp && <span className={"text-error-label"}>{errors.nombreComp.message}</span>}

                                </label>
                                <label className="2">
                                    NIT de la compañia:
                            <input type='number' placeholder='Digita el nit de la compañia' {...register("NIT")}/>
                                {errors.NIT && <span className={"text-error-label"}>{errors.NIT.message}</span>}

                                </label>
                                <label className="1">
                                    Representante legar:
                                <input type='text' placeholder='Escribe el nombre completo del representante legal de la empresa' {...register("nombreRepre")}/>
                                {errors.nombreRepre && <span className={"text-error-label"}>{errors.nombreRepre.message}</span>}

                                </label>
                                <label className="2">
                                    Estado Compañia:
                                    <select {...register("estadoComp")}>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}

                        {title === "Registrar Proceso Cliente"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Descripcion del proceso:
                                <input type='text' placeholder='Escribe una breve descripcion del proceso' {...register("descripPro")}/>
                                {errors.descripPro && <span className={"text-error-label"}>{errors.descripPro.message}</span>}

                                </label>
                                <label className="2">
                                    Fecha del proceso:
                                <input type='date' {...register("fechaProCli")}/>
                                </label>
                                <label className="2">
                                    Cliente:
                                    <select {...register("clienteProcCli")}>
                                        {clientes.map(cliente=>(
                                            cliente.estadoCliente === true ? (
                                            <option value={cliente.idCliente}>{cliente.pnombreCliente} {cliente.papellidoCliente} -- {cliente.numIdentCliente}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Empleado:
                                    <select {...register("empleadoProcCli")}>
                                        {data.map(user=>(
                                            user.estadoUsu === true && user.id_rolfk.nombreRol==='Empleado' ? (
                                            <option value={user.idUsuario}>{user.primerNombre} {user.primerApellido} -- {user.numDocUsu}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado Proceso:
                                    <select {...register("estadoProcCli")}>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}

                        {title === "Registrar Proceso Compañia"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Codigo de Aprobacion:
                                    <input type='number' placeholder='Digita el codigo el cual se enviara' {...register("codVer")}/>
                                    {errors.codVer && <span className={"text-error-label"}>{errors.codVer.message}</span>}
                                </label>
                                <label className="2">
                                    Fecha de envio del codigo:
                                <input type='date' {...register("fechaPC")}/>
                                {errors.fechaPC && <span className={"text-error-label"}>{errors.fechaPC.message}</span>}

                                </label>
                                <label className="2">
                                    Compañia:
                                    <select {...register("compañiaProcComp")}>
                                        {compañia.map(compa=>(
                                            compa.estadoCompania === true ? (
                                            <option value={compa.idCompania}>{compa.nombreCompania}</option>
                                            ): null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Administrador:
                                    <select {...register("administradorProcComp")}>
                                        {data.map(user=>(
                                            user.estadoUsu === true && user.id_rolfk.nombreRol!=='Empleado'  ? (
                                            <option value={user.idUsuario}>{user.primerNombre} {user.primerApellido} -- {user.numDocUsu}</option>
                                            ) : null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado Proceso:
                                    <select {...register("estadoProcComp")}>
                                        <option value="1">Enviado</option>
                                        <option value="0">Pendiente</option>
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}

            {/* pendiente */}
                        {title === "Registrar Servicio"? (
                            <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="1">
                                    Nombre del Servicio:
                                    <input type='text' placeholder='Escribe el nombre del servicio' {...register("nombreSer")}/>
                                    {errors.nombreSer && <span className={"text-error-label"}>{errors.nombreSer.message}</span>}

                                </label>
                                <label className="2">
                                    Valor del servicio:
                                <input type='double' {...register("precioSer")}/>
                                {errors.precioSer && <span className={"text-error-label"}>{errors.precioSer.message}</span>}

                                </label>
                                <label className="2">
                                    Compañia:
                                    <select  onChange={handleCompaniaChange} {...register("compañiaSer")}>
                                        {compañia.map(compa=>(
                                            compa.estadoCompania === true ? (
                                            <option value={compa.idCompania}>{compa.nombreCompania}</option>
                                            ): null
                                        ))}
                                    </select>
                                </label>
                                <label className="2">
                                    Estado Servicio:
                                    <select {...register("estadoSer")}>
                                        <option  value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>
                                <div className={"botones"}>
                                    <button className="btn btn-cancelar" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" className="btn btn-registrar" >{title}</button>
                                </div>
                            </form>
                            </>
                        ) : null}


                        

                    </section>
                </div>
        </div>)
    );
};

export default Formulario;