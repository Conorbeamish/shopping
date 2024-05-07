import React, { useState } from 'react';

const ItemForm = ({ addItem }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const validateForm = () => {
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.price.trim()) {
            errors.price = "Price is required";
        } else if (isNaN(formData.price)) {
            errors.price = "Price must be a number";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addItem(formData);
            setFormData({ name: "", price: "" });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                />
                {formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
            </div>
            <div>
                <label>Price:</label>
                <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    required 
                />
                {formErrors.price && <span style={{ color: 'red' }}>{formErrors.price}</span>}
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
}

export default ItemForm;