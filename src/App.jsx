import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoEventos from './components/Eventos/ListadoEventos';
import './App.css';

function App() {
  const [eventos, setEventos] = useState(() => {
    try {
      const eventosGuardados = localStorage.getItem('eventos');
      const parsed = JSON.parse(eventosGuardados);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error al cargar eventos desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(eventos));
  }, [eventos]);

  const eliminarEventos = (index) => {
    const nuevosEventos = [...eventos];
    nuevosEventos.splice(index, 1);
    setEventos(nuevosEventos);
  };

  return (
    <div className="container">
      <h1>Administrador de Eventos</h1>
      <div className="row">
        <Formulario setEventos={setEventos} eventos={eventos} />
        <ListadoEventos eventos={eventos} eliminarEventos={eliminarEventos} />
      </div>
    </div>
  );
}

export default App;