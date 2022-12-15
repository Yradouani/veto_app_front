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

    const [edit, setEdit] = useState(false);
    const [editFirstname, setEditFirstname] = useState(false);
    const [editLastname, setEditLastname] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editSiret, setEditSiret] = useState(false);
    // const isClient = Number(localStorage.getItem('isClient'));
    const type = localStorage.getItem('type');
    console.log(id);
    console.log(type);

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

    const updateUser = async () => {
        if (type === "client") {
            try {
                console.log(editAddress, editPhone, editEmail, editFirstname, editLastname);
                console.log(data?.address, data?.phone, data?.email, data?.firstname, data?.lastname);
                const response = await axios.put(
                    "/client/" + data?.id,
                    JSON.stringify({
                        address: (editAddress ? editAddress : data?.address),
                        phone: (editPhone ? editPhone : data?.phone),
                        email: (editEmail ? editEmail : data?.email),
                        veterinary_id: data?.veterinary_id,
                        firstname: (editFirstname ? editFirstname : data?.firstname),
                        lastname: (editLastname ? editLastname : data?.lastname)
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        // withCredentials: true
                    }
                );
                console.log(response.data);
                setData(response.data);
                setEdit(false);
            } catch (err) {
                console.log(err)
            }
        } else if (type === "veterinary") {
            try {
                console.log(editSiret, editEmail, editFirstname, editLastname);
                console.log(data[0]?.siret, data[0]?.email, data[0]?.firstname, data[0]?.lastname);
                const response = await axios.put(
                    "/veterinary/" + data[0]?.id,
                    JSON.stringify({
                        siret: (editSiret ? editSiret : data[0]?.siret),
                        email: (editEmail ? editEmail : data[0]?.email),
                        veterinary_id: data[0]?.id,
                        firstname: (editFirstname ? editFirstname : data[0]?.firstname),
                        lastname: (editLastname ? editLastname : data[0]?.lastname)
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        // withCredentials: true
                    }
                );
                console.log(response.data);
                setData([response.data]);
                setEdit(false);
            } catch (err) {
                console.log(err)
            }
        }
    }

    console.log(data);

    return (
        <div className='main-page'>
            <img src="background.png" alt="" className='background' />
            <Navbar></Navbar>

            {data?.firstname ? (
                <div className='page_content'>
                    <div className='user_infos_container'>
                        <h1>
                            Bienvenue {data.firstname}
                            <br />
                            dans votre espace {type === 'client' ? "client" : "vétérinaire"}
                        </h1>
                        <h2>Parcourez la première application de rappel vaccinal automatisé</h2>
                        <h3>Vos informations personnelles</h3>
                        <div><span>Date de création de mon compte : </span>{data?.created_at?.slice(0, 10).split('-').reverse().join('/')}</div>
                        <div>
                            <span>Nom : </span>{edit ? (
                                <input
                                    type="text"
                                    defaultValue={editLastname ? editLastname : data?.lastname}
                                    onChange={(e) => setEditLastname(e.target.value)}
                                />
                            ) : (data?.lastname)}
                        </div>
                        <div><span>Prénom : </span>{edit ? (
                            <input
                                type="text"
                                defaultValue={editFirstname ? editFirstname : data?.firstname}
                                onChange={(e) => setEditFirstname(e.target.value)}
                            />
                        ) : (data?.firstname)}</div>

                        {(type === "client") ? (
                            <div><span>Adresse postale : </span>{edit ? (
                                <input
                                    type="text"
                                    defaultValue={editAddress ? editAddress : data?.address}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                />
                            ) : (data?.address)}</div>
                        ) : ""}

                        <div><span>Adresse email : </span>{edit ? (
                            <input
                                type="text"
                                defaultValue={editEmail ? editEmail : data?.email}
                                onChange={(e) => setEditEmail(e.target.value)}
                            />
                        ) : (data?.email)}</div>

                        {(type === "client") ? (
                            <div><span>Numéro de téléphone : </span>{edit ? (
                                <input
                                    type="text"
                                    defaultValue={editPhone ? editPhone : data?.phone}
                                    onChange={(e) => setEditPhone(e.target.value)}
                                />
                            ) : data?.phone}</div>
                        ) : ""}

                        <div className='btn_container'>
                            {edit ?
                                (<>
                                    <button className='update_btn' onClick={() => setEdit(false)}>Annuler</button>
                                    <button className='pwd_btn' onClick={() => updateUser()}>Confirmer</button>
                                </>) : (
                                    <>
                                        <button className='update_btn' onClick={() => setEdit(true)}>Modifier mes informations personnelles</button>
                                        <button className='pwd_btn'>Modifier mon mot de passe</button>
                                    </>)
                            }
                        </div>
                    </div>
                </div>

            ) : <div className='page_content'>
                <div className='user_infos_container'>
                    <h1>
                        Bienvenue {data[0]?.firstname}
                        <br />
                        dans votre espace {type === 'client' ? "client" : "vétérinaire"}
                    </h1>
                    <h2>Parcourez la première application de rappel vaccinal automatisé</h2>
                    <h3>Vos informations personnelles</h3>
                    <div><span>Date de création de mon compte : </span>{data[0]?.created_at?.slice(0, 10).split('-').reverse().join('/')}</div>

                    {(type === "veterinary") ? (
                        <div><span>Siret : </span>{edit ? (
                            <input
                                type="text"
                                defaultValue={editSiret ? editSiret : data[0]?.siret}
                                onChange={(e) => setEditSiret(e.target.value)}
                            />
                        ) : (data[0]?.siret)}
                        </div>
                    ) : ""}

                    <div>
                        <span>Nom : </span>{edit ? (
                            <input
                                type="text"
                                defaultValue={editLastname ? editLastname : data[0]?.lastname}
                                onChange={(e) => setEditLastname(e.target.value)}
                            />
                        ) : (data[0]?.lastname)}
                    </div>
                    <div><span>Prénom : </span>{edit ? (
                        <input
                            type="text"
                            defaultValue={editFirstname ? editFirstname : data[0]?.firstname}
                            onChange={(e) => setEditFirstname(e.target.value)}
                        />
                    ) : (data[0]?.firstname)}
                    </div>

                    <div><span>Adresse email : </span>{edit ? (
                        <input
                            type="text"
                            defaultValue={editEmail ? editEmail : data[0]?.email}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                    ) : (data[0]?.email)}
                    </div>

                    <div className='btn_container'>
                        {edit ?
                            (<>
                                <button className='update_btn' onClick={() => setEdit(false)}>Annuler</button>
                                <button className='pwd_btn' onClick={() => updateUser()}>Confirmer</button>
                            </>) : (
                                <>
                                    <button className='update_btn' onClick={() => setEdit(true)}>Modifier mes informations personnelles</button>
                                    <button className='pwd_btn'>Modifier mon mot de passe</button>
                                </>)
                        }
                    </div>

                </div>
            </div>
            }
        </div>
    );
};

export default MainPage;