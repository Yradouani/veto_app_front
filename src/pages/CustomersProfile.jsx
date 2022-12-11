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
        <div>
            <img src="Untitled(1).png" alt="" className='background' />
            <Navbar />
            <h1>
                Profile du client : {userInfos?.firstname} {userInfos?.lastname}
            </h1>
            <div>

            </div>
        </div>
    );
};

export default CustomersProfile;