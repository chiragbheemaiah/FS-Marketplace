import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm({auth}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect( () => {
        if(auth){
            navigate('/shopping')
        }
    }, [auth, navigate]);

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[\w-]+@ncsu\.edu$/;
        
        if (!name.trim()) {
            errors.name = "Name is required.";
        }
        if (!username.trim()) {
            errors.username = "Username is required.";
        }
        if (!emailRegex.test(email)) {
            errors.email = "Email must end with @ncsu.edu";
        }
        if (password.length <= 6) {
            errors.password = "Password must be more than 6 characters.";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const user = { name, email, username, password };
        
        try {
            const response = await axios.post('http://localhost:3001/users/registration', user);
            
            if (response.status === 200) {
                navigate('/');
            } 
            else {
                setErrors({ general: 'An error occurred, please try again.' });
                setUsername('');
                setPassword('');
                setName('');
                setEmail('');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrors({ username: 'Username is already taken, please try again!' });
            } else {
                setErrors({ general: 'An error occurred, please try again.' });
            }
            setUsername('');
            setPassword('');
            setName('');
            setEmail('');
        }
    };

    return (
        <div className="container p-3">
            <div className="container p-5 mb-4 bg-light rounded-3">
                <h1 className="display-5">Registration</h1>
                <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-start w-100">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-start w-100">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-start w-100">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-start w-100">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                    {errors.general && <div className="text-danger mt-3">{errors.general}</div>}
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm;
