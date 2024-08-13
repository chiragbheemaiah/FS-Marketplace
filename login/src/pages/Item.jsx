import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Item({ auth }) {

    const location = useLocation();
    const product = location.state;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!auth) {
            navigate('/');
        }
    }, [auth, navigate]);

    if (!product) {
        return <div>Loading...</div>; // Handle cases where product might not be available
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">{product.title}</h1>
                </div>
                <div className="card-body">
                    <div className="row p-5">
                        {/* Carousel for Images */}
                        <div className="col-md-6">
                            <div id="productCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {product.images.map((image_path, idx) => {
                                        const activeClass = idx === 0 ? 'carousel-item active' : 'carousel-item';
                                        return (
                                            <div className={activeClass} key={idx}>
                                              <img
                                                src={`/images/${image_path}`}
                                                alt="Description"
                                                style={{ maxWidth: '500px', width: '100%' }}
                                              />
                                            </div>
                                        );
                                    })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="col-md-6">
                            <div className="mb-4">
                                <h4>Description</h4>
                                <p>{product.description}</p>
                            </div>
                            <div className="mb-4">
                                <h4>Price: ${product.price}</h4>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <h4>Contact</h4>
                                    <p>{product.contact}</p>
                                </div>
                                <div className="col-md-6">
                                    <h4>Posted by:</h4>
                                    <p>{product.user}</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <button className="btn btn-outline-primary me-2">Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
