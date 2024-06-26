import React, { createContext, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css'
import MaterialList from './components/MaterialList';
import MaterialDetail from './components/MaterialDetail';
import MaterialForm from './components/MaterialForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact element={<MaterialList />} />
        <Route path="/materials" exact element={<MaterialList />} />
        <Route path="/materials/:id" element={<MaterialDetail />} />
        <Route path="/add-material" element={<MaterialForm />} />

      </Routes>

    </>
  )
}

export default App
