import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
// import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const { isLoggedIn, login } = useAuth(); // Use the isLoggedIn state and login function from the context
  const navigate = useNavigate();   // Use useNavigate to get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const apiUrl = 'http://localhost:8000/abc/login';

    axios.post(apiUrl, userData)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        // Show success alert
        setAlertMessage({ type: 'success', message: 'Login successful' });

        // Clear input fields after successful submission
        setEmail('');
        setPassword('');

        if (res.data.msg === 'Login successful') {
          // Save user email to localStorage
          localStorage.setItem('userEmail', email);
          
          // Set the user as logged in
          login();
          
          // Redirect to Home page
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred during login');
      });
  };

  // if (isLoggedIn) {
  //   return <Navigate to="/Profile" />;
  // }


  return (
    <div style={{ backgroundImage: `url(${require('../bg.jpg')})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <br />
        <form className='text-center'>
            <h2>Login</h2>
            <div className="container my-3 text-center" style={{ border: '1px solid white', borderRadius: '10px', width: '40%', background: 'transparent', backdropFilter: 'blur(60px)' }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="Enter your email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="exampleInputPassword1"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <br />
                {alertMessage && (
                  <div className={`alert alert-${alertMessage.type} mt-3`} role="alert">
                    {alertMessage.message}
                  </div>
                )}
                <br />
            </div>
        </form>
        <br /><br /><br /><br /><br />
    </div>
  )
}

export default Login
