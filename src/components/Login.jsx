import React from 'react';
import { useRef } from 'react';
import axios from 'axios';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const handleRegister = (e) => {
        e.preventDefault();

        // axios.get(`https://jsonholder.com/users`)
        //     .then(res => {
        //         const animals = res.data;
        //         this.setState({ animals });
        //     })

        console.log(email.current.value, password.current.value);
    }

    return (
        <div className='login'>
            <h2>Se connecter</h2>
            <form onSubmit={e => handleRegister(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email *</label></td>
                            <td><input
                                type="email"
                                name="email"
                                id="email"
                                required
                                ref={email}
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Mot de passe *</label></td>
                            <td><input
                                type="password"
                                name="password"
                                id="password"
                                required
                                ref={password}
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