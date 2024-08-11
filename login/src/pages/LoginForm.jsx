import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function LoginForm({setAuth, setUser}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Username', username);
        // console.log('Password', password);
        const user = { username, password };
        
        try {
            const response = await axios.post('http://localhost:3001/login', user);
            if (response.status === 200) {
                const username = response.data[0].username;
                setAuth(true);
                setUser(username)
                navigate('/shopping');
            } else {
                setAuth(false);
                setShowAlert(false);
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            setAuth(false);
            setShowAlert(false);
            setUsername('');
            setPassword('');
        }
    };

    const renderAlert = (
        <div className="alert alert-danger" role="alert">
            Invalid username or password.
        </div>
    );

    return (
        <div className="container p-2">
            {!showAlert && renderAlert}
            <div className="container p-5 mb-4 bg-light rounded-3">
                <h1 className="display-5">Login</h1>
                <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-start w-100">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="John Doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <Link className="btn btn-outline-dark w-40 mt-4" to='/registration'>New? Register Here!</Link>
            </div>
        </div>
    );
}

export default LoginForm;
