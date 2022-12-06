import React from 'react';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";

const SignUp = () => {
    const registerSiret = useRef();
    const registerFirstname = useRef();
    const registerLastname = useRef();
    const registerEmail = useRef();
    const registerPassword = useRef();
    const registerConfirmPassword = useRef();
    const errRef = useRef();

    //REGEX
    const USER_REGEX = /^[a-zA-Z][a-zA-Z-_]{2,24}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%£§&]).{8,24}$/;
    const SIRET_REGEX = /^[0-9]{14}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [siret, setSiret] = useState('');
    const [validSiret, setValidSiret] = useState(false);
    const [siretFocus, setSiretFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    useEffect(() => {
        registerFirstname.current.focus();
    }, [])

    useEffect(() => {
        const result = SIRET_REGEX.test(siret);
        console.log(result);
        console.log(siret);
        setValidSiret(result);
        //eslint-disable-next-line
    }, [siret])

    useEffect(() => {
        const result = USER_REGEX.test(firstName);
        console.log(result);
        console.log(firstName);
        setValidFirstName(result);
        //eslint-disable-next-line
    }, [firstName])

    useEffect(() => {
        const result = USER_REGEX.test(lastName);
        console.log(result);
        console.log(lastName);
        setValidLastName(result);
        //eslint-disable-next-line
    }, [lastName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
        //eslint-disable-next-line
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        //eslint-disable-next-line
    }, [pwd])

    useEffect(() => {
        const result = PWD_REGEX.test(matchPwd);
        console.log(result);
        console.log(matchPwd);
        setValidMatch(result);
        //eslint-disable-next-line
    }, [matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, siret, email, pwd, matchPwd])


    const handleRegister = (e) => {
        e.preventDefault();

        // axios.post(`https://jsonholder.com/users`)
        //     .then(res => {
        //         const animals = res.data;
        //         this.setState({ animals });
        //     })

    }

    return (
        <div className='signup'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h2>S'inscrire</h2>
            <form onSubmit={(e) => handleRegister(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="siret">Numéro de Siret * :
                                    <span className={validSiret ? "valid" : "hide"}>
                                        <BsCheckLg />
                                    </span>
                                    <span className={validSiret || !siret ? "hide" : "invalid"}>
                                        <ImCross />
                                    </span>
                                </label></td>
                            <td><input
                                type="text"
                                name="siret"
                                id="siret"
                                required
                                autoComplete='off'
                                aria-invalid={validSiret ? "false" : "true"}
                                aria-describedby="siretnote"
                                ref={registerSiret}
                                onChange={(e) => setSiret(e.target.value)}
                                onFocus={() => setSiretFocus(true)}
                                onBlur={() => setSiretFocus(false)}
                            /></td>
                        </tr>
                        <tr>
                            <td colspan="2" id="siretnote" className={siretFocus && siret && !validSiret ? "instructions" : "offscreen"}>
                                <CgDanger className='danger' />
                                14 chiffres obligatoires
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="firstname">Prénom * :
                                    <span className={validFirstName ? "valid" : "hide"}>
                                        <BsCheckLg />
                                    </span>
                                    <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                        <ImCross />
                                    </span>
                                </label>
                            </td>
                            <td><input
                                type="text"
                                name="firstname"
                                id="firstname"
                                required
                                ref={registerFirstname}
                                autoComplete='off'
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby="firstnamenote"
                                onChange={(e) => setFirstName(e.target.value)}
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                            /></td>
                        </tr>
                        <tr>
                            <td colspan="2" id="firstnamenote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                <CgDanger className='danger' />
                                Entre 3 et 23 lettres
                            </td>
                        </tr>

                        {/* LastName */}
                        <tr>
                            <td>
                                <label htmlFor="lastname">Nom * :
                                    <span className={validLastName ? "valid" : "hide"}>
                                        <BsCheckLg />
                                    </span>
                                    <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                        <ImCross />
                                    </span>
                                </label>
                            </td>
                            <td><input
                                type="text"
                                name="lastname"
                                id="lastname"
                                required
                                ref={registerLastname}
                                autoComplete='off'
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="lastnamenote"
                                onChange={(e) => setLastName(e.target.value)}
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            /></td>
                        </tr>
                        <tr>
                            <td colspan="2" id="lastnamenote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                <CgDanger className='danger' />
                                Entre 3 et 23 lettres
                            </td>
                        </tr>

                        {/* Input for Email */}
                        <tr>
                            <td>
                                <label htmlFor="email">Email * :
                                    <span className={validEmail ? "valid" : "hide"}>
                                        <BsCheckLg />
                                    </span>
                                    <span className={validEmail || !email ? "hide" : "invalid"}>
                                        <ImCross />
                                    </span>
                                </label>
                            </td>
                            <td><input
                                type="email"
                                name="email"
                                id="email"
                                required
                                ref={registerEmail}
                                autoComplete='off'
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            /></td>
                        </tr>
                        <tr>
                            <td colspan="2" id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <CgDanger className='danger' />
                                Veuillez saisir un email correct
                            </td>
                        </tr>

                        {/* Input for Password */}
                        <tr>
                            <td>
                                <label htmlFor="password">Mot de passe * :
                                    <span className={validPwd ? "valid" : "hide"}>
                                        <BsCheckLg />
                                    </span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                        <ImCross />
                                    </span>
                                </label>
                            </td>
                            <td className='password_content'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    required
                                    ref={registerPassword}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="passwordnote"
                                    onChange={(e) => setPwd(e.target.value)}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                {!showPassword ?
                                    (<AiFillEyeInvisible
                                        className='eye'
                                        onClick={() => setShowPassword(!showPassword)}
                                    />) : (<AiFillEye
                                        className='eye'
                                        onClick={() => setShowPassword(!showPassword)}
                                    />)
                                }
                            </td>
                        </tr>
                        <tr >
                            <td colspan="2" id="passwordnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                                <CgDanger className='danger' />
                                8 caractères min, dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial
                            </td>
                        </tr>

                        {/* Input for confirm password */}
                        <tr>
                            <td><label htmlFor="confirmPassword">Confirmer le mot de passe * :
                                <span className={validMatch ? "valid" : "hide"}>
                                    <BsCheckLg />
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <ImCross />
                                </span>
                            </label></td>
                            <td className='password_content'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    ref={registerConfirmPassword}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmpasswordnote"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                {!showConfirmPassword ?
                                    (<AiFillEyeInvisible
                                        className='eye'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />) : (<AiFillEye
                                        className='eye'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />)
                                }
                            </td>
                        </tr>
                        {validPwd ?
                            <tr>
                                <td colspan="2" id="confirmpasswordnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                                    <CgDanger className='danger' />
                                    La confirmation ne correspond pas au mot de passe
                                </td>
                            </tr>
                            :
                            <tr>
                                <td colspan="2" id="confirmpasswordnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                                    <CgDanger className='danger' />
                                    Veuillez entrer un mot de passe valide avant de confirmer
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className='signup_submit'>
                    <input type="submit" value="S'inscrire" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;