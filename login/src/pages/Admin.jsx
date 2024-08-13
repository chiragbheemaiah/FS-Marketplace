import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Empty from '../assets/Empty.svg';

function Admin({ auth, admin }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('products'); // State to toggle between products and users
    const [action, setAction] = useState(false);
    useEffect(() => {
        if (!auth && !admin) {
            navigate('/');
        }

        const getProductsFromDatabase = async () => {
            try {
                const response = await axios.get('http://localhost:3002/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        const getUsersFromDatabase = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        getProductsFromDatabase();
        getUsersFromDatabase();
    }, [auth, navigate, admin]);

    const handleDelete = async (id, type) => {
        // Logic for deleting a user or product
        console.log(`Deleting ${type} with ID:`, id);
        if(type === 'product'){
            try{
                const userConfirmed = window.confirm('Are you sure you want to delete product?');
                if (userConfirmed) {
                    await axios.delete(`http://localhost:3002/products/${id}`);
                    const filteredProducts = products.filter((product) => product._id !== id);
                    setAction(true);
                    setProducts(filteredProducts);
                }
            }catch(err){
                console.error('Error deleting product', err)
            }
        }else{
            try{
                const userConfirmed = window.confirm('Are you sure you want to delete user?');
                if (userConfirmed) {
                    await axios.delete(`http://localhost:3001/users/${id}`);
                    const filteredUsers = users.filter((user) => user.username !== id);
                    setAction(true);
                    setUsers(filteredUsers);
                }
            }catch(err){
                console.error('Error deleting product', err)
            }
        }
    };

    return (
        <div className="container mt-5">
            { action && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Deletion Successful</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> }
            <h1 className="display-5">Admin Console</h1>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                </li>
            </ul>

            <div>
                {activeTab === 'products' ? (
                    products.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>{product.contact}</td>
                                        <td>${product.price}</td>
                                        <td>
                                            <Link to={`/shopping/${product._id}`} className="btn btn-primary btn-sm me-2" state={product}>
                                                View
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(product._id, 'product')}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <img src={Empty} alt="No products available" className="img-fluid" />
                            <p>No products available.</p>
                        </div>
                    )
                ) : users.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.username}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(user.username, 'user')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <img src={Empty} alt="No users available" className="img-fluid" />
                        <p>No users available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
