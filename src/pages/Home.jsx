import React from 'react';
import { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Home = () => {
    const [signUp, setSignUp] = useState(true);

    return (
        <div className='home'>
            <div className='header_content'>
                <div className='header_title'>
                    <h1>Bienvenue chez Véto'app</h1>
                    <p>La première application de rappel de vaccin automatisé</p>
                </div>
                <div className='connect_modal'>
                    <div className="header_btn">
                        <button style={{
                            background: signUp ? "#B38B6D" : "rgb(238, 235, 229)",
                            color: signUp ? "white" : "black"
                        }}
                            onClick={() => setSignUp(true)}>S'inscrire</button>
                        <button style={{
                            background: signUp ? "rgb(238, 235, 229)" : "#B38B6D",
                            color: signUp ? "black" : "white"
                        }}
                            onClick={() => setSignUp(false)}>Se connecter</button>
                    </div>
                    {signUp ? <SignUp /> : <Login />}
                </div>
            </div>
        </div>
    );
};

export default Home;