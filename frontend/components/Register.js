import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setcPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        // Check if passwords match when password changes
        setPasswordsMatch(event.target.value === cPassword);
    };
    
    const handlecPasswordChange = (event) => {
        setcPassword(event.target.value);
        // Check if passwords match when confirm password changes
        setPasswordsMatch(event.target.value === password);
    };

    const handleSubmit = (Event) =>{
        Event.preventDefault();

        const userData = {
            fullname : fullname,
            email : email,
            password : password,
        };
    
        const apiUrl = 'http://localhost:8000/abc/register';
    
        axios.post(apiUrl, userData)
          .then((res) => {
            console.log(res);
            console.log(res.data);
    
            // Clear input fields after successful submission
            setFullname('');
            setEmail('');
            setPassword('');
    
            console.log('API Response:', res.data);
              
            // Assuming the email is directly under res.data
            const userEmail = res.data.email;
            console.log('login userEmail:',userEmail)
            // Save user email to localStorage
            localStorage.setItem('userEmail', userEmail);
          })
          .catch((err)=>{
            console.log(err);
          });
    };

  return (
    <div style={{ backgroundImage: `url(${require('../bg.jpg')})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <form className='text-center'>
            <h2>Register</h2>
            <div className="container my-3 text-center" style={{ border: '1px solid white', borderRadius: '10px', width: '40%', background: 'transparent', backdropFilter: 'blur(60px)' }}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your name"
                    value={fullname}
                    onChange={(event) => setFullname(event.target.value)}
                    />
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
                    <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm password</label>
                    <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword2"
                    placeholder="Confirm password"
                    value={cPassword}
                    onChange={handlecPasswordChange}
                    />
                </div>
                {/* Display a message if passwords don't match */}
                {!passwordsMatch && (
                    <p style={{ color: 'red' }}>Passwords do not match. Please try again.</p>
                )}
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Register</button>
                <br /><br />
            </div>
        </form>
        <br /><br /><br />
    </div>
  )
}

export default Register
