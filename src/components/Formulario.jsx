import React, { useState } from 'react';
import './Form.css';
import Button from './Button';


function Formulario({ setEventos, eventos }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaInicio, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [precio, setPrecio] = useState('');
  const [habilitado, setHabilitado] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [creador, setCreador] = useState('');



  const agregarEvento = (event) => {
    event.preventDefault();

    const nuevoEvento = {
        nombre, descripcion, categoria, fechaInicio, duracion, precio, habilitado, capacidad, creador
    };

    const nuevosEventos = [...eventos, nuevoEvento];
    setEventos(nuevosEventos);

    setNombre('');
    setDescripcion('');
    setCategoria('');
    setFecha('');
    setDuracion('');
    setPrecio('');
    setHabilitado('');
    setCapacidad('');
    setCreador('');
  };

  return (
    <div className="one-half column">
      <h2>Crear Evento</h2>
      <form>
        <label>Nombre</label>
        <input type="text" value={nombre} className="mascot" placeholder="Nombre Evento" id="nombre" onChange={ev => setNombre(ev.target.value)} />

        <label>Descripcion</label>
        <input type="text" value={descripcion} className="u-full-width" placeholder="Descripcion del Evento" id="descripcion" onChange={ev => setDescripcion(ev.target.value)} />

        <label>Categoria</label>
        {/* onChange={ev => setDescripcion(ev.target.value)} /> CAMBIAR A MENU OPCIONES */}

        <label>Fecha</label>
        <input type="date" value={fechaInicio} className="u-full-width" id="date" onChange={ev => setFecha(ev.target.value)} />

        <label>Duracion</label>
        <input type="number" value={duracion} className="u-full-width" id="time" onChange={ev => setDuracion(ev.target.value)} />

        <label>Precio</label>
        <input type="number" value={precio} className="u-full-width" id="precio" onChange={ev => setPrecio(ev.target.value)} />

        <label>¿Está habilitado para anotarse?</label>
        <input type="checkbox" checked={habilitado} onChange={ev => setHabilitado(ev.target.checked)} />

        <label>Capacidad</label>
        <input type="number" value={capacidad} className="u-full-width" id="capacidad" onChange={ev => setCapacidad(ev.target.value)} />

        <Button onClick={agregarEvento} />
      </form>
    </div>
  );
}

export default Formulario;