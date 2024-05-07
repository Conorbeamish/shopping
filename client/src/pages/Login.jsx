import React, {useState, useContext} from 'react';
import UserContext from '../contexts/User'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { setTokenHeader } from '../utils/apiCall';
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from '../utils/baseUrl';


const Login = ({loginType}) => {
    const navigate = useNavigate();
    const {userData, setUserData} = useContext(UserContext);

    const [userFormData, setUserFormData] = useState({
        username: "",
        password: ""
      })
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userFormData.password.length < 10) {
          alert("Password must be at least 10 characters long.");
          return; // Stop the submission if validation fails
        }
        axios({
          method: "post",
          url: `${baseURL()}api/auth/${loginType}`,
          data: userFormData
        })
        .then(res =>{
          setTokenHeader(res.data.token);
          localStorage.setItem("jwtToken", res.data.token);
          const userInfo = jwtDecode(res.data.token);
          setUserData(userInfo)
          navigate("/")
        })
        .catch(err => {
          alert(`An error occurred: ${err.response.status} - ${err.response.data.message}`);
          console.error(err);
        });
      }

    return(
        <div>
            <form onSubmit= {handleSubmit} className='authForm'>
                <h3 style={{textAlign:"center", marginTop:"0"}}>{loginType == "signup" ? "Sign up" : "Sign In"}</h3>
                <label>Username </label>
                <input 
                type="text" 
                name="username" 
                required
                value={userFormData.username}
                onChange={e => setUserFormData({...userFormData, username: e.target.value})}
                />
        
                <label>Password </label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    value={userFormData.password}
                    onChange={e => setUserFormData({...userFormData, password: e.target.value})}
                />
                <button type="submit">
                    {loginType == "signup" ? "Sign up" : "Sign In"}
                </button>
            </form>
        </div>

    )
}

export default Login