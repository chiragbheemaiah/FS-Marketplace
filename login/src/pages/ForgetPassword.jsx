import React, { useState } from 'react';
import axios from 'axios';
// TODO: Invalid for ADMIN
function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    console.log(email)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/users/forgetpassword', { email });
        if(response.status === 200){
            setMessage(`Password reset instructions have been sent to ${email}`);
            setEmail(''); 
        }else if(response.status === 404){
            setMessage(`We could not find your acount, please create a new account!`)
            setEmail(''); 
        }else{
            setMessage('Internal Server Error. Please try again later :(');
            setEmail('');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Forgot Password</h2>
                            <p className="text-center mb-4">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
                            </form>
                            {message && (
                                <div className="alert alert-success mt-3" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
