import React, { useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Update() {

  const {userEmail} = useParams();
  console.log("User email: ", userEmail);

  const [userData, setUserData] = useState({
    fullname : '',
    password : '',
    mobile : 91,
    gender : '',
    address : '',
    birthdate : '',
    education : '',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Logic for setting user profile field values to default DB values
  useEffect(() => {
    // Fetch user data based on userEmail
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/abc/findone/${userEmail}`);
        const user = response.data.data;

        setUserData({
          fullname: user.fullname || '',
          password: user.password || '',
          mobile: user.mobile || 91,
          gender: user.gender || '',
          address: user.address || '',
          birthdate: user.birthdate || '',
          education: user.education || '',
        });

        setEmail(user.email || '');
      } catch (err) {
        console.error('Error fetching user data:', err.response);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleUpdateProfile = async(Event) =>{
    Event.preventDefault();

    try{
      const updatedData = {
        ...userData,
        email : email,
        password : password,
      };

      const response = await axios.put(`http://localhost:8000/abc/update/${userEmail}`, updatedData);

      console.log(response.data);

      window.alert("User updated successfully")
    }
    catch(err){
      console.error('Error updating user:', err.response);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className='text-center' style={{backgroundImage : `url(${require('../bg.jpg')})`,backgroundSize : "cover",backgroundAttachment: "fixed"}}>
      <h2>Update your info</h2>
      <form className='text-center mx-auto' style={{width:"50%"}}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="fullname">Name:</label>
              <input
                className="form-control"
                type="text"
                id="fullname"
                name="fullname"
                value={userData.fullname}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password:</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="mobile">Mobile No:</label>
              <input
                className="form-control"
                type="number"
                id="mobile"
                name="mobile"
                value={userData.mobile}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Gender:</label>
              <input
                className="form-control"
                type="text"
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            

            <div className="mb-3">
              <label className="form-label" htmlFor="birthdate">Birth Date:</label>
              <input
                className="form-control"
                type="date"
                id="birthdate"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="education">Education:</label>
              <input
                className="form-control"
                type="text"
                id="education"
                name="education"
                value={userData.education}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="address">Address:</label>
              <textarea
                className="form-control"
                type="text"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                rows={2}  // Set the number of visible rows
              />
            </div>
          </div>
        </div>

        <button className="btn btn-success my-2" type="submit" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
      <br /><br />
    </div>
  )
}

export default Update
