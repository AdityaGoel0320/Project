import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { backendUrl } from '../assets/FrontendUtils';

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/materials`)
      .then(response => setMaterials(response.data))
      .catch(error => console.error('Error fetching materials:', error));
  }, []);

  return (
    <>
    <div className='flex items-center justify-center'>

      <h1 className='text-3xl text-center font-bold m-12'>Materials</h1>

      <div className='flex items-center justify-center font-bold m-12'>
        <p className='gap-2'>Want to add more?</p>
        <NavLink to="/add-material">
          <button className='bg-yellow-500 border-2 border-black p-2 rounded-xl gap-4 '>Click me</button>
        </NavLink>
      </div>

    </div>
      <div className='flex items-center justify-center gap-4 flex-wrap'>
        {materials.map(material => (
          <Link key={material._id} to={`/materials/${material._id}`}>
            <div className='h-72 w-72 text-center border-4 p-4 flex flex-col items-center justify-center rounded-xl border-black'>
              <h2 className='text-xl uppercase font-bold  underline'>{material.name}</h2>
              <p><strong>Technology:</strong> {material.technology}</p>
              <p><strong>Colors:</strong> {material.colors.join(', ')}</p>
              <p><strong>Price per Gram:</strong> ${material.pricePerGram}</p>
              <p><strong>Application Types:</strong> {material.applicationTypes.join(', ')}</p>
              <img src={`${backendUrl}${material.imageUrl}`} alt="Empty image" className='h-24 w-24 border-4 border-black' />
            </div>
          </Link>
        ))}
      </div>

      
    </>
  );
};

export default MaterialList;
