import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Empty from '../assets/Empty.svg'


function Shopping({auth}){
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect( () => {
        if(!auth){
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
      
        getProductsFromDatabase();

    }, [auth, navigate]);

    // TODO: If Back pressed auth needs to false
    return (
        <>
            <div className="container p-3">
                <div className="container p-3 m-4 bg-light rounded-3">
                    <h1 className="display-5">Welcome to FS!</h1>
                </div>
                {/* TODO: Complete the Search Functionality. */}
                {/* TODO: Add filters for categories */}
                {/* TODO: Add image if no products to show */}
                <div className="row justify-content-center p-3">
                    <div className="col-12 col-md-6">
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
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
                        (       
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
                            {
                                products.map((product) => (
                                <div className="col" key={product._id}>
                                    <div className="card h-100">
                                        <img src={`images/${product.images[0]}`} class="card-img-top" alt="Product Image" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text">Contact: {product.contact}</p>
                                            <p className="card-text">Price: {product.price}</p>
                                            <p className="card-text">Posted By: {product.user}</p>
                                            <Link className="btn btn-outline-primary" to={`/shopping/${product._id}`} state={ product }>View</Link>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                            </div>
                        )
                    }
            </div>    
        </>

    )
}
export default Shopping;