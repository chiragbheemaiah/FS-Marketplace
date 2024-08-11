import { Link } from "react-router-dom";

function Navbar({ auth, user }) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">FS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Left side items */}
                        {
                            auth &&
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/shopping">Explore</Link>
                            </li>
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* Right side items */}
                        {
                            auth &&
                            <li className="nav-item">
                                <p className="nav-link mb-0">Welcome, {user}!</p>
                            </li>
                        }
                        {
                            auth &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/accounts">Manage Listings</Link>
                            </li>
                        }
                        {
                            auth &&
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/signout">Sign Out</Link>
                            </li>
                        }
                        {
                            !auth &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
