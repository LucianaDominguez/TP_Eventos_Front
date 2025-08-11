import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { Riple } from "react-loading-indicators";

const AVATAR_URL =
  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

const styles = {
  mainBg: {
    minHeight: "100vh",
    background: "#F7F8FA",
    padding: "40px 10px",
    maxWidth: "100%",
  },
  container: {
    maxWidth: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 370px",
    gap: "32px",
    alignItems: "start",
    margin: "0px",
    padding: "0px",

  },
  hero: {
    background: "#fff",
    borderRadius: "22px",
    boxShadow: "0 4px 32px rgba(60,88,123,0.08)",
    padding: "38px 38px 18px 38px",
    marginBottom: "0px",
  },
  tagRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "10px 12px",
    marginBottom: "10px",
    background: "#3a6bf3", // More elegant blue
    borderRadius: "20px",
    width: "fit-content",
    minWidth: "0",
    boxShadow: "0 2px 18px rgba(60,88,123,0.06)",
  },
  tag: {
    background: "#e3eafd",
    color: "#3246c7e3",
    padding: "5px 20px",
    borderRadius: "18px",
    fontWeight: 600,
    fontSize: "12px",
    letterSpacing: "0.5px",
    boxShadow: "0 2px 6px #3247c711",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#cbd5fd",
    fontSize: "16px",
    fontWeight: 500,
  },
  title: {
    fontSize: "42px",
    fontWeight: 700,
    color: "#222c3c",
    marginBottom: "14px",
    marginTop: "20px",
    lineHeight: "1.08",
  },
  desc: {
    fontSize: "18px",
    color: "#3e4a5b",
    marginBottom: "22px",
    marginTop: "20px",
    fontWeight: 400,
    lineHeight: "1.5",
  },
  heroGrid: {
    display: "flex",
    gap: "26px",
    flexWrap: "wrap",
    marginBottom: "12px"
  },
  priceCard: {
    background: "#eafcf5",
    color: "#169c6b",
    borderRadius: "13px",
    boxShadow: "0 2px 10px rgba(28,233,178,0.13)",
    padding: "18px 30px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 700,
    fontSize: "27px",
  },
  priceLabel: {
    background: "#c7f3e2",
    color: "#169c6b",
    borderRadius: "9px",
    fontWeight: 600,
    fontSize: "13px",
    padding: "2px 8px",
  },
  rangeWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    fontWeight: 500,
    color: "#4e5e77",
    marginRight: "12px",
  },
  range: {
    accentColor: "#3668cf",
    width: "80px",
  },
  btnWrap: {
    marginTop: "18px",
  },
  btn: {
    background: "#5268f3ff",
    color: "#fff",
    fontWeight: 600,
    padding: "14px 44px",
    fontSize: "18px",
    borderRadius: "28px",
    border: "none",
    boxShadow: "0 2px 12px rgba(54,104,207,0.11)",
    cursor: "pointer",
    transition: "background 0.17s",
  },
  btnDisabled: {
    background: "#d3d9e9",
    color: "#7b8aa4",
    cursor: "not-allowed",
  },
  tableCard: {
    gridColumn: "1 / span 2",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 2px 16px rgba(60,88,123,0.09)",
    padding: "28px 26px",
    marginTop: "0px",
    marginBottom: "28px",
  },
  cardTitle: {
    fontSize: "19px",
    fontWeight: 600,
    color: "#33445a",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    fontSize: "15px",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    color: "#7b8aa4",
    fontWeight: 500,
    padding: "10px 8px",
    borderBottom: "1px solid #e5eaf1",
    width: "150px"
  },
  td: {
    padding: "10px 8px",
    borderBottom: "1px solid #e5eaf1",
    color: "#3e4a5b",
  },
  creatorCard: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 2px 16px rgba(54,104,207,0.11)",
    padding: "38px 20px 30px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  avatar: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    border: "4px solid #e3eafd",
    marginBottom: "10px",
    objectFit: "cover",
  },
  creatorName: {
    fontWeight: 700,
    fontSize: "21px",
    color: "#2d3b4f",
    marginBottom: "2px",
  },
  creatorUser: {
    fontWeight: 500,
    fontSize: "15px",
    color: "#3668cf",
    marginBottom: "7px",
  },
  contact: {
    fontSize: "13px",
    color: "#7b8aa4",
    marginBottom: "8px",
  },
  organizerLabel: {
    marginTop: "6px",
    background: "#e3eafd",
    color: "#3668cf",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "12px",
    padding: "5px 16px",
    display: "inline-block",
  },
  quickFacts: {
    background: "#e3eafd",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(54,104,207,0.06)",
    padding: "18px 25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "22px"
  },
  factLabel: {
    color: "#7b8aa4",
    fontSize: "12px",
    fontWeight: 500,
  },
  factValue: {
    color: "#3668cf",
    fontWeight: 700,
    fontSize: "16px",
    marginTop: "2px"
  },
  backBtn: {
    background: "#e3eafd",
    color: "#3247c7",
    fontWeight: 600,
    padding: "11px",
    fontSize: "16px",
    borderRadius: "50px",
    border: "none",
    boxShadow: "0 2px 8px #3247c711",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "background 0.18s",
  },
  backBtnHover: {
    background: "#c2d7fa"
  }
};


const DetailEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);

  // estado para la inscripción:
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const [joined, setJoined] = useState(false);

  // estado para la baja
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

  // Consulta evento y estado de inscripción al montar
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const url = new URL(`${API_BASE_URL}/api/event/${id}`);
        const response = await axios.get(url.toString(), {
          responseType: "json",
          headers: {
            "ngrok-skip-browser-warning": 1,
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setEvent(response.data);
        setError(null);

        // MODIFICACIÓN: actualizar estado joined según is_user_enrolled
        if (response.data.is_user_enrolled !== undefined) {
          setJoined(response.data.is_user_enrolled);
        }
      } catch (err) {
        setError("Error loading event.");
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    // Solo depende de id
    // eslint-disable-next-line
  }, [id]);

  // función para inscribirse
  const handleJoin = async () => {
    setJoining(true);
    setJoinError(null);
    try {
      const url = `${API_BASE_URL}/api/event/${id}/enrollment`;
      await axios.post(
        url,
        {},
        {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": 1,
          },
        }
      );
      setJoined(true);
    } catch (error) {
      setJoinError("No se pudo inscribir en el evento.");
    } finally {
      setJoining(false);
    }
  };

  // función para des-inscribirse
  const handleLeave = async () => {
    setLeaving(true);
    setLeaveError(null);
    try {
      const url = `${API_BASE_URL}/api/event/${id}/enrollment`;
      await axios.delete(url, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": 1,
        },
      });
      setJoined(false);
    } catch (error) {
      setLeaveError("No se pudo dar de baja del evento.");
    } finally {
      setLeaving(false);
    }
  };

  if (loading)
    return (
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

  if (error)
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", color: "#d32f2f", fontSize: "19px" }}>
        Error loading event.
      </div>
    );
  if (!event)
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", color: "#7b8aa4", fontSize: "19px" }}>
        No event data found.
      </div>
    );

  return (
    <div style={styles.mainBg}>
      <div style={styles.container}>
        {/* HERO SECTION */}
        <div>
          <div style={styles.hero}>
            <div style={styles.tagRow}>
              <button
                style={hover ? { ...styles.backBtn, ...styles.backBtnHover } : styles.backBtn}
                onClick={() => navigate("/events/")}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                ←
              </button>
              <span style={styles.subtitle}>
                {new Date(event.start_date).toLocaleDateString()} • {event.location_name}
              </span>
            </div>
            <div style={styles.title}>{event.name}</div>
            <span style={styles.tag}>{event.tags ? event.tags.toUpperCase() : "EVENT"}</span>
            <div style={styles.desc}>{event.description}</div>
            <div style={styles.heroGrid}>
              <div style={styles.priceCard}>
                ${Number(event.price).toLocaleString()}
                <span style={styles.priceLabel}>Price</span>
              </div>
              <div style={styles.rangeWrap}>
                Duration:
                <input
                  type="range"
                  min={30}
                  max={240}
                  value={event.duration_in_minutes}
                  readOnly
                  style={styles.range}
                />
                <span style={{ color: "#2d3b4f", fontWeight: 700 }}>
                  {event.duration_in_minutes} min
                </span>
              </div>
              <div style={styles.rangeWrap}>
                Max. assistance:
                <input
                  type="range"
                  min={10}
                  max={event.event_location_max_capacity}
                  value={event.max_assistance}
                  readOnly
                  style={styles.range}
                />
                <span style={{ color: "#2d3b4f", fontWeight: 700 }}>
                  {event.max_assistance}
                </span>
              </div>
            </div>
            <div style={styles.btnWrap}>
              {event.enabled_for_enrollment === "1" ? (
                !joined ? (
                  <button
                    style={{
                      ...styles.btn,
                      ...(joining ? styles.btnDisabled : {}),
                    }}
                    onClick={handleJoin}
                    disabled={joining}
                  >
                    {joining ? "Joining..." : "Join"}
                  </button>
                ) : (
                  <button
                    style={{
                      ...styles.btn,
                      ...(leaving ? styles.btnDisabled : {}),
                      background: "#d32f2f",
                      color: "#fff"
                    }}
                    onClick={handleLeave}
                    disabled={leaving}
                  >
                    {leaving ? "Bajando..." : "Bajarse del evento"}
                  </button>
                )
              ) : (
                <button style={{ ...styles.btn, ...styles.btnDisabled }} disabled>
                  Registration disabled
                </button>
              )}
              {(joinError || leaveError) && (
                <div style={{ color: "#d32f2f", fontWeight: 600, marginTop: 10 }}>
                  {joinError || leaveError}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* CREATOR SECTION */}
        <div>
          <div style={styles.creatorCard}>
            <img
              src={AVATAR_URL}
              alt="Avatar"
              style={styles.avatar}
            />
            <div style={styles.creatorName}>
              {event.creator_user_first_name} {event.creator_user_last_name}
            </div>
            <div style={styles.creatorUser}>
              @{event.creator_user_username}
            </div>
            <div style={styles.contact}>
              <span style={{ fontWeight: 600 }}>Contact:</span>{" "}
              <a
                style={{ textDecoration: "underline", color: "#3668cf" }}
                href={`mailto:${event.creator_user_username}`}
              >
                {event.creator_user_username}
              </a>
            </div>
            <div style={styles.organizerLabel}>Organizer</div>
          </div>
          {/* CARD QUICK FACTS */}
          <div style={styles.quickFacts}>
            <div>
              <div style={styles.factLabel}>Venue capacity</div>
              <div style={styles.factValue}>{event.event_location_max_capacity}</div>
            </div>
            <div>
              <div style={styles.factLabel}>Neighborhood</div>
              <div style={styles.factValue}>{event.location_name}</div>
            </div>
            <div>
              <div style={styles.factLabel}>Province</div>
              <div style={styles.factValue}>{event.province_full_name}</div>
            </div>
          </div>
        </div>
        {/* TABLE SECTION - INFO EXTRA (Full width) */}
        <div style={styles.tableCard}>
          <div style={styles.cardTitle}>Additional information</div>
          <table style={styles.table}>
            <tbody>
              <tr>
                <th style={styles.th}>Venue</th>
                <td style={styles.td}>{event.event_location_name}</td>
              </tr>
              <tr>
                <th style={styles.th}>Address</th>
                <td style={styles.td}>{event.full_address}</td>
              </tr>
              <tr>
                <th style={styles.th}>Neighborhood</th>
                <td style={styles.td}>{event.location_name}</td>
              </tr>
              <tr>
                <th style={styles.th}>Province</th>
                <td style={styles.td}>{event.province_full_name}</td>
              </tr>
              <tr>
                <th style={styles.th}>Date & time</th>
                <td style={styles.td}>
                  {new Date(event.start_date).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th style={styles.th}>Venue coordinates</th>
                <td style={styles.td}>
                  <span style={{ fontFamily: "monospace" }}>{event.event_location_latitude}</span>,{" "}
                  <span style={{ fontFamily: "monospace" }}>{event.event_location_longitude}</span>
                </td>
              </tr>
              <tr>
                <th style={styles.th}>Neighborhood coordinates</th>
                <td style={styles.td}>
                  <span style={{ fontFamily: "monospace" }}>{event.location_latitude}</span>,{" "}
                  <span style={{ fontFamily: "monospace" }}>{event.location_longitude}</span>
                </td>
              </tr>
              <tr>
                <th style={styles.th}>Province coordinates</th>
                <td style={styles.td}>
                  <span style={{ fontFamily: "monospace" }}>{event.province_latitude}</span>,{" "}
                  <span style={{ fontFamily: "monospace" }}>{event.province_longitude}</span>
                </td>
              </tr>
              <tr>
                <th style={styles.th}>Tag</th>
                <td style={styles.td}>
                  {event.tag ? event.tag : <span style={{ fontStyle: "italic", color: "#bbb" }}>No tag</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;