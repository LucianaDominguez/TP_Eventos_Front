import React from 'react';

function ListadoEventos({ eventos, eliminarEventos }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center', marginLeft: '150px' }}>Administra los Eventos</h2>
        {eventos.map((evento, index) => (
          <Evento key={index} evento={evento} eliminarEventos={() => eliminarEventos(index)} />
        ))}
      </div>
    </>
  );
}

export default ListadoEventos;