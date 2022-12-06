import React from 'react';
import Navbar from '../components/Navbar';
import { AiFillPlusCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const Customers = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='page_content'>
                <header>
                    <h1>Gérez vos clients</h1>
                    <div className='add_new_client'>
                        <div className='add_new_client_content'>
                            <AiFillPlusCircle />
                            <span>Ajouter un nouveau client</span>
                        </div>
                    </div>

                </header>
                <div className='orders_content'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Titre</th>
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Adresse e-mail</th>
                                <th scope="col">Ventes</th>
                                <th scope="col">Inscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>49885522</td>
                                <td>Mme</td>
                                <td>Yasmine</td>
                                <td>Radouani</td>
                                <td>yasmine.radouani@outlook.fr</td>
                                <td>250$</td>
                                <td>12/11/2022</td>
                                <td><BsPencilSquare /></td>
                                <td><FaTrashAlt /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customers;