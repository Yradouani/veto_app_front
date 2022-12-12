import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState } from 'react';
import { AiFillPlusCircle } from "react-icons/ai";

const Animals = () => {
    const [animals, setAnimals] = useState([]);

    const id = localStorage.getItem('userId');

    const GET_ANIMALS = "/user/veterinary/";

    useEffect(() => {
        getAnimals();
    }, [])

    const getAnimals = () => {
        axios.get(GET_ANIMALS + id + '/animals')
            .then(function (response) {
                console.log(response.data);
                setAnimals(response.data);
                console.log(animals);
            }
            )
            .catch(err => console.log(err))
    };

    return (
        <div className='animals'>
            <img src="Untitled(1).png" alt="" className='background' />
            <Navbar />
            <h1>Mes animaux</h1>
            {(animals.length !== 0) ? (
                <div className='global_cards_container'>
                    {
                        animals.map(animal => {
                            return (
                                <div className='card_content'>
                                    <h2>{animal.name}</h2>
                                    <div className='card_infos'>
                                        <div><span>Propriétaire : </span></div>
                                        <div><span>Type : </span>{animal.type}</div>
                                        <div><span>Sexe : </span>{animal.sexe}</div>
                                        <div><span>Date de naissance : </span>{animal.date_of_birth}</div>
                                        <div className='btn_container'>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            ) : (
                <div className='noanimal-content'>
                    <p>Vous n'avez aucun animal dans votre espace</p>
                    <div className='add_new_animal'>
                        <div
                            className='add_new_client_content'
                        // onClick={() => setOpenModal(true)}
                        >
                            <AiFillPlusCircle />
                            <span>Ajouter un nouvel animal</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Animals;