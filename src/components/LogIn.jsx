import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../services/api';

const LogIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
    if (!form.username) newErrors.username = "Username or Email required";
    if (!form.password) newErrors.password = "Password required";
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
      const url = new URL (`${API_BASE_URL}/api/user/login`);
      console.log(success);
      const response = await axios.post(
        url.toString(),
        {
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

      console.log("Login response:", response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/events");
      }, 200);

    } catch (err) {
      setErrors({
        ...errors,
        password:
          err.response?.data?.message ||
          "Login failed (400). Revisa usuario y contraseña.",
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
          <h3 style={styles.welcome}>Welcome back!</h3>
          <p style={styles.accountText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.signupLink2}>Create a new account now</Link>.
            <br />It's FREE! Takes less than a minute.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                style={styles.input}
                autoComplete="username"
                placeholder="Email or username"
              />
              {errors.username && (
                <span style={styles.error}>{errors.username}</span>
              )}
            </div>
            <div style={styles.field}>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
                autoComplete="current-password"
                placeholder="Password"
              />
              {errors.password && (
                <span style={styles.error}>{errors.password}</span>
              )}
            </div>
            <button type="submit" style={styles.button}>Login Now</button>
            
            <div style={styles.forgotPassword}>
              Forget password? <Link to="/register" style={styles.forgotLink}>Click here</Link>
            </div>
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
    fontSize: "36px",
    fontWeight: "700",
    letterSpacing: "-1px",
    margin: "0 0 18px 0",
    color: "#212b36",
  },
  welcome: {
    fontSize: "23px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#212b36",
  },
  accountText: {
    fontSize: "14px",
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
  forgotPassword: {
    fontSize: "14px",
    color: "#555",
    textAlign: "center",
    marginTop: "6px",
  },
  forgotLink: {
    color: "#3e4ab8",
    textDecoration: "none",
    fontWeight: "100",
    cursor: "pointer"
  },
  error: {
    color: "#d32f2f",
    fontSize: "13px",
    marginTop: "2px",
    marginLeft: "2px"
  }
};

export default LogIn;