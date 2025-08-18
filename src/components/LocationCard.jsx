import React, { useState } from 'react';

// MAPA ESTILO IMAGEN + PIN
const MapPreview = ({ latitude, longitude }) => (
  <div style={styles.mapPreview}>
    {/* Imagen de mapa de fondo */}
    <img
      src="https://t4.ftcdn.net/jpg/03/38/37/73/360_F_338377354_1Y6oyGrvaae2kqY3YS07b6X4NDKZntne.jpg"
      alt="Mapa"
      style={styles.mapImage}
    />
    {/* Pin rojo centrado */}
    <div style={styles.pinIcon}>
      <svg height="40" width="40" viewBox="0 0 24 24" fill="#F44336">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  </div>
);

const LocationCard = ({
  id,
  name,
  full_address,
  max_capacity,
  latitude,
  longitude,
  id_location,
  location_name,
  location_latitude,
  location_longitude,
  province_name,
  province_full_name,
  province_latitude,
  province_longitude,
  creator_username,
}) => {
  const handleCardClick = (e) => {
    e.stopPropagation();
    window.open(`https://maps.google.com/?q=${location_latitude},${location_longitude}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <div style={styles.gradientBorder}>
        <div style={styles.content}>
          {/* Title & Capacity */}
          <div style={styles.topRow}>
            <div style={styles.titleBlock}>
              <h2 style={styles.title}>{name}</h2>
              <span style={styles.subTitle}>{province_name} / {location_name}</span>
            </div>
          </div>
          {/* MAPA y dirección estilo imagen */}
          <div style={styles.mapCard}>
            <MapPreview latitude={latitude} longitude={longitude} />
            <div style={styles.mapAddressBlock}>
              <span style={styles.mapAddressText}>{full_address}</span>
            </div>
          </div>
          {/* Capacity */}
          <div style={styles.flexRow}>
            <div style={styles.infoColumn}>
              <div style={styles.cap}>
                <div style={styles.sectionTitle}>Capacity</div>
                <span style={styles.capacityBadge}>{max_capacity}</span>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div style={styles.footerRow}>
            <div>
              <span style={styles.creatorLabel}>Creador:</span> {creator_username}
            </div>
            <div style={styles.idBadge}>#{id}</div>
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
    boxShadow: "0 6px 24px rgba(60,72,88,0.13)",
    maxWidth: 375,
    minWidth: 310,
    margin: "26px auto",
    cursor: "pointer",
    transition: "transform 0.16s, box-shadow 0.16s",
    display: "flex",
    flexDirection: "column",
    border: "none",
    position: "relative",
    overflow: "visible",
  },
  gradientBorder: {
    borderRadius: "18px",
    background: "linear-gradient(135deg, #56CCF2 0%, #B16CEA 100%)",
    padding: "2px",
    boxShadow: "0 2px 16px rgba(87, 78, 164, 0.07)",
  },
  content: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px 18px 18px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    boxShadow: "0 0 0 transparent",
    minHeight: "220px"
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    gap: "12px"
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    margin: 0,
    fontSize: "1.32rem",
    fontWeight: "700",
    color: "#5546A7",
    letterSpacing: "0.02em",
    marginBottom: "3px"
  },
  subTitle: {
    fontSize: "1rem",
    color: "#7d98e4",
    fontWeight: "500",
    marginBottom: "1px"
  },
  capacityBadge: {
    background: "linear-gradient(135deg, #5546A7 60%, #56CCF2 100%)",
    color: "#fff",
    borderRadius: "12px",
    minWidth: 60,
    minHeight: 47,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    boxShadow: '0 2px 10px rgba(54,104,207,0.13)',
    border: "2px solid #e7edfb",
    lineHeight: "1.1"
  },
  cap:{
    width: "100%"
  },
  mapCard: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    margin: "10px 0 18px 0",
    boxShadow: "0 2px 7px rgba(60,72,88,0.10)",
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mapPreview: {
    height: 155,
    width: "100%",
    position: "relative",
    background: "#d3d3d3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: "hidden"
  },
  mapImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  pinIcon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -70%)",
    zIndex: 2,
    pointerEvents: "none"
  },
  mapAddressBlock: {
    width: "100%",
    background: "#fff",
    padding: "16px 18px 11px",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
    borderTop: "1px solid #ececec",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
    textAlign: "left",
    paddingLeft:35,

  },
  mapAddressText: {
    color: "#444",
    fontSize: "1.08em",
    fontWeight: "600",
    letterSpacing: "0.01em",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "11px",
    marginBottom: "10px"
  },
  infoColumn: {
    background: "#f8f8fe",
    borderRadius: "10px",
    padding: "10px 10px 8px 10px",
    minWidth: "100px",
    boxShadow: "0 1px 3px rgba(75, 119, 255, 0.04)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "0.97rem",
    cursor: "pointer",
    transition: "background 0.14s",
    userSelect: "none"
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#3668cf",
    fontSize: "1.01rem",
    marginBottom: "3px"
  },
  footerRow: {
    fontSize: "1.01rem",
    color: "#7d98e4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "18px",
    borderTop: "1px solid #e7edfb",
    paddingTop: "8px"
  },
  creatorLabel: {
    color: "#5546A7",
    fontWeight: "600"
  },
  idBadge: {
    background: "#e7edfb",
    color: "#3668cf",
    borderRadius: "8px",
    fontSize: "0.92rem",
    padding: "3px 9px",
    fontWeight: "600"
  },
};

export default LocationCard;