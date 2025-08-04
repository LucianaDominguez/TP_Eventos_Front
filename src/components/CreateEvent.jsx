import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../services/api';
import { useAuth } from "../context/useAuth"

const CreateEvent = () => {
  const { user, token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    id_event_category: "",
    id_event_location: "",
    start_date: "",
    duration_in_minutes: "",
    price: "",
    enabled_for_enrollment: true,
    max_assistance: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name || form.name.length < 3)
      newErrors.name = "Nombre mínimo 3 caracteres";
    if (!form.description || form.description.length < 3)
      newErrors.description = "Descripción mínima 3 caracteres";
    if (!form.id_event_category)
      newErrors.id_event_category = "Categoría requerida";
    if (!form.id_event_location)
      newErrors.id_event_location = "Locación requerida";
    if (!form.start_date)
      newErrors.start_date = "Fecha requerida";
    if (!form.duration_in_minutes || isNaN(form.duration_in_minutes) || Number(form.duration_in_minutes) < 0)
      newErrors.duration_in_minutes = "Duración debe ser un número positivo";
    if (form.price === "" || isNaN(form.price) || Number(form.price) < 0)
      newErrors.price = "Precio debe ser un número positivo";
    if (!form.max_assistance || isNaN(form.max_assistance) || Number(form.max_assistance) <= 0)
      newErrors.max_assistance = "Asistentes debe ser mayor a 0";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }
    setErrors({});
    setSuccess(false);

    try {
      await axios.post(
        `${API_BASE_URL}/api/event`,
        {
          ...form,
          id_creator_user: user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": 1,
            "Authorization": `Bearer ${token}`
          },
        }
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/eventos");
      }, 600);
    } catch (err) {
      setErrors({
        ...errors,
        name:
          err.response?.data?.message ||
          "No se pudo crear el evento. Intenta de nuevo.",
      });
      setSuccess(false);
    }
  };

  return (
    <div style={styles.layout}>
      {/* Left section */}
      <div style={styles.leftSection}>
        <div style={styles.logoStar}>✱</div>
        <h1 style={styles.helloText}>
          Crear<br />Evento!<span style={styles.wave}>🎉</span>
        </h1>
        <p style={styles.description}>
          Organiza tu propio evento, define la fecha, lugar, precio y todo lo que necesitas.<br />
          ¡Hazlo realidad y comparte tu propuesta!
        </p>
        <div style={styles.leftFooter}>
          © 2025 Wave. All rights reserved.
        </div>
      </div>
      {/* Right section */}
      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <h2 style={styles.logoRight}>Wave</h2>
          <h3 style={styles.welcome}>Nuevo Evento</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Nombre del evento"
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
            <div style={styles.field}>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                style={{ ...styles.input, minHeight: '64px', resize: 'vertical' }}
                placeholder="Descripción"
              />
              {errors.description && <span style={styles.error}>{errors.description}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="id_event_category"
                value={form.id_event_category}
                onChange={handleChange}
                style={styles.input}
                placeholder="ID Categoría"
              />
              {errors.id_event_category && <span style={styles.error}>{errors.id_event_category}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="id_event_location"
                value={form.id_event_location}
                onChange={handleChange}
                style={styles.input}
                placeholder="ID Locación"
              />
              {errors.id_event_location && <span style={styles.error}>{errors.id_event_location}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                style={styles.input}
                placeholder="Fecha de inicio"
              />
              {errors.start_date && <span style={styles.error}>{errors.start_date}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="duration_in_minutes"
                value={form.duration_in_minutes}
                onChange={handleChange}
                style={styles.input}
                placeholder="Duración (minutos)"
                min={0}
              />
              {errors.duration_in_minutes && <span style={styles.error}>{errors.duration_in_minutes}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                style={styles.input}
                placeholder="Precio"
                min={0}
              />
              {errors.price && <span style={styles.error}>{errors.price}</span>}
            </div>
            <div style={styles.field}>
              <label style={{ fontSize: 14, color: "#212b36", marginBottom: 4 }}>
                Habilitado para inscripciones
              </label>
              <input
                type="checkbox"
                name="enabled_for_enrollment"
                checked={form.enabled_for_enrollment}
                onChange={handleChange}
                style={{ accentColor: "#3e4ab8", marginRight: 8 }}
              />
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="max_assistance"
                value={form.max_assistance}
                onChange={handleChange}
                style={styles.input}
                placeholder="Máximo de asistentes"
                min={1}
              />
              {errors.max_assistance && <span style={styles.error}>{errors.max_assistance}</span>}
            </div>
            <button type="submit" style={styles.button}>Crear Evento</button>
            {success && (
              <div style={styles.success}>¡Evento creado exitosamente!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Roboto', Arial, sans-serif",
    background: "#f4f6f8",
  },
  leftSection: {
    flex: 1,
    background: "linear-gradient(135deg, #3e4ab8 0%, #3247c7 100%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "100px 92px",
    position: "relative",
    minWidth: "600px",
    boxSizing: "border-box",
  },
  logoStar: {
    fontSize: "52px",
    fontWeight: "bold",
    marginBottom: "32px",
    marginTop: "-40px",
    letterSpacing: "2px"
  },
  helloText: {
    fontSize: "42px",
    fontWeight: "700",
    lineHeight: "1.1",
    margin: 0,
    marginBottom: "12px",
    textAlign: "left",
    letterSpacing: "0px"
  },
  wave: {
    fontSize: "38px",
    marginLeft: "10px",
    verticalAlign: "middle"
  },
  description: {
    fontSize: "18px",
    fontWeight: "400",
    marginTop: "18px",
    marginBottom: "auto",
    maxWidth: "350px",
    textAlign: "left",
    opacity: "0.94",
    lineHeight: "1.5"
  },
  leftFooter: {
    position: "absolute",
    bottom: "18px",
    left: "32px",
    fontSize: "14px",
    opacity: 0.7,
    letterSpacing: "0.5px"
  },
  rightSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    minWidth: "600px",
    boxSizing: "border-box",
  },
  formContainer: {
    width: "100%",
    maxWidth: "355px",
    background: "#fff",
    padding: "32px 18px 18px 18px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  logoRight: {
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "-1px",
    margin: "0 0 18px 0",
    color: "#212b36",
  },
  welcome: {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#212b36",
  },
  field: {
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderBottom: "2px solid #e0e0e0",
    borderRadius: "0",
    outline: "none",
    background: "#f7f7f7",
    marginBottom: "2px",
    transition: "border-bottom 0.2s",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#212b36",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "4px",
    marginBottom: "10px",
    transition: "background 0.2s",
  },
  error: {
    color: "#d32f2f",
    fontSize: "13px",
    marginTop: "2px",
    marginLeft: "2px"
  },
  success: {
    marginTop: "16px",
    color: "#388e3c",
    fontWeight: "bold",
    textAlign: "center",
  }
};

export default CreateEvent;