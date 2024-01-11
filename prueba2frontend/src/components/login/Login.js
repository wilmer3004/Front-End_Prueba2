import React, { useState } from 'react';
import axios from "../../api/Api";

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
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
