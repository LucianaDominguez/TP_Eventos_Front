import React from 'react';
import './Cita.css';

function Cita({ cita, eliminarCita }) {
  const { nombreMascota, nombreDueño, fecha, hora, sintomas } = cita;

  return (
    <div className="cita">
      <p><strong>Mascota:</strong> {nombreMascota}</p>
      <p><strong>Dueño:</strong> {nombreDueño}</p>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Síntomas:</strong> {sintomas}</p>
      <button onClick={eliminarCita} className="button eliminar">Eliminar ×</button>
    </div>
  );
}

export default Cita;