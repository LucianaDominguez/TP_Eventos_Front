import React from "react";
import axios from "axios";
import { API_BASE_URL } from '../services/api';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const EventCard = ({ evento, onClick}) => {
  
  const navigate = useNavigate();
  console.log(evento)
  if (!evento) return null;
  const userID = sessionStorage.getItem("user");

  const priceTag =
    evento.price === 0
      ? "Gratis"
      : `$${evento.price.toLocaleString("es-AR", {
          minimumFractionDigits: 0,
        })}`;

  const enrollment =
    evento.enabled_for_enrollment ? "Inscripción abierta" : "Inscripción cerrada";

  const dateStr = new Date(evento.start_date).toLocaleDateString();
  const durationStr = `${evento.duration_in_minutes} min`;

  const handleDelete = async (eventID) => {
    const url = new URL(`${API_BASE_URL}/api/event/${eventID}`);

    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      
      try {
        console.log(url)
        await axios.delete(url.toString(), {
          responseType: 'json',
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": 1
          }
        });
        setTimeout(() => {
          navigate("/events");
        }, 200);
      } catch (err) {
        console.log(err)
        alert("Error al eliminar el evento.");
      }
    }
  };

  const handleEdit = (eventID) => {
    navigate(`/event/edit/${eventID}`);
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.gradientBorder}>
        <div style={styles.content}>
          {/* Botón Eliminar solo para el creador */}
          {evento.creator.id === parseInt(userID) && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <button
              style={styles.editButton}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(evento.id);
              }}
              title="Editar evento"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>
            </button>
            <button
              style={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(evento.id);
              }}
              title="Eliminar evento"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>
            </button>
          </div>
          )}
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
  deleteButton: {
    marginTop: "1px",
    padding: "9px 12px",
    color: "#F44336",
    paddingTop:"14px",
    background:"white",
    border: "1px solid #F44336",
    borderRadius: "50%",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "flex-end",
    boxShadow: "0 2px 8px rgba(244,67,54,0.08)",
    fontSize: "1rem",
    letterSpacing: "0.01em"
  },
  editButton: {
    marginTop: "1px",
    padding: "9px 12px",
    color: "#2196F3",
    paddingTop:"14px",
    background:"white",
    border: "1px solid #2196F3",
    borderRadius: "50%",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "flex-end",
    boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
    fontSize: "1rem",
    letterSpacing: "0.01em"
  }
};

export default EventCard;