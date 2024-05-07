import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/User'
import { baseURL } from '../utils/baseUrl';
import ItemList from "../components/ItemList"
import axios from 'axios';
import ItemForm from '../components/ItemForm';

const ShoppingList = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [totalPrice, setTotalPrice] = useState(0);

    //Will trigger and update total price when items are added or removed
    useEffect(() => {
        const calculateTotalPrice = (items) => {
            // Handle case when items is undefined or null
            if (!items) return 0; 
            const total = items.reduce((acc, item) => acc + item.price, 0);
            setTotalPrice(total);
        }

        calculateTotalPrice(userData.items);
    }, [userData.items]);

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

    const deleteItem = (itemId) => {
        axios.delete(`${baseURL()}api/users/${userData.id}/items/${itemId}`)
            .then(res => {
                const updatedItems = userData.items.filter(item => item._id !== itemId);
                setUserData({ ...userData, items: updatedItems });
            })
            .catch(err => console.log(err));
    }

    const markComplete = (itemId) => {
        axios.put(`${baseURL()}api/users/${userData.id}/items/${itemId}`)
            .then(res => {
                const updatedItem = res.data;
                const updatedItems = userData.items.map(item =>
                    item._id === itemId ? updatedItem : item
                );
                setUserData({ ...userData, items: updatedItems });
            })
            .catch(err => console.log(err));
    }

    const addItem = (item) => {
        axios.post(`${baseURL()}api/users/${userData.id}/items`, item)
        .then(res => {
            const newItem = res.data;
            setUserData({ ...userData, items: [...userData.items, newItem] });
        })
        .catch(err => console.log(err));
    }

    return (
        <div class="shoppingContent">
            <h3>Your shopping list with a budget of £{userData.spendingLimit}</h3>
            <ItemList 
                deleteItem={deleteItem} 
                markComplete={markComplete} 
                items={userData.items} 
            />
            <p>Total: £{totalPrice.toFixed(2)}</p> 
            {totalPrice > userData.spendingLimit ? 
                <p style={{ 
                    color: 'red', 
                    fontSize: '1.5rem'
                }}>
                    You have exceeded your budget by  <strong>£{Math.abs(userData.spendingLimit - totalPrice).toFixed(2)}</strong>
                </p> 
                : 
            ""}
            <ItemForm
                addItem={addItem}
            />
        </div>
    );
}

export default ShoppingList;