import React, { useState } from 'react';
import axios from "../../api/Api";
import Cookies from "js-cookie";
import "./Login.css";
import userRegular from "../../assets/img/user-regular.svg";

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
            <div className={"login-container"}>
                <div className={"logo-login"}>
                    <img src={userRegular} alt={"Logo Usuario"}/>
                    <h2>Login</h2>
                </div>

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


        </div>
    );
};

export default Login;
