import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({auth, setAuth, user}){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if(!auth){
            navigate('/')
        }
        const getUserFromDatabase = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${user}`);
                const existingUser = response.data
                console.log(existingUser);
                setUserDetails(existingUser);
                setName(existingUser.name);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        getUserFromDatabase();
    }, [auth]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { name, password };
        
        try {
            const response = await axios.put(`http://localhost:3001/users/${user}`, updatedUser);
            
            if (response.status === 200) {
                navigate('/');
            } 
            else {
                // setErrors({ general: 'An error occurred, please try again.' });
                // setUsername('');
                setPassword('');
                setName('');
                // setEmail('');
            }
        } catch (error) {
            // setUsername('');
            setPassword('');
            setName('');
            // setEmail('');
        }  
    };
    const handleDelete = async () => {
        
        try{
            const deleteConfirm = window.confirm('Are you sure you want to delete your acccount?');
            if (deleteConfirm) {
                const response = await axios.delete(`http://localhost:3001/users/${user}`)
                if (response.status === 200) {
                    setAuth(false);
                    navigate('/');
                } 
            }
        }catch(err){
            console.err('Error deleting user', err);
        }

    }
    return (
        <div className="container p-3">
            <div className="container p-5 mb-4 bg-light rounded-3">
                <h1 className="display-5">Update Details</h1>
                <form onSubmit={ handleSubmit } className="mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-start w-100">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            // autocomplete="off"
                        />
                        {/* {errors.name && <div className="text-danger">{errors.name}</div>} */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-start w-100">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            disabled
                            value={userDetails.email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-start w-100">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={userDetails.username}
                            disabled
                        />
                        {/* {errors.username && <div className="text-danger">{errors.username}</div>} */}
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
                            minLength="7"
                            autocomplete="new-password"
                            required
                        />
                        {/* {errors.password && <div className="text-danger">{errors.password}</div>} */}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Update</button>
                    <button className="btn btn-outline-danger w-100 mt-5" onClick={handleDelete}>Delete Account</button>

                    {/* {errors.general && <div className="text-danger mt-3">{errors.general}</div>} */}
                </form>
            </div>
        </div>
    )
}
export default Profile;