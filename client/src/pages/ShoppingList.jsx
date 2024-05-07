import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/User'
import { baseURL } from '../utils/baseUrl';
import ItemList from "../components/ItemList"
import axios from 'axios';

const ShoppingList = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            axios.get(`${baseURL()}api/users/${userData.id}/items`)
                .then(resItems => {
                    const items = resItems.data;
                    setUserData({ ...userData, items });
                    calculateTotalPrice(items); 
                    
                    // Fetch spending limit 
                    if (!userData.spendingLimit) {
                        axios.get(`${baseURL()}api/users/${userData.id}/items/spendingLimit`)
                            .then(res => {
                                const spendingLimit = res.data.spendingLimit;
                                if(spendingLimit){setUserData({ ...userData, spendingLimit })}
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        };
    
        fetchData();
    
    }, [userData.id, userData.spendingLimit, setUserData]);

    

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }

    return (
        <>
            <h3>Your shopping list with a budget of £{userData.spendingLimit}</h3>
            <ItemList items={userData.items} />
            <p>Total: £{totalPrice.toFixed(2)}</p> 
            {totalPrice > userData.spendingLimit ? 
                <p style={{ color: 'red' }}>You have exceeded your budget by  £{Math.abs(userData.spendingLimit - totalPrice).toFixed(2)}</p> 
                : 
            ""}
        </>
    );
}

export default ShoppingList;