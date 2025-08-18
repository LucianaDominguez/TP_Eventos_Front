import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../services/api';

const CreateEventLocation = () => {
  const [form, setForm] = useState({
    name: "",
    full_address: "",
    id_location: "",
    max_capacity: "",
    latitude: "",
    longitude: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
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
    if (!form.full_address || form.full_address.length < 3)
      newErrors.full_address = "Dirección mínima 3 caracteres";
    if (!form.id_location)
      newErrors.id_location = "ID de Location requerido";
    if (!form.max_capacity || isNaN(form.max_capacity) || Number(form.max_capacity) <= 0)
      newErrors.max_capacity = "Capacidad debe ser mayor a 0";
    if (!form.latitude || isNaN(Number(form.latitude)))
      newErrors.latitude = "Latitud requerida y debe ser numérica";
    if (!form.longitude || isNaN(Number(form.longitude)))
      newErrors.longitude = "Longitud requerida y debe ser numérica";
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

    const token = sessionStorage.getItem("token");
    const userID = sessionStorage.getItem("user");

    const url = new URL(`${API_BASE_URL}/api/event-locations/`);
    console.log(userID)

    try {
      await axios.post(
        url.toString(),
        {
          ...form,
          id_creator_user: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": 1,
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/event/locations");
      }, 600);
    } catch (err) {
      setErrors({
        ...errors,
        name:
          err.response?.data?.message ||
          "No se pudo crear la locación. Intenta de nuevo.",
      });
      setSuccess(false);
    }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <h3 style={styles.welcome}>New location </h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Location name"
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="text"
                name="full_address"
                value={form.full_address}
                onChange={handleChange}
                style={styles.input}
                placeholder="Full adress"
              />
              {errors.full_address && <span style={styles.error}>{errors.full_address}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="id_location"
                value={form.id_location}
                onChange={handleChange}
                style={styles.input}
                placeholder="Location ID "
              />
              {errors.id_location && <span style={styles.error}>{errors.id_location}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="number"
                name="max_capacity"
                value={form.max_capacity}
                onChange={handleChange}
                style={styles.input}
                placeholder="Max. Cappacity"
                min={1}
              />
              {errors.max_capacity && <span style={styles.error}>{errors.max_capacity}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="text"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                style={styles.input}
                placeholder="Latitude (ej: -34.603722)"
              />
              {errors.latitude && <span style={styles.error}>{errors.latitude}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="text"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                style={styles.input}
                placeholder="Longitude (ej: -58.381592)"
              />
              {errors.longitude && <span style={styles.error}>{errors.longitude}</span>}
            </div>
            <button type="submit" style={styles.button}>Create location</button>
            {success && (
              <div style={styles.success}>¡Locación creada exitosamente!</div>
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
    justifyContent:"center",
    marginLeft:650,
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
    maxWidth:"500px",
    background: "#fff",
    padding: "32px 18px 18px 18px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent:"center"
  },
  welcome: {
    fontSize: "2.5em",
    fontWeight: "700",
    color: "#5546A7",
    letterSpacing: "0.02em",
    margin: "0 0 10px 0",
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
    borderBottom: "none",
    borderRadius: "5",
    outline: "none",
    background: "#f7f7f7",
    marginBottom: "2px",
    transition: "border-bottom 0.2s",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #5546A7 60%, #56CCF2 100%)",
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

export default CreateEventLocation;