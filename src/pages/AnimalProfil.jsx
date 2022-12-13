import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import { AiOutlineArrowLeft } from "react-icons/ai";

const AnimalProfil = () => {
    const { id } = useParams();
    const [animalInfos, setAnimalInfos] = useState([]);
    const [proprioInfos, setProprioInfos] = useState([]);
    const GET_ANIMAL = '/animal/';
    const [clientId, setClientId] = useState();

    useEffect(() => {
        getDataAnimal();
    }, []);

    useEffect(() => {
        if (clientId) {
            console.log(clientId);
            axios.get("/user/client/" + clientId)
                .then(function (response) {
                    console.log(response.data);
                    setProprioInfos(response.data)
                }
                )
                .catch(err => console.log(err))
        }
    }, [clientId])

    const getDataAnimal = () => {

        axios.get(GET_ANIMAL + id)
            .then(function (response) {
                console.log(response.data);
                setAnimalInfos(response.data);
                setClientId(response.data.client_id);
                console.log(clientId);
            }
            )
            .catch(err => console.log(err))
    }

    const getProprioAnimal = (id_client) => {
        // if (id_client) {
        //     console.log(id_client);
        //     axios.get("/user/client/" + id_client)
        //         .then(function (response) {
        //             console.log(response.data);
        //             setProprioInfos(response.data)
        //         }
        //         )
        //         .catch(err => console.log(err))
        // }
    }

    return (
        <div className='animal_profil'>
            <img src="../../Untitled(1).png" alt="" className='background' />
            <Navbar />
            <h1>Carnet de santé de {animalInfos.name}</h1>

            <div className='profil_content'>
                <div className='profil_infos'>
                    <div><span>Propriétaire : </span>{proprioInfos.firstname} {proprioInfos.lastname}</div>
                    <div><span>Nom : </span>{animalInfos.name}</div>
                    <div><span>Type : </span>{animalInfos.type}</div>
                    <div><span>Date de naissance : </span>{animalInfos.date_of_birth}</div>
                    <div><span>Sexe : </span>{animalInfos.sexe}</div>
                    <div><span>Poids : </span>{animalInfos.weight} g</div>
                    <div><span>Taille : </span>{animalInfos.size} cm</div>
                    <div><span>Antécédents médicaux : </span></div>
                    <div><span>Dates des vaccinations : </span></div>
                    <div><span>Dates des rendez-vous : </span></div>
                    <div className='btn_container'>
                        <button>Modifier le carnet</button>
                    </div>
                </div>
            </div>

            <div>
                <AiOutlineArrowLeft />
                <span>Retourner à la fiche client</span>
            </div>
        </div>
    );
};

export default AnimalProfil;