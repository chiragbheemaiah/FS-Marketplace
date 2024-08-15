import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Verification() {
    const location = useLocation();
    const email = location.state?.email || ''; // Access the email passed as a state variable
    const verify = location.state.verify;
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [errors, setErrors] = useState('');

    console.log('Email', email);
    console.log('Verify', verify);

    useEffect(() =>{
        if(!verify){
            navigate('/');
        }
    }, [verify]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the verification process here
        // axios.post('http://localhost:3001/users/registration', data, { withCredentials: true });

        try {
            const response = await axios.post('http://localhost:3001/users/verification', {secret: verificationCode}, { withCredentials: true });
            if (response.status === 200) {
                navigate('/');
            } else {
                setErrors('Invalid Verification Code, please try again!');
            }
        } catch (error) {
            setErrors('Invalid Verification Code, please try again!');
        }
        console.log(`Verification code submitted: ${verificationCode}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center display-5">Verification</h1>
            <p className="text-center">Please enter the verification code sent to your email: <strong>{email}</strong></p>
            {errors && (
                <div className="alert alert-danger text-center w-50 mx-auto" role="alert">
                    {errors}
                </div>
            )}
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Verify</button>
            </form>
        </div>
    );
}

export default Verification;
