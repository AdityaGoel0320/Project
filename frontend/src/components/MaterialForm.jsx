import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../assets/FrontendUtils';

const MaterialForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        technology: '',
        colors: '',
        pricePerGram: '',
        applicationTypes: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        axios.post(`${backendUrl}/api/materials`, data)
            .then(response => {
                console.log('Material added:', response.data);
                window.alert('Material added successfully!');
                // You can reset the form if needed
                setFormData({
                    name: '',
                    technology: '',
                    colors: '',
                    pricePerGram: '',
                    applicationTypes: '',
                    image: null,
                });
            })
            .catch(error => console.error('Error adding material:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="m-24 max-w-md mx-auto p-6 bg-white rounded shadow-xl">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" name="technology" placeholder="Technology" value={formData.technology} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" name="colors" placeholder="Colors (comma-separated)" value={formData.colors} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="number" name="pricePerGram" placeholder="Price per gram" value={formData.pricePerGram} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" name="applicationTypes" placeholder="Application types (comma-separated)" value={formData.applicationTypes} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="file" name="image" onChange={handleFileChange} className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <button type="submit" className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Material</button>
        </form>
    );
}

export default MaterialForm;
