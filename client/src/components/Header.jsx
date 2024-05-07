import UserContext from '../contexts/User'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const {userData, setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    return (  
        <nav>
            <Link to={"/"}  >  
                <h1>Shopping List</h1>
            </Link> 
            {userData?.username ? 
                <div>
                    <Link to={"/"} onClick={()=> {
                    logout(setUserData);
                    navigate("/");
                    }}>
                    Logout {userData?.username}
                    </Link>
                </div>
                :
                <div>
                    <Link to={"/signup"}>Sign up </Link>
                    <Link to={"/signin"}>Sign In </Link>
                </div>
            }
        </nav>
       
    );
  }
   

export default Header