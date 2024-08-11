import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut({ auth, setAuth }) {
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(false);
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        // Cleanup timer if component unmounts before redirect
        return () => clearTimeout(timer);
    }, [navigate, setAuth]);

    return (
        <div className="container d-flex flex-column justify-content-center">
            <div className="alert alert-info text-center mt-5" role="alert">
                <h4 className="alert-heading">Signed Out Successfully!</h4>
                <p>You have successfully signed out. Redirecting you back to the homepage...</p>
            </div>
        </div>
    );
}

export default SignOut;