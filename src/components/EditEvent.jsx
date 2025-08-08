import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const EditEventView = () => {
  const  eventID  = useParams().id;
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null); // para los datos del evento
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 1. Al montar, buscamos la data actual del evento
  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/event/${eventID}`, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": 1
          }
        });


        console.log(eventID)

        setEventData(res.data); // guardamos la info, para mostrar el form ya completado
      } catch (err) {
        console.log(err)
        setError("No se pudo cargar el evento.");
      } finally {
        setLoading(false);
      }
    }
    if (eventID) fetchEvent();
  }, [eventID]);

  // 2. El form se muestra pre-llenado con eventData
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // 3. Al enviar, hacemos el PUT con los datos modificados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await axios.put(
        `${API_BASE_URL}/api/event/${eventID}`,
        {
          ...eventData,
          price: Number(eventData.price),
          max_assistance: Number(eventData.max_assistance),
          duration_in_minutes: Number(eventData.duration_in_minutes)
        },
        {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": 1
          }
        }
      );
      navigate(`/events`);
    } catch (err) {
        console.log(err)

      setError("Error al actualizar el evento.");
    } finally {
      setSubmitting(false);
    }
  };

  // 4. UI: primero muestra "Cargando...", luego el form pre-llenado
  if (loading) return <div>Cargando evento...</div>;
  if (error) return <div>{error}</div>;
  if (!eventData) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Evento</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre:
          <input
            style={styles.input}
            type="text"
            name="name"
            value={eventData.name || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label style={styles.label}>
          Descripción:
          <textarea
            style={styles.textarea}
            name="description"
            value={eventData.description || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label style={styles.label}>
          Fecha inicio:
          <input
            style={styles.input}
            type="date"
            name="start_date"
            value={eventData.start_date ? eventData.start_date.slice(0,10) : ""}
            onChange={handleChange}
            required
          />
        </label>
        <label style={styles.label}>
          Duración (minutos):
          <input
            style={styles.input}
            type="number"
            name="duration_in_minutes"
            value={eventData.duration_in_minutes || ""}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
        <label style={styles.label}>
          Cupo máximo:
          <input
            style={styles.input}
            type="number"
            name="max_assistance"
            value={eventData.max_assistance || ""}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
        <label style={styles.label}>
          Precio:
          <input
            style={styles.input}
            type="number"
            name="price"
            value={eventData.price || ""}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
        <label style={styles.labelCheckbox}>
          <input
            type="checkbox"
            name="enabled_for_enrollment"
            checked={eventData.enabled_for_enrollment || false}
            onChange={handleChange}
          />
          Inscripción abierta
        </label>
        <div style={styles.buttonRow}>
          <button type="submit" style={styles.submitButton} disabled={submitting}>
            {submitting ? "Guardando..." : "Guardar cambios"}
          </button>
          <button type="button" style={styles.cancelButton} onClick={() => navigate("/events")}>
            Cancelar
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 430,
    margin: "36px auto",
    padding: "32px",
    background: "linear-gradient(135deg, #eaf6fb 0%, #f6eaff 100%)",
    borderRadius: "20px",
    boxShadow: "0 6px 24px rgba(60,72,88,0.12)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#5546A7",
    marginBottom: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    fontWeight: "600",
    color: "#6C47FF",
    fontSize: "1rem",
    marginBottom: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  labelCheckbox: {
    fontWeight: "600",
    color: "#6C47FF",
    fontSize: "1rem",
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "9px 12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #B16CEA",
    background: "#fff",
    color: "#374151",
    outline: "none",
  },
  textarea: {
    padding: "10px 12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #B16CEA",
    background: "#fff",
    color: "#374151",
    outline: "none",
    minHeight: "70px",
    resize: "vertical",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    gap: "14px",
    justifyContent: "center",
    marginTop: "14px",
  },
  submitButton: {
    padding: "10px 28px",
    background: "#B16CEA",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 28px",
    background: "#f5f6fa",
    color: "#6C47FF",
    borderRadius: "8px",
    border: "1px solid #B16CEA",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    marginTop: "12px",
    color: "#F44336",
    fontWeight: "600",
    textAlign: "center",
  },
};

export default EditEventView;