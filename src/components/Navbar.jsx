import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuffer, FaUsers, FaProductHunt, FaTruck } from "react-icons/fa";
import { AiFillDashboard, AiOutlineSearch } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import { MdPayments } from "react-icons/md";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div id="search_field">
                <AiOutlineSearch />
                <input type="text" name="search" id="search_field_input" placeholder="Rechercher" maxlength="20" />
            </div>
            <ul>
                <NavLink to="/page_accueil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><AiFillDashboard /> Accueil</li>
                </NavLink>
                <NavLink to="/clients" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><FaProductHunt /> Mes clients</li>
                </NavLink>
                <NavLink to="/orders" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><FaBuffer /> Commandes</li>
                </NavLink>
                <NavLink to="/customers" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><FaUsers /> Clients</li>
                </NavLink>
                <NavLink to="/carriers" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><FaTruck /> Transporteurs</li>
                </NavLink>
                <NavLink to="/payment" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><MdPayments /> Paiement</li>
                </NavLink>
                <NavLink to="/analytics" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><SiSimpleanalytics /> Statistiques</li>
                </NavLink>

            </ul>
        </div>
    );
};

export default Navbar;