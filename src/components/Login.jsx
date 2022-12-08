import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


    //Connection constant
    const LOGIN_URL = '/user/login';

    //Focus sur le premier élément au chargement de la page
    useEffect(() => {
        emailRef.current.focus();
    }, [])


    //Enlever le msg d'erreur si l'utilisateur entre des données
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleRegister = async (e) => {
        e.preventDefault();

        // axios.get(`https://jsonholder.com/users`)
        //     .then(res => {
        //         const animals = res.data;
        //         this.setState({ animals });
        //     })

        axios.post(
            LOGIN_URL,
            JSON.stringify({ email, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: true
            }
        )
            .then(res => {

            })
            ;
    }

    return (
        <div className='login'>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h2>Se connecter</h2>
            <form onSubmit={e => handleRegister(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email * : </label></td>
                            <td><input
                                type="email"
                                id="email"
                                required
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Mot de passe * : </label></td>
                            <td><input
                                type="password"
                                id="password"
                                required
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <div className='signup_submit'>
                    <input type="submit" value="Se connecter" />
                </div>
            </form>
        </div>
    );
};

export default Login;