import React, { useState } from 'react';
import axios from "../../api/Api";
import Cookies from "js-cookie";
import "./Login.css";
import login from "../../assets/img/login.jpeg";

const apiUrl = '/auth/login'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const data = {
            "username": username,
            "password": password,
        }
        try {
            const response = await axios.post(apiUrl, data);
            const token = response.data.token;

            Cookies.set('authToken', token);


            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={"login-page"}>
            <div className={"container-information-login"}>
                <div className={"login-container"}>
                    <h2>Login</h2>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className={"img-login"}>
                    <img src={login} alt={"Imagen Login"}/>
                </div>

            </div>

        </div>
    );
};

export default Login;
