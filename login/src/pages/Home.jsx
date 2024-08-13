import React from 'react';
import { Link } from 'react-router-dom';
import Homepage from '../assets/Homepage.svg';
import LoginForm from './LoginForm';

function Home({ auth, setAuth, setUser, setAdmin }) {
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                {auth ? (
                    // When authenticated, take full width
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center bg-light">
                        <div className="text-center">
                            <h1 className="display-1">Welcome to FS Marketplace</h1>
                            <p className="mt-4">
                                FS Marketplace is your go-to platform for buying and selling used items within the university community. 
                                Discover great deals and connect with fellow students!
                            </p>
                            <img src={Homepage} alt="Description" className="img-fluid mt-4"/>
                        </div>
                    </div>
                ) : (
                    // When not authenticated, show Home and Login components side by side
                    <>
                        <div className="col-9 d-flex flex-column justify-content-center align-items-center bg-light">
                            <div className="text-center">
                                <h1 className="display-1">Welcome to FS Marketplace</h1>
                                <p className="mt-4">
                                    FS Marketplace is your go-to platform for buying and selling used items within the university community. 
                                    Discover great deals and connect with fellow students!
                                </p>
                                <img src={Homepage} alt="Description" className="img-fluid mt-4"/>
                            </div>
                        </div>
                        <div className="col-3 d-flex flex-column align-items-center bg-light">
                            <LoginForm auth={auth} setAuth={setAuth} setUser={setUser} setAdmin={setAdmin}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
