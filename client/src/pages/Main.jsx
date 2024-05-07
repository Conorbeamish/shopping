
import { Link } from 'react-router-dom';
import UserContext from '../contexts/User'
import React, { useContext } from 'react'

const Main = () => {
  const {userData, setUserData} = useContext(UserContext);

    return (
      <>
        <h2>Welcome to your shopping list</h2>
        {userData?.username ? 
                <div>
                    <Link to={`/user/${userData.id}/shopping`}>
                      Get Started
                    </Link>
                </div>
                :
                <div>
                    <Link to={"/signup"}>Sign up </Link> to get started
                </div>
            }
      </>
    );
  }
   
  export default Main;