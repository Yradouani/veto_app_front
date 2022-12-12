import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from "react-icons/ai";
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomersProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const GET_CLIENT = '/user/client/';
    const GET_ANIMALS = 'user/client/';

    const [userInfos, setUserInfos] = useState({});
    const [animals, setAnimals] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // var mySQLdate = userInfos?.created_at;
    // const created_date = new Date(Date.parse(mySQLdate.replace(/-/g, '/')));

    useEffect(() => {
        getDataClient();
        getAnimals();
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

    const getAnimals = () => {

        axios.get(GET_ANIMALS + id + "/animals")
            .then(function (response) {
                console.log(response.data);
                setAnimals(response.data)
            }
            )
            .catch(err => console.log(err))
    }

    const getAnimalProfil = (id) => {
        navigate(`/profil_animal/id=${id}`);
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
                    {animals.length ? (
                        <div className='animal_container'>
                            {animals.map(animal => {
                                return (
                                    <div key={animal.id} className='animal_info_container'>
                                        <div><span>Nom : </span>{animal.name}</div>
                                        <div><span>Type : </span>{animal.type}</div>
                                        <button onClick={() => getAnimalProfil(animal.id)}>Voir la fiche</button>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className='noanimal'>
                            Pas encore d'animal enregistré
                            <div className='add_new_client_content' onClick={() => setOpenModal(true)}>
                                <AiFillPlusCircle />
                                <span>Ajouter un nouvel animal</span>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            <div className={openModal ? "open_modal" : "close_modal"}>
                <form >
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name">Nom * : </label></td>
                                <td><input type="text" /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="type">Type * : </label></td>
                                <td>inp</td>
                            </tr>
                            <tr>
                                <td><label htmlFor="sexe">Sexe * : </label></td>
                                <td>
                                    <input type="radio" name="" id="sexe" value="male" />Mâle
                                    <input type="radio" name="" id="sexe" value="femelle" />Femelle
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="date">Date de naissance : </label></td>
                                <td><input type="date" name="" id="date" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default CustomersProfile;