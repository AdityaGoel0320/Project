import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../assets/FrontendUtils';

const MaterialDetail = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/api/materials/${id}`)
      .then(response => setMaterial(response.data))
      .catch(error => console.error('Error fetching material:', error));
  }, [id]);

  if (!material) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{material.name}</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-700 mb-2">Technology: {material.technology}</p>
        <p className="text-gray-700 mb-2">Colors: {material.colors.join(', ')}</p>
        <p className="text-gray-700 mb-2">Price per gram: ${material.pricePerGram.toFixed(2)}</p>
        <p className="text-gray-700 mb-4">Application types: {material.applicationTypes.join(', ')}</p>
        <img src={`${backendUrl}${material.imageUrl}`} alt="Empty Image" /></div>
    </div>
  );
}

export default MaterialDetail;
