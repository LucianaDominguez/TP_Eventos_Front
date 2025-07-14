import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoCitas from './components/Citas/ListadoCitas';
import './App.css';

function App() {
  const [citas, setCitas] = useState(() => {
    try {
      const citasGuardadas = localStorage.getItem('citas');
      const parsed = JSON.parse(citasGuardadas);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error al cargar citas desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas]);

  const eliminarCita = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    setCitas(nuevasCitas);
  };

  return (
    <div className="container">
      <h1>Administrador de Pacientes</h1>
      <div className="row">
        <Formulario setCitas={setCitas} citas={citas} />
        <ListadoCitas citas={citas} eliminarCita={eliminarCita} />
      </div>
    </div>
  );
}

export default App;