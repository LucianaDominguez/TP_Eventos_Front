import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // --- Lógica original, no modificar ---
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.first_name) newErrors.first_name = "First name required";
    if (!form.last_name) newErrors.last_name = "Last name required";
    if (!form.username) newErrors.username = "Username required";
    if (!form.password) newErrors.password = "Password required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
        `${API_BASE_URL}/api/user/register`,
        {
          first_name: form.first_name,
          last_name: form.last_name,
          username: form.username,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": 1,
          },
        }
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/eventos");
      }, 200);
    } catch (err) {
      setErrors({
        ...errors,
        username:
          err.response?.data?.message ||
          "Registration failed. Try again.",
      });
      setSuccess(false);
    }
  };

  // --- Diseño tipo Clevent ---
  return (
    <div style={styles.layout}>
      {/* Left section */}
      <div style={styles.leftSection}>
        <div style={styles.logoStar}>✱</div>
        <h1 style={styles.helloText}>
          Hello<br />Clevent!<span style={styles.wave}>👋</span>
        </h1>
        <p style={styles.description}>
          Your next event is just a few clicks away.
          Discover parties, concerts and more happening near you.
          Time to join the vibe.
        </p>
        <div style={styles.leftFooter}>
          © 2025 Clevent. All rights reserved.
        </div>
      </div>
      {/* Right section */}
      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <h2 style={styles.logoRight}>Clevent</h2>
          <h3 style={styles.welcome}>Hi there!</h3>
          <p style={styles.accountText}>
            Already have an account?{" "}
            <Link to="/" style={styles.signupLink2}>Log In</Link><br />
            Let’s get you connected.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                style={styles.input}
                autoComplete="given-name"
                placeholder="First name"
              />
              {errors.first_name && <span style={styles.error}>{errors.first_name}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                style={styles.input}
                autoComplete="family-name"
                placeholder="Last name"
              />
              {errors.last_name && <span style={styles.error}>{errors.last_name}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                style={styles.input}
                autoComplete="username"
                placeholder="Username or Email"
              />
              {errors.username && <span style={styles.error}>{errors.username}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
                autoComplete="new-password"
                placeholder="Password"
              />
              {errors.password && <span style={styles.error}>{errors.password}</span>}
            </div>
            <div style={styles.field}>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                autoComplete="new-password"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <span style={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" style={styles.button}>Sign Up</button>
            {success && (
              <div style={styles.success}>Registration successful!</div>
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
    padding: "180px 182px",
    position: "relative",
    minWidth: "900px",
    boxSizing: "border-box",
  },
  logoStar: {
    fontSize: "82px",
    fontWeight: "bold",
    marginBottom: "32px",
    marginTop: "-40px",
    letterSpacing: "2px"
  },
  helloText: {
    fontSize: "82px",
    fontWeight: "700",
    lineHeight: "1.1",
    margin: 0,
    marginBottom: "12px",
    textAlign: "left",
    letterSpacing: "0px"
  },
  wave: {
    fontSize: "58px",
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
    fontSize: "56px",
    fontWeight: "700",
    letterSpacing: "-1px",
    margin: "0 0 18px 0",
    color: "#212b36",
  },
  welcome: {
    fontSize: "33px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#212b36",
  },
  accountText: {
    fontSize: "15px",
    fontWeight: "100",
    color: "#666",
    marginBottom: "18px",
    lineHeight: "1.4"
  },
  signupLink2: {
    color: "#3e4ab8",
    textDecoration: "none",
    fontWeight: "500",
    cursor: "pointer"
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

export default Register;