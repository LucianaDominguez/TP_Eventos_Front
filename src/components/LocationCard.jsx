import React, { useState } from 'react';


const MapPreview = ({ latitude, longitude }) => (
  <div style={styles.mapPreview}>
    <a
      href={`https://maps.google.com/?q=${latitude},${longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.mapLink}
      title="Ver en Google Maps"
    >
      <div style={styles.mapText}>
        MAPA
        <div style={styles.coordsLabel}>
          <span style={{ fontSize: "0.92em", color: "#888", fontWeight: 500 }}>
            {latitude}, {longitude}
          </span>
        </div>
        <div style={styles.mapBtn}>
          Abrir en Google Maps
        </div>
      </div>
    </a>
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
  onClick
}) => {
  const [showCoords, setShowCoords] = useState({
    event: false,
    location: false,
    province: false
  });


  const handleToggle = key => {
    setShowCoords(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };


  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.gradientBorder}>
        <div style={styles.content}>
          {/* Title & Capacity */}
          <div style={styles.topRow}>
            <div style={styles.titleBlock}>
              <h2 style={styles.title}>{name}</h2>
              <span style={styles.subTitle}>{province_name} / {location_name}</span>
            </div>
          </div>
          {/* Mapa y dirección estilo tarjeta */}
          <div style={styles.mapCard}>
            <MapPreview latitude={latitude} longitude={longitude} />
            <div style={styles.mapAddressBlock}>
              <span style={styles.mapAddressLabel}>Dirección</span>
              <span style={styles.mapAddressText}>{full_address}</span>
            </div>
          </div>
          {/* Distribution: three columns */}
          <div style={styles.flexRow}>
            
            <div
              style={styles.infoColumn}
              onClick={e => { e.stopPropagation(); handleToggle('location'); }}
              title="Mostrar coordenadas de location"
            >
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
    background: "#e2e2e2",
    borderRadius: "14px",
    overflow: "hidden",
    margin: "10px 0 18px 0",
    boxShadow: "0 2px 7px rgba(60,72,88,0.10)",
    width: "50%",
    maxWidth: "100%",
  },
  mapPreview: {
    height: 150,
    width: "100%",
    background: "#d3d3d3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.1rem",
    fontWeight: "800",
    color: "#222",
    letterSpacing: "0.04em",
    position: "relative",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14
  },
  mapText: {
    textAlign: "center"
  },
  coordsLabel: {
    marginTop: "8px",
    fontSize: "0.98rem",
    fontWeight: "600",
    color: "#888"
  },
  mapBtn: {
    marginTop: "10px",
    background: "#3668cf",
    color: "#fff",
    padding: "7px 15px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1em",
    boxShadow: "0 2px 10px rgba(54,104,207,0.11)",
    display: "inline-block"
  },
  mapLink: {
    textDecoration: "none",
    width: "100%",
    height: "100%",
    display: "block"
  },
  mapAddressBlock: {
    background: "#fff",
    padding: "10px 18px",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
    borderTop: "1px solid #ececec",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
  },
  mapAddressLabel: {
    fontWeight: "700",
    color: "#222",
    marginRight: "10px",
    fontSize: "1.07em",
    letterSpacing: "0.02em"
  },
  mapAddressText: {
    color: "#444",
    fontSize: "1.03em"
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
  smallLabel: {
    color: "#7d98e4",
    fontWeight: "600",
    fontSize: "0.96em",
    marginRight: "5px"
  },
  coordsToggle: {
    marginTop: "6px"
  },
  toggleText: {
    fontSize: "0.92em",
    color: "#B16CEA",
    fontWeight: "500",
    cursor: "pointer"
  },
  coordsBox: {
    marginTop: "4px",
    fontSize: "0.97em",
    background: "#eaf6fb",
    borderRadius: "6px",
    padding: "3px 7px",
    color: "#3668cf",
    fontWeight: "500"
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
