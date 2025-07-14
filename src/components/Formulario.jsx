import React, { useState } from 'react';
import './Form.css';
import Button from './Button';

function Formulario({ setCitas, citas }) {
  const [nombreMascota, setNombre] = useState('');
  const [nombreDueño, setDueño] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const agregarCita = (event) => {
    event.preventDefault();

    const nuevaCita = {
      nombreMascota,
      nombreDueño,
      fecha,
      hora,
      sintomas,
    };

    const nuevasCitas = [...citas, nuevaCita];
    setCitas(nuevasCitas);

    setNombre('');
    setDueño('');
    setFecha('');
    setHora('');
    setSintomas('');
  };

  return (
    <div className="one-half column">
      <h2>Crear mi Cita</h2>
      <form>
        <label>Nombre Mascota</label>
        <input type="text" value={nombreMascota} className="mascot" placeholder="Nombre Mascota" id="nombre" onChange={ev => setNombre(ev.target.value)} />

        <label>Nombre Dueño</label>
        <input type="text" value={nombreDueño} className="u-full-width" placeholder="Nombre dueño de la mascota" id="dueño" onChange={ev => setDueño(ev.target.value)} />

        <label>Fecha</label>
        <input type="date" value={fecha} className="u-full-width" id="date" onChange={ev => setFecha(ev.target.value)} />

        <label>Hora</label>
        <input type="time" value={hora} className="u-full-width" id="time" onChange={ev => setHora(ev.target.value)} />

        <label>Sintomas</label>
        <textarea value={sintomas} className="u-full-width" id="sintomas" onChange={ev => setSintomas(ev.target.value)}></textarea>

        <Button onClick={agregarCita} />
      </form>
    </div>
  );
}

export default Formulario;