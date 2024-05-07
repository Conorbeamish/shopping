import {Navigate} from 'react-router-dom'

//Checks to see if a user has signed in, if there is a username they will be authed otherwise redirect
const RequireAuth = ({children, userData}) => {

  return ( 
    userData?.username ? children : <Navigate to="/" replace />
  );
}
 
export default RequireAuth;