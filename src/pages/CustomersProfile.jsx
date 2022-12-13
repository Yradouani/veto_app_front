import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from "react-icons/ai";
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomersProfile = () => {
    const { id } = useParams();
    const veterinary_id = localStorage.getItem('userId');
    const navigate = useNavigate();

    const GET_CLIENT = '/user/client/';
    const GET_ANIMALS = 'user/client/';
    const ADD_ANIMAL = '/animal';

    const [userInfos, setUserInfos] = useState({});
    const [animals, setAnimals] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [type, setType] = useState('Chat');
    const [validType, setValidType] = useState(false);
    const [typeFocus, setTypeFocus] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [validDateOfBirth, setValidDateOfBirth] = useState(false);
    const [dateOfBirthFocus, setDateOfBirthFocus] = useState(false);

    const [sexe, setSexe] = useState('Femelle');
    const [validSexe, setValidSexe] = useState(false);
    const [sexeFocus, setSexeFocus] = useState(false);

    const [weight, setWeight] = useState('');
    const [validWeight, setValidWeight] = useState(false);
    const [weightFocus, setWeightFocus] = useState(false);

    const [size, setSize] = useState('');
    const [validSize, setValidSize] = useState(false);
    const [sizeFocus, setSizeFocus] = useState(false);

    // var mySQLdate = userInfos?.created_at;
    // const created_date = new Date(Date.parse(mySQLdate.replace(/-/g, '/')));

    useEffect(() => {
        getDataClient();
        getAnimals();
    }, [])

    const resetInfosForm = () => {
        setName("");
        setType("");
        setDateOfBirth("");
        setSexe("");
        setWeight("");
        setSize("");
        document.querySelector('#name').value = "";
        document.querySelector('#type').value = "";
        document.querySelector('#date').value = "";
        document.querySelector('#weight').value = "";
        document.querySelector('#size').value = "";
        document.querySelector('#sexe').value = "";
    }
    const addNewAnimal = async (e) => {
        e.preventDefault();
        console.log(name, type, sexe, dateOfBirth, weight, size);

        try {
            const response = await axios.post(
                ADD_ANIMAL,
                JSON.stringify({ name, type, date_of_birth: dateOfBirth, sexe, weight, size, client_id: id, veterinary_id: veterinary_id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(response.data);
            console.log(JSON.stringify(response));
            let animal = response.data;
            animals.push(animal);
            setOpenModal(false);
            resetInfosForm();
        } catch (err) {
            console.log(err);
        }
    };

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

        try {
            axios.get(GET_ANIMALS + id + "/animals")
                .then(function (response) {
                    console.log(response.data);
                    setAnimals(response.data)
                }
                )
                .catch(err => console.log(err))

        } catch (err) {

        }
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
                    Profil du client : {userInfos?.firstname} {userInfos?.lastname}
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
                        <h3><AiFillPlusCircle onClick={() => setOpenModal(true)} /></h3>
                    ) : ""}
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
                <form onSubmit={(e) => addNewAnimal(e)}>
                    <h2>Ajouter un nouvel animal</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name">Nom * : </label></td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="type">Type * : </label></td>
                                <td>
                                    <select name="" id="type" onChange={(e) => setType(e.target.value)}>
                                        <option value="chat">Chat</option>
                                        <option value="chat">Chien</option>
                                        <option value="chat">Lapin</option>
                                        <option value="chat">Hamster</option>
                                        <option value="chat">Tortue</option>
                                        <option value="chat">Autre</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="sexe">Sexe * : </label></td>
                                <td>
                                    <select name="" id="sexe" onChange={(e) => setSexe(e.target.value)}>
                                        <option value="femelle">Femelle</option>
                                        <option value="mâle">Mâle</option>
                                        <option value="non determiné">Non déterminé</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="date">Date de naissance * : </label></td>
                                <td>
                                    <input
                                        type="date"
                                        name=""
                                        id="date"
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="weight">Poids en g * </label></td>
                                <td>
                                    <input
                                        type="text"
                                        name=""
                                        id="weight"
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="size">Taille en cm * : </label></td>
                                <td>
                                    <input
                                        type="text"
                                        name=""
                                        id="size"
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='btn_container'>
                        <input type="submit" value="Valider" />
                        <button onClick={() => setOpenModal(false)}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomersProfile;