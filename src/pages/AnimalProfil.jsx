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

    const [edit, setEdit] = useState();
    const [editName, setEditName] = useState();
    const [editSexe, setEditSexe] = useState();
    const [editWeight, setEditWeight] = useState();
    const [editSize, setEditSize] = useState();

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

    const updateInfosAnimal = async () => {
        try {
            console.log(editName, editSexe, editWeight, editSize);
            console.log(animalInfos?.name, animalInfos?.sexe, animalInfos?.weight, animalInfos?.size, animalInfos?.veterinary_id, animalInfos?.client_id);
            const response = await axios.put(
                "/animal/" + animalInfos?.id,
                JSON.stringify({
                    name: (editName ? editName : animalInfos?.name),
                    sexe: (editSexe ? editSexe : animalInfos?.sexe),
                    weight: (editWeight ? editWeight : animalInfos?.weight),
                    size: (editSize ? editSize : animalInfos?.size),
                    veterinary_id: animalInfos?.veterinary_id,
                    client_id: animalInfos?.client_id
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(response.data);
            setAnimalInfos(response.data);
            setEdit(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='animal_profil'>
            <img src="../../Untitled(1).png" alt="" className='background' />
            <Navbar />
            <h1>Carnet de santé de {animalInfos.name}</h1>

            <div className='profil_content'>
                <div className='profil_infos'>
                    <div><span>Propriétaire : </span>{proprioInfos.firstname} {proprioInfos.lastname}</div>
                    <div><span>Nom : </span>{edit ? (
                        <input
                            type="text"
                            defaultValue={editName ? editName : animalInfos?.name}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    ) : (animalInfos.name)}</div>
                    <div><span>Type : </span>{animalInfos.type}</div>
                    <div><span>Date de naissance : </span>{animalInfos?.date_of_birth?.split('-').reverse().join('/')}</div>
                    <div><span>Sexe : </span>{edit ? (
                        <input
                            type="text"
                            defaultValue={editSexe ? editSexe : animalInfos?.sexe}
                            onChange={(e) => setEditSexe(e.target.value)}
                        />
                    ) : (animalInfos.sexe)}</div>

                    <div><span>Poids : </span>{edit ? (
                        <input
                            type="text"
                            defaultValue={editWeight ? editWeight : animalInfos?.weight}
                            onChange={(e) => setEditWeight(e.target.value)}
                        />
                    ) : (animalInfos.weight)} g</div>

                    <div><span>Taille : </span>{edit ? (
                        <input
                            type="text"
                            defaultValue={editSize ? editSize : animalInfos?.size}
                            onChange={(e) => setEditSize(e.target.value)}
                        />
                    ) : (animalInfos.size)} cm</div>
                    <div><span>Antécédents médicaux : </span></div>
                    <div><span>Dates des vaccinations : </span></div>
                    <div><span>Dates des rendez-vous : </span></div>
                    <div className='btn_container'>
                        {edit ?
                            (<div className='btn_update'>
                                <button onClick={() => updateInfosAnimal()}>Valider</button>
                                <button onClick={() => setEdit(false)}>Annuler</button>
                            </div>)
                            : <button onClick={() => setEdit(true)}>Modifier le carnet</button>
                        }
                        <button>Envoyer un rappel Vaccinal</button>
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