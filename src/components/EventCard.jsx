import React from "react";
import axios from "axios"
import { API_BASE_URL } from '../services/api';

const EventCard = ({ evento, onClick }) => {
  if (!evento) return null;

  const userID = sessionStorage.getItem("user");
  // Formato para precio
  const priceTag =
    evento.price === 0
      ? "Gratis"
      : `$${evento.price.toLocaleString("es-AR", {
          minimumFractionDigits: 0,
        })}`;

  // Formato para estado de inscripción
  const enrollment =
    evento.enabled_for_enrollment ? "Inscripción abierta" : "Inscripción cerrada";

  // Formato para fecha y duración
  const dateStr = new Date(evento.start_date).toLocaleDateString();
  const durationStr = `${evento.duration_in_minutes} min`;

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent triggering onClick for card
    if (!window.confirm("¿Estás seguro de que deseas eliminar este evento?")) return;
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/event/${evento.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": 1
        }
      });
    } catch (err) {
      console.log(err)
      alert("Error al eliminar el evento.");
    }
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.gradientBorder}>
        <div style={styles.content}>
          <h3 style={styles.title}>{evento.name}</h3>
          <p style={styles.description}>{evento.description}</p>

          <div style={styles.infoRow}>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Fecha</span>
              <span style={styles.value}>{dateStr}</span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Duración</span>
              <span style={styles.value}>{durationStr}</span>
            </div>
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Cupo máx</span>
              <span style={styles.value}>{evento.max_assistance}</span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Precio</span>
              <span style={styles.value}>{priceTag}</span>
            </div>
          </div>

          <div style={styles.enrollment}>
            <span>{enrollment}</span>
          </div>
          <small>creator: {evento.id_creator_user}, you: {userID}</small> //Para checkear

          {/* Only show delete button for creator */}
          {String(evento.id_creator_user) === String(userID) && (
            <button
              style={{
                marginTop: 14,
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                borderRadius: "7px",
                padding: "7px 18px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1.02rem"
              }}
              onClick={handleDelete}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "linear-gradient(135deg, #eaf6fb 0%, #f6eaff 100%)",
    borderRadius: "20px",
    boxShadow: "0 6px 24px rgba(60,72,88,0.12)",
    overflow: "visible",
    maxWidth: 370,
    minWidth: 300,
    margin: "26px auto",
    cursor: "pointer",
    transition: "transform 0.18s, box-shadow 0.18s",
    display: "flex",
    flexDirection: "column",
    minHeight: "fit-content",
    border: "none",
    position: "relative",
  },
  gradientBorder: {
    borderRadius: "18px",
    background: "linear-gradient(135deg, #56CCF2 0%, #B16CEA 100%)",
    padding: "2px",
    boxShadow: "0 2px 16px rgba(87, 78, 164, 0.09)",
  },
  content: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    boxShadow: "0 0 0 transparent",
  },
  title: {
    margin: 0,
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#5546A7",
    letterSpacing: "0.02em",
    marginBottom: "6px",
  },
  description: {
    fontSize: "1.08rem",
    color: "#374151",
    margin: "8px 0 18px 0",
    flex: 1,
    lineHeight: "1.5",
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "12px",
    margin: "7px 0",
  },
  infoBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "#f5f6fa",
    borderRadius: "10px",
    padding: "7px 16px",
    minWidth: "110px",
    boxShadow: "0 1px 4px rgba(60,72,88,0.05)",
  },
  label: {
    fontSize: "0.93rem",
    color: "#6C47FF",
    fontWeight: "600",
    marginBottom: "2px",
    letterSpacing: "0.01em",
  },
  value: {
    fontSize: "1rem",
    color: "#1a2233",
    fontWeight: "500",
  },
  enrollment: {
    marginTop: "15px",
    padding: "7px 0",
    textAlign: "center",
    fontSize: "1.07rem",
    fontWeight: "600",
    color: "#5546A7",
    background: "#efeafe",
    borderRadius: "10px",
    letterSpacing: "0.01em",
  },
};

export default EventCard;