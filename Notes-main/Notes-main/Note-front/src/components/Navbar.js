import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    let navigate = useNavigate();
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const logginout=()=>{
        if(localStorage.getItem("requiredId")){
            localStorage.removeItem("requiredId");
        }
        else{
            navigate("/Login");
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">about</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""}`} to="/addnote">addNote</Link>
                        </li>
                    </ul>

                    {!(localStorage.getItem("requiredId") || localStorage.removeItem("siginId")) ? <>
                        <Link className="nav-auth-link" id="signin" to="/Signin">SIGN IN</Link>
                        <Link className="nav-auth-link" id="login" to="/Login">LOG IN</Link>
                    </> : <button type="button" onClick={logginout} className='btn btn-dark'>LOG OUT</button>}
                </div>
            </div>
        </nav>
    )
}
export default Navbar

