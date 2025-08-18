import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationCard from './LocationCard';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from "react-router-dom";
import { Riple } from 'react-loading-indicators';


const defaultFilters = {
  id: '',
  date: '',
  tag: '',
  name: ''
};


const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const navigate = useNavigate();


  useEffect(() => {
    const getLocations = async () => {
      try {
        const url = new URL(`${API_BASE_URL}/api/event-locations`);
        let response = await axios.get(url.toString(), {
          responseType: 'json',
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": 1
          }
        });
        setLocations(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Err:', error);
      } finally {
        setLoading(false);
      }
    };
    getLocations();
  }, []);


  // Filtrado compuesto (puedes agregar filtros sobre los campos nuevos si quieres)
  const filteredLocations = locations.filter(location => {
    if (filters.id && !String(location.id).toLowerCase().includes(filters.id.toLowerCase())) return false;
    if (filters.name && !String(location.name || '').toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.tag && !String(location.tag || '').toLowerCase().includes(filters.tag.toLowerCase())) return false;
    if (filters.date && !String(location.date || '').toLowerCase().includes(filters.date.toLowerCase())) return false;
    return true;
  });


  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };


  const handleReset = () => {
    setFilters(defaultFilters);
  };


  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
    }}>
      <Riple color="#3668cf" size="large" text="" textColor="" />
    </div>
  );
 
  return (
    <div style={{
      width: '100%',
      margin: '0 auto',
      padding: '32px 16px',
      minHeight: '100vh',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
      }}>
        <div style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          borderRadius: 14,
          padding: '14px 18px',
          boxShadow: '0 2px 12px rgba(60,72,88,0.10)',
          marginBottom: 18,
          marginLeft: 165,
        }}>
          <span style={{
          fontWeight: 800,
          fontSize: '1.5rem',
          color: '#3668cf',
          }
        }
        onClick={() => navigate(`/events`)}>Clevent</span>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={filters.id}
            onChange={handleFilterChange}
            style={{
              padding: '4px 4px',
              borderRadius: 7,
              border: '1px solid #b0b8c1',
              fontSize: '0.9rem',
              background: '#f5f7fa',
              transition: 'border .2s',
              outline: 'none'
            }}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={filters.date}
            onChange={handleFilterChange}
            style={{
              padding: '4px 4px',
              borderRadius: 7,
              border: '1px solid #b0b8c1',
              fontSize: '0.9rem',
              background: '#f5f7fa',
              transition: 'border .2s',
              outline: 'none',
              color: '#b0b8c1'
            }}
          />
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            value={filters.tag}
            onChange={handleFilterChange}
            style={{
              padding: '4px 4px',
              borderRadius: 7,
              border: '1px solid #b0b8c1',
              fontSize: '0.9rem',
              background: '#f5f7fa',
              transition: 'border .2s',
              outline: 'none'
            }}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleFilterChange}
            style={{
              padding: '4px 4px',
              borderRadius: 7,
              border: '1px solid #b0b8c1',
              fontSize: '0.9rem',
              background: '#f5f7fa',
              transition: 'border .2s',
              outline: 'none'
            }}
          />
          <button
            style={{
              padding: '6px 9px',
              borderRadius: 7,
              border: 'none',
              background: '#3668cf',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'background .2s'
            }}
            onClick={handleReset}
            type="button"
            onMouseOver={e => e.target.style.background = "#7d98e4"}
            onMouseOut={e => e.target.style.background = "#4f8cff"}
          >
            Clear
          </button>
          <button
            style={{
              padding: '6px 9px',
              borderRadius: 7,
              border: 'none',
              background: '#3668cf',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'background .2s'
            }}
            onClick={() => navigate(`/event/locations`)}>
            Locations
          </button>
        </div>
      </div>


      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '28px',
        alignItems: 'start',
        marginTop: 20
      }}>
        {filteredLocations.map(location => (
          <LocationCard
            key={location.id}
            // Info de event_location
            id={location.id}
            name={location.name}
            full_address={location.full_address}
            max_capacity={location.max_capacity}
            latitude={location.latitude}
            longitude={location.longitude}
            // Info de locations
            location_name={location.location_name}
            location_latitude={location.location_latitude}
            location_longitude={location.location_longitude}
            // Info de provincias
            province_name={location.province_name}
            province_full_name={location.province_full_name}
            province_latitude={location.province_latitude}
            province_longitude={location.province_longitude}
            // Info del creador
            creator_username={location.creator_username}
            onClick={() => navigate(`/event/${location.id}`, { state: { location } })}
          />
        ))}
      </div>


      {/* Botón flotante para crear evento */}
      <button
        title="Crear nuevo evento"
        onClick={() => navigate("/event/locations/create")}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 40,
          zIndex: 100,
          background: 'linear-gradient(120deg,#3668cf 60%,#7d98e4 100%)',
          color: '#fff',
          borderRadius: '50%',
          width: 62,
          height: 62,
          boxShadow: '0 4px 18px rgba(60,72,88,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.4rem',
          cursor: 'pointer',
          border: 'none',
          transition: 'background .2s, box-shadow .2s'
        }}
      >
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          color: 'black',
          background:'white',
        }}>+</span>
        <svg width="34" height="34" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" />
          <path d="M10 6v8M6 10h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>


      <style>{`
        .eventlist-loading {
          text-align: center;
          margin-top: 80px;
          font-size: 1.5rem;
          color: #4f8cff;
          font-family: Montserrat, Arial, sans-serif;
        }
        @media (max-width: 1200px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 700px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
        ::-webkit-input-placeholder { color: #a2a8b0; }
        :-moz-placeholder { color: #a2a8b0; }
        ::-moz-placeholder { color: #a2a8b0; }
        :-ms-input-placeholder { color: #a2a8b0; }
      `}</style>
    </div>
  );
};


export default LocationList;
