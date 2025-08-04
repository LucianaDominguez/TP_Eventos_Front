import React from "react";


const EventCard = ({ evento, onClick }) => {
  if (!evento) return null;

  return (
    <div style={styles.card} onClick={onClick}>
      
      <div style={styles.content}>
        <h3 style={styles.title}>{evento.name}</h3>
        <p style={styles.dateLocation}>
          <span>{new Date(evento.start_date).toLocaleDateString()}</span>
        </p>
        <p style={styles.description}>{evento.description}</p>
      </div>
    </div>
    
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 3px 16px rgba(60,72,88,0.16)",
    overflow: "hidden",
    maxWidth: 350,
    minWidth: 280,
    margin: "16px auto",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    display: "flex",
    flexDirection: "column",
    minHeight: "fit-content",
  },
  imageContainer: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: "1.35rem",
    fontWeight: "700",
    color: "#1a2233",
  },
  dateLocation: {
    fontSize: "0.97rem",
    color: "#697386",
    margin: "10px 0",
    fontWeight: "500",
  },
  description: {
    fontSize: "1rem",
    color: "#374151",
    margin: 0,
    flex: 1,
  },
};

export default EventCard;