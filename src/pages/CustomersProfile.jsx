import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomersProfile = () => {
    const { id } = useParams();
    const GET_CLIENT = '/user/client/';
    const [userInfos, setUserInfos] = useState({});

    // var mySQLdate = userInfos?.created_at;
    // const created_date = new Date(Date.parse(mySQLdate.replace(/-/g, '/')));

    useEffect(() => {
        getDataClient();
    }, [])

    const getDataClient = () => {

        axios.get(GET_CLIENT + id)
            .then(function (response) {
                console.log(response.data);
                setUserInfos(response.data)
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <div className='customer-profile'>
            <img src="../../Untitled(1).png" alt="" className='background' />
            <Navbar />
            <div className='card_container'>
                <h1>
                    Profile du client : {userInfos?.firstname} {userInfos?.lastname}
                </h1>
                <div className='infos_container'>
                    <div><span>Date de création de la fiche :  </span></div>
                    <div><span>Adresse : </span>{userInfos?.address}</div>
                    <div><span>Numéro de téléphone : </span>{userInfos?.phone}</div>
                    <div><span>Adresse email : </span>{userInfos?.email}</div>
                    <div className='btn_container'>
                        <button>Modifier</button>
                        <button>Supprimer</button>
                    </div>
                </div>
                <hr />
                <div>
                    <h2>Ses animaux</h2>
                </div>
            </div>
        </div>
    );
};

export default CustomersProfile;