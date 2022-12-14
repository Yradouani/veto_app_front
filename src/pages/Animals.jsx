import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useState } from 'react';
import { AiFillPlusCircle } from "react-icons/ai";

const Animals = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');
    const type = localStorage.getItem('type');
    const [data, setData] = useState();
    const [emailVeterinary, setEmailVeterinary] = useState("");

    const GET_ANIMALS = "/user/veterinary/";

    useEffect(() => {
        getAnimals();
        getClientInfo();
        getVeterinaryInfo();
    }, [])

    const getClientInfo = () => {
        if (type === "client") {
            console.log("coucou")
            axios.get("/user/client/" + id)
                .then(function (response) {
                    const infos = response.data;
                    setData(infos);
                })
                .catch(err => console.log(err))
        }
    }
    console.log(data);

    const getVeterinaryInfo = () => {
        axios.get("/user/veterinary/" + data.veterinary_id)
            .then(function (response) {
                console.log(response.data);
                const infos = response.data;
                console.log(infos[0].email)
                setEmailVeterinary(infos[0].email);
            })
            .catch(err => console.log(err))
        console.log(emailVeterinary);
    }

    const getAnimals = () => {
        if (type === "veterinaire") {
            axios.get(GET_ANIMALS + id + '/animals')
                .then(function (response) {
                    console.log(response.data);
                    setAnimals(response.data);
                    console.log(animals);
                }
                )
                .catch(err => console.log(err))
        } else if (type === "client") {
            axios.get("user/client/" + id + "/animals")
                .then(function (response) {
                    console.log(response.data);
                    setAnimals(response.data);
                    console.log(animals);
                }
                )
                .catch(err => console.log(err))
        }
    };

    const redirectToAnimalProfil = (id) => {
        navigate(`/profil_animal/id=${id}`);
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
                                    <div className='card_content_container'>
                                        <h2>{animal.name}</h2>
                                        <div className='card_infos'>
                                            <div><span>Propriétaire : </span></div>
                                            <div><span>Type : </span>{animal.type}</div>
                                            <div><span>Sexe : </span>{animal.sexe}</div>
                                            <div><span>Date de naissance : </span>{animal.date_of_birth}</div>
                                            <div className='btn_container'>
                                                <button onClick={() => redirectToAnimalProfil(animal.id)}>Modifier</button>
                                                <button>Supprimer</button>
                                            </div>
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
                        {(type === "veterinaire") ? (
                            <div className='add_new_client_content'>
                                <div ><AiFillPlusCircle /></div >
                                <div>Ajouter un nouvel animal</div >
                            </div>
                        ) : (
                            <div>
                                <a href={"mailto:" + emailVeterinary}>
                                    Demandez à votre vétérinaire d'ajouter un animal ?
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Animals;