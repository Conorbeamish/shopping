import React from 'react';

const ItemList = ({ items }) => {
    return (
        <>
            {items && items.length > 0 && (
                <ul>
                    {items.map(item => (
                        <li key={item._id} style={{ textDecoration: item.isComplete ? 'line-through' : 'none' }}>
                            <strong>{item.name}</strong>: £{item.price}
                        </li>
                    ))}
                </ul>
            )}
            {(!items || items.length === 0) && (
                <p>No items to display</p>
            )}
        </>
    );
}

export default ItemList;