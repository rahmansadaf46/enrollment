import React, { useContext, useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import "./Login.css";



firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const setData = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
    }
    useEffect(() => {
        setLoggedInUser(JSON.parse(localStorage.getItem("user")) || {});
        if (loggedInUser.email) {
            history.replace(from);
        }
    }, []);


    const [currentUser, setCurrentUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });


    const handleFormToggle = () => {
        setNewUser(!newUser);
    };


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    /* Form validation and give error */
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    let pass1, pass2;
    const handleFormValidation = (e) => {
        let isFieldValid = true;
        const newError = { ...errors };

        if (e.target.name === "name") {
            isFieldValid = e.target.value.length > 2;
            if (!isFieldValid) {
                newError[e.target.name] = "Name is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+/.test(e.target.value);
            if (!isFieldValid) {
                newError[e.target.name] = "Email is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            const isPasswordLengthValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            isFieldValid = isPasswordLengthValid && passwordHasNumber;

            if (e.target.name === "password") {
                pass1 = e.target.value;
                if (!isFieldValid) {
                    newError[e.target.name] = "Password is not valid";
                    setErrors(newError);
                } else {
                    newError[e.target.name] = "";
                    setErrors(newError);
                }
            }
            if (e.target.name === "confirmPassword") {
                pass2 = e.target.value;
                if (!isFieldValid && pass1 !== pass2) {
                    newError[e.target.name] = "Password is not matched";
                    setErrors(newError);
                } else {
                    newError[e.target.name] = "";
                    setErrors(newError);
                }
            }
        }

        if (isFieldValid) {
            const newUser = { ...currentUser };
            newUser[e.target.name] = e.target.value;
            setCurrentUser(newUser);
        }
    };

    /* CREATE NEW USER */
    const handleCreateNewUser = (e) => {
        e.preventDefault();

        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.name = "Please use valid name!";
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            newError.confirmPassword = "Please is not matched!";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUser = {
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);

                    setLoggedInUser(newUser);


                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                    console.log(error.message);
                });
        }
    };

    /* SIGN IN with email and password */
    const handleSignIn = (e) => {
        e.preventDefault();
        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUser = {
                        isSignedIn: true,
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);
                    setLoggedInUser(newUser);
                    setData(newUser);

                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.email = "";
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                });
        }
    };
    return (
        <section className="loginPage-signup-login text-center">

            <div style={{ marginTop: '-50px' }} className="d-flex justify-content-center mb-5 ">
                {/* <img  src={logo} alt="" /> */}
                <h1>Student Enrollment System</h1>
            </div>

            {currentUser.success && (
                <div className="alert alert-success" role="alert">
                    {!newUser ? "Please login first" : "User registered successfully... Now wait for admin Approval..."}
                </div>
            )}
            {loggedInUser.error && (
                <div className="alert alert-danger" role="alert">
                    {loggedInUser.error}
                </div>
            )}
            <div className="container">
                {newUser ? (
                    <SignUpForm
                        toggleUser={handleFormToggle}
                        validation={handleFormValidation}
                        submit={handleCreateNewUser}
                        errors={errors}
                    ></SignUpForm>
                ) : (
                        <LoginForm
                            toggleUser={handleFormToggle}
                            validation={handleFormValidation}
                            submit={handleSignIn}
                            errors={errors}
                        ></LoginForm>
                    )}
                <br />


            </div>
        </section>
    );
};

export default Login;