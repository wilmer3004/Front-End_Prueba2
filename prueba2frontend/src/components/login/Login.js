import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "../../api/Api";
import Cookies from "js-cookie";
import "./Login.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {verifyToken} from '../../api/TokenDecode';
import { useNavigate } from 'react-router-dom';



const apiUrl = '/auth/login'

const schema = yup.object().shape({
    username: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Debe ser un correo electrónico válido')
        .required('El correo electrónico es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
});

const Login = () => {

    const navigate = useNavigate();


    React.useEffect(()=>{
            Cookies.remove('authToken')
    }
    )

    const { register, handleSubmit, formState:{ errors }, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit' // Esto asegura que la validación se realice solo cuando se envíe el formulario
    });

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        const isValid = await trigger();
        if (!isValid) {
            return;
        }

        try {
            const response = await axios.post(apiUrl, data);
            const token = response.data.token;

            Cookies.set('authToken', token);

            // Decodificar el token
            const decodedToken =  verifyToken(token);

            // Obtener el rol del token decodificado
            const role = decodedToken.roles[0];


            if (role === "Super Administrador"){
                navigate('/superadmin');
            }
            if(role === "Administrador"){
                navigate('/admin');
            }
            if(role === "Empleado"){
                navigate('/empleado');
            }

            setErrorMessage('');
        } catch (error) {
            if (error.message.includes("net::ERR_CONNECTION_REFUSED")) {
                setErrorMessage('Error de servidor');
            } else if (error.response && error.response.status === 403) {
                setErrorMessage('Error de credenciales');
            } else {
                setErrorMessage('Server failed');
            }
        }
    };

    return (
        <div className={"login-page"}>
            <div className={"login-container fadeIn"}>
                <div className={"logo-login"}>
                    <FontAwesomeIcon icon={faUser} className={"img-login "}/>
                    <h2>Login</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Correo electrónico:
                        <input type="text" {...register("username")} />
                        {errors.username && <span className={"text-error-label"}>{errors.username.message}</span>}
                    </label>

                    <label>
                        Contraseña:
                        <input type="password" {...register("password")} />
                        {errors.password && <span className={"text-error-label"}>{errors.password.message}</span>}
                    </label>

                    <button type="submit">Login</button>
                    {errorMessage && <p className={"text-error"}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
