import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/user/loginAuth';

const AuthData = () => {
    const [responseState, setResponseState] = useState({
        data: null,
        status: null,
        error: null,
        loading: true
    });

    const fetchData = async () => {
        const t0 = performance.now();
        try {
            const authToken = Cookies.get('authToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };

            const response = await axios.get(apiURL, { headers });
            const t1 = performance.now();
            setResponseState({
                data: response.data,
                status: response.status,
                error: null,
                loading: false
            });
        } catch (error) {
            let errorData = error.message;
            if (errorData.includes("403")) {
                setResponseState({
                    data: null,
                    status: 403,
                    error: error.message,
                    loading: false
                });
                Cookies.remove('authToken');
                window.location.href = '/'

            } else {
                setResponseState({
                    data: null,
                    status: error.response ? error.response.status : null,
                    error: error.message,
                    loading: false
                });
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {responseState};
};

export default AuthData;
