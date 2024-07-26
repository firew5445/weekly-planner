import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const { accessToken, role } = response.data;
      console.log(accessToken, role);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);

      // alert("Login successful");

      if (role === "admin") {
        navigate("/admin_dashboard");
      } else if (role === "approver") {
        navigate("/approver_dashboard");
      } else if (role === "User") {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login failed");
      setMessage("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div
        className="card card-container"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username" style={{ color: "black" }}>
              Username
            </label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ color: "black" }}>
              Password
            </label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                onChange={handleRememberMe}
              />
              <label
                className="form-check-label"
                htmlFor="rememberMe"
                style={{ color: "black" }}
              >
                Remember Me
              </label>
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          <div className="form-group" style={{ textAlign: "center" }}>
            <Link to="/forget-password" style={{ color: "blue" }}>
              Forgot Password?
            </Link>
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            <Link to="/register" style={{ color: "blue" }}>
              Create Account
            </Link>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
