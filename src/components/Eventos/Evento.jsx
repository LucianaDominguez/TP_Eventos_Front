import React from 'react';
import './Evento.css';

function Evento({ evento, eliminarEventos }) {
  const { nombre, descripcion, categoria, fechaInicio, duracion, precio, habilitado, capacidad, creador } = evento;

  return (
    <div className="cita">
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Descripción:</strong> {descripcion}</p>
      <p><strong>Categoría:</strong> {categoria}</p>
      <p><strong>Fecha de Inicio:</strong> {fechaInicio}</p>
      <p><strong>Duración:</strong> {duracion}</p>
      <p><strong>Precio:</strong> {precio}</p>
      <p><strong>Capacidad:</strong> {capacidad}</p>
      <p><strong>Creador:</strong> {creador}</p>
      <p><strong>Habilitado para anotarse:</strong> {habilitado}</p>
      
      <button onClick={eliminarEventos} className="button eliminar">Eliminar ×</button>
    </div>
  );
}

export default Evento;