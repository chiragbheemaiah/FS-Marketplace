import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Empty from '../assets/Empty.svg'

function Accounts({ auth, user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [action, setAction] = useState(location.state);

    const successAlert = (message) => (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{message}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
    const [products, setProducts] = useState([]);
    const handleDelete = async (deleteProductId) => {
        // TODO: Configure and show the modal for confirmation before proceeding
        try{
            const userConfirmed = window.confirm('Are you sure you want to delete product?');
            if (userConfirmed) {
                await axios.delete(`http://localhost:3002/products/${deleteProductId}`);
                const filteredProducts = products.filter((product) => product._id !== deleteProductId);
                setAction('DELETE');
                setProducts(filteredProducts);
            }
        }
        catch(err){
            console.error(err)
        }
    }
    
    useEffect(() => {
        if (!auth) {
            navigate('/');
        }
        const getProductsFromDatabaseForUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/products/${user}`);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        getProductsFromDatabaseForUser();
    }, [auth, navigate, user]);

    return (
        <>
            <div className="container p-3">
                { action === 'CREATE' && successAlert('Product listed successfully!') }
                { action === 'UPDATE' && successAlert('Product updated successfully!') }
                { action === 'DELETE' && successAlert('Product deleted successfully!') }

                <div className="container p-3 m-4 bg-light rounded-3">
                    <h1 className="display-5">My Listings</h1>
                </div>
                
                    <div className="row justify-content-center p-3">
                        <Link className="btn btn-outline-primary align-items-center justify-content-center" to={'/shopping/new'} state={user}>Create New Listing</Link>
                    </div>
                    { 
                            products.length === 0 ? 
                            (
                                <div className="col-12 d-flex flex-column align-items-center justify-content-center p-5" style={{ minHeight: '300px' }}>
                                    <img src={Empty} alt="Empty! Nothing Here" className="img-fluid mb-3" style={{ maxWidth: '300px' }} />
                                    <p className="h4 p-3">Wow, such empty!</p>
                                </div>
                            )
                            : 
                        <div className="row g-4 p-3">
                            {
                                products.map((product) => (
                                    <div className="col-12" key={product._id}>
                                        <div className="card h-100 d-flex flex-row w-100">
                                            {/* Image Column */}
                                            <div className="col-3 d-flex align-items-center justify-content-center">
                                                <img src={`images/${product.images[0]}`} className="card-img-left img-fluid" alt={product.title} />
                                            </div>
                                            {/* Details Column */}
                                            <div className="col-6">
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.title}</h5>
                                                    <p className="card-text">Price: {product.price}</p>
                                                </div>
                                            </div>
                                            {/* Buttons Column */}
                                            <div className="col-3 d-flex align-items-center justify-content-center flex-column p-3">
                                                <Link className="btn btn-outline-primary mb-2" style={{ width: "80%" }} to={`/shopping/${product._id}`} state={product}>View</Link>
                                                <Link className="btn btn-outline-dark mb-2" style={{ width: "80%" }} to={`/accounts/${product._id}`} state={product}>Update</Link>
                                                <button className="btn btn-outline-danger" style={{ width: "80%" }} onClick={ () => { handleDelete(product._id) } }>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    </div>
                {/* </div> */}
        </>
    );
}

export default Accounts;
