import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // muestra instancia de Axios

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/event')
      .then((response) => {
        console.log(response.data);
        setEvents(response.data.events);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h2>Eventos reales de la API</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;