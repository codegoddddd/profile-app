import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { isLoggedIn } = useAuth(); // Use the isLoggedIn state from the context

    const navigate = useNavigate();

    const handleLoginClick = (event) => {
      
      event.preventDefault();
      console.log('Before navigate');
      navigate('/Login');   // Navigate to Login page
      console.log('After navigate');
      console.log('isLoggedIn:', isLoggedIn);
    };

  return (
    <div >
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundImage: `url(${require('../bg.jpg')})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">Link</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button> */}

                    {isLoggedIn ? (
                    // If user is logged in, show Profile link
                    <Link to="/Profile" className="nav-link">
                        <button type="button" className="btn btn-primary mx-2">
                        Profile
                        </button>
                    </Link>
                    ) : (
                        // If user is not logged in, show Register and Login links
                    <>
                        <Link className='btn btn-primary mx-2' to="/Register">
                            Register
                        </Link>
                        {/* <Link className='btn btn-primary mx-2' to="/Login">
                            Login
                        </Link> */}
                        <a href="/Login" className="nav-link" onClick={handleLoginClick}>
                            <button type="button" className="btn btn-primary mx-2">
                            Login
                            </button>
                        </a>
                    </>
                    )}
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
