import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/User'
import { baseURL } from '../utils/baseUrl';
import ItemList from "../components/ItemList"
import axios from 'axios';

const ShoppingList = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios({
            method: "get",
            url: `${baseURL()}api/users/${userData.id}/items`,
        })
        .then(res => {
            const items = res.data;
            setUserData({ ...userData, items });
            calculateTotalPrice(items); // Calculate total price when items are fetched
        })
        .catch(err => console.log(err));
    }, [userData.id, setUserData]);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }

    return (
        <>
            <h3>Your shopping list</h3>
            <ItemList items={userData.items} />
            <p>Total: £{totalPrice.toFixed(2)}</p> {/* Display total price */}
        </>
    );
}

export default ShoppingList;