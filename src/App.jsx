import React from 'react';
import ListadoEventos from './components/Eventos/ListadoEventos';
import './App.css';
import EventList from './components/Eventos/Events';

function App() {
  return (
    <div className="container">
      <h1>Administrador de Eventos</h1>
      <div className="row">
        <EventList/>
      </div>
    </div>
  );
}

export default App;