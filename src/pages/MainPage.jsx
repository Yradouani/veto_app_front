import React from 'react';
import { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
// import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { useState } from 'react';

const MainPage = () => {
    // const { auth } = useContext(AuthContext);
    const [data, setData] = useState({});

    const USER_URL = '/user/veterinary/';
    const id = localStorage.getItem('userId');
    // const isClient = Number(localStorage.getItem('isClient'));
    const type = localStorage.getItem('type');
    console.log(id);

    useEffect(() => {
        if (type === "veterinary") {
            axios.get(USER_URL + id)
                .then(function (response) {
                    setData(response.data);
                })
                .catch(err => console.log(err))
        } else if (type === "client") {
            axios.get("/user/client/" + id)
                .then(function (response) {
                    const infos = response.data;
                    setData(infos);
                })
                .catch(err => console.log(err))
        }
    }, []);

    useEffect(() => {
        console.log(data[0]?.firstname);
    }, [data])

    console.log(data);

    return (
        <div className='main-page'>
            <img src="background.png" alt="" className='background' />
            <Navbar></Navbar>
            {data?.firstname ? (
                <div className='page_content'>
                    <h1>
                        Bienvenue {data.firstname}
                        <br />
                        dans votre espace {type === 'client' ? "client" : "vétérinaire"}
                    </h1>
                    <h2>Parcourez la première application de rappel vaccinal automatisé</h2>
                </div>

            ) : <div className='page_content'>
            <h1>
                Bienvenue {data[0]?.firstname}
                <br />
                dans votre espace {type === 'client' ? "client" : "vétérinaire"}
            </h1>
            <h2>Parcourez la première application de rappel vaccinal automatisé</h2>
        </div>}
        </div>
    );
};

export default MainPage;