import './App.css'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import {UserProvider} from "./contexts/User";
import { BrowserRouter as Router} from "react-router-dom";
import { setTokenHeader } from "./utils/apiCall";
import {  Routes, Route,} from "react-router-dom";
import RequireAuth from "./components/RequireAuth.jsx";
import Login from "./pages/Login.jsx"
import ShoppingList from "./pages/ShoppingList.jsx"
import Main from "./pages/Main.jsx"
import { baseURL } from './utils/baseUrl.js';
import Header from './components/Header.jsx';

function App() {

  const [userData, setUserData] = useState();
  //Rehydrate user on page load 
  useEffect(() => {
    if(localStorage.jwtToken){
      setTokenHeader(localStorage.jwtToken);
      const fetchData = () => {
        const userInfo = jwtDecode(localStorage.jwtToken)
        setUserData(userInfo)
      }
      fetchData();
    }
  }, [ ])
  
  return (
    //Context for current user
    <UserProvider value={{userData, setUserData}}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login loginType={"signin"} />} />
          <Route path="/signup" element={<Login loginType={"signup"} />} />
          
          <Route path="/user/:id/shopping" element={
            <RequireAuth userData={userData}>
              <ShoppingList/>
            </RequireAuth>
          } />

        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
