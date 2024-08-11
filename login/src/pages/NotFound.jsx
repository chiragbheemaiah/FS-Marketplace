import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundImage from '../assets/404.svg';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/shopping');
        }, 3000);
    }, [navigate]);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
                <img src={NotFoundImage} alt="404 Not Found" className="img-fluid mb-4" style={{ maxWidth: '500px' }} />
                <h1 className="display-1">404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <p className="lead">Sorry, the page you are looking for does not exist. You will be redirected shortly.</p>
            </div>
        </div>
    );
}

export default NotFound;
