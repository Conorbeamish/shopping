import React from 'react';

const ItemList = ({ items, deleteItem, markComplete }) => {
    return (
        <>
            {items && items.length > 0 ? (
                <ul>
                    {items.map(item => (
                        <li key={item._id} style={{ textDecoration: item.isComplete ? 'line-through' : 'none' }}>
                            <strong>{item.name}</strong>: £{item.price.toFixed(2)}
                            <button 
                                onClick={() => deleteItem(item._id)} 
                                style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => markComplete(item._id)} 
                                style={{ 
                                    backgroundColor: item.isComplete ? 'grey' : 'green', 
                                    color: 'white', 
                                    marginLeft: '10px' 
                                }}
                            >
                                {item.isComplete ? 'Undo' : 'Mark Complete'}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items to display</p>
            )}
        </>
    );
}

export default ItemList;