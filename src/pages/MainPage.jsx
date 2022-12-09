import React from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const Products = () => {

    const USER_URL = '';

    // useEffect(() => {
    //     try {
    //         const response = axios.get(
    //             USER_URL,
    //             JSON.stringify({ email, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 // withCredentials: true
    //             }
    //         );
    //         console.log(JSON.stringify(response?.data));
    //         const accessToken = response?.data?.token;
    //         const roles = response?.data?.roles;


    //     } catch (err) {
    //         // console.log(err);
    //         // if (!err?.response) {
    //         //     setErrMsg('Pas de réponse du serveur');
    //         // } else if (err.response?.status === 400) {
    //         //     setErrMsg("Veuillez entrer votre email ET votre mot de passe");
    //         // } else if (err.response?.status === 401) {
    //         //     setErrMsg("Email et/ou mot de passe incorrect");
    //         // } else {
    //         //     setErrMsg('Connexion échouée')
    //         // }
    //         // errRef.current.focus();
    //     }
    // }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div className='page_content'>
                <h1>Bienvenue </h1>

            </div>
        </div>
    );
};

export default Products;