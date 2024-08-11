import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Item({ auth }) {

    const location = useLocation();
    const product = location.state;
    const navigate = useNavigate();
    
    useEffect( () => {
        if(!auth){
            navigate('/')
        }
    }, []);

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
                  <div className="carousel-item active">
                    <img src="https://via.placeholder.com/600x400?text=Image+1" className="d-block w-100" alt="Image 1" />
                  </div>
                  <div className="carousel-item">
                    <img src="https://via.placeholder.com/600x400?text=Image+2" className="d-block w-100" alt="Image 2" />
                  </div>
                  <div className="carousel-item">
                    <img src="https://via.placeholder.com/600x400?text=Image+3" className="d-block w-100" alt="Image 3" />
                  </div>
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
                <h4>Price: ${product.price} </h4>
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
                {/* <button className="btn btn-secondary">Contact Agent</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
