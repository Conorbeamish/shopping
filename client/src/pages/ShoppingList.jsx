import React, { useContext, useEffect } from 'react';
import UserContext from '../contexts/User'
import { baseURL } from '../utils/baseUrl';
import ItemList from "../components/ItemList"
import axios from 'axios';

const ShoppingList = () => {
    const {userData, setUserData} = useContext(UserContext);
    
    useEffect(() => {
        axios({
            method: "get",
            url: `${baseURL()}api/users/${userData.id}/items`,
          }).then(res =>{
            const items = res.data
            setUserData({...userData, items })
          })
          .catch(err => console.log(err))
      }, [ ])
      
    return (
        <>
            <h3>Your shopping list</h3>
            <ItemList items={userData.items}/>
        </>
    )
}

export default ShoppingList