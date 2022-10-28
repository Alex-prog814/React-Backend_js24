import React, { useState } from 'react';
import axios from 'axios';

export const authContext = React.createContext();

const API = 'https://backend-for-fs-makers.herokuapp.com/api/v1';

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRegister(formData, navigate){
        setLoading(true);
        
        try {
            const res = await axios.post(`${API}/account/register/`, formData);
            // console.log(res);
            navigate('/register-success');
        } catch (err) {
            // console.log('ERROR', err);
            // console.log('ERROR DATA', err.response.data);
            setError(Object.values(err.response.data).flat(2));
        } finally {
            setLoading(false);
        };
    };

    async function handleLogin(formData, email, navigate){
        setLoading(true);
        try {
            const res = await axios.post(`${API}/account/login/`, formData);
            localStorage.setItem("tokens", JSON.stringify(res.data));
            localStorage.setItem("email", email);
            setCurrentUser(email);
            navigate('/');
            console.log(res);
        }  catch (err) {
            console.log(err);
            setError([err.response.data.detail]);
        } finally {
            setLoading(false);
        };
    };
    
    function handleLogout(navigate){
        localStorage.removeItem("tokens");
        localStorage.removeItem("email");
        setCurrentUser(false);
        navigate("/");
    };

    return (
        <authContext.Provider value={{
            currentUser,
            error,
            loading,

            setError,
            handleRegister,
            handleLogin,
            handleLogout
        }}>
            { children }
        </authContext.Provider>
    );
};

export default AuthContextProvider;