import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaProductHunt, FaTruck } from "react-icons/fa";
import { AiFillDashboard, AiOutlineSearch } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import AuthContext from '../context/AuthProvider';

const Navbar = () => {
    const { auth } = useContext(AuthContext);

    const type = localStorage.getItem('type');

    return (
        <div className='navbar'>
            <img src="logo.png" alt="logo" className='logo' />
            <div id="search_field">
                <AiOutlineSearch />
                <input type="text" name="search" id="search_field_input" placeholder="Rechercher" maxlength="20" />
            </div>
            <ul>
                <NavLink to="/page_accueil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><AiFillDashboard /> Accueil</li>
                </NavLink>
                {type === "veterinary" ? (
                    <NavLink to="/clients" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li><FaUsers /> Mes clients</li>
                    </NavLink>
                ) : ""}
                <NavLink to="/animaux" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><MdPets /> Mes animaux</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navbar;