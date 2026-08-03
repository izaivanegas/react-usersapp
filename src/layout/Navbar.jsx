import {Link, NavLink} from "react-router-dom";

export const Navbar = ({handleLogout, login}) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Users App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users" >Usuarios</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <span className="nav-item nav-link text-primary mx-3">
                            { login.user?.username }
                        </span>
                        <button className="btn btn-outline-success"
                         onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};