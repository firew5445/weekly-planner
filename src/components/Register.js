import React, { useState, useRef } from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./Register.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block" style={{ color: "red" }}>
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block" style={{ color: "red" }}>
        This is not a valid email.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate(); // Initialize navigate here

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState(""); // Level state
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [validInputs, setValidInputs] = useState({
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    password: true,
    sex: true,
    role: true,
    department: true,
    level: true,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          {
            firstName,
            lastName,
            username,
            email,
            password,
            sex,
            role,
            department,
            level: level ? parseInt(level, 10) : null, // Convert level to number or set to null
          }
        );

        setMessage(response.data.message);
        setSuccessful(true);
        navigate("/login"); // Navigate to login page after successful registration
      } catch (error) {
        console.error("Registration error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An error occurred during registration.");
        }
        setSuccessful(false);
      }
    } else {
      setMessage("Please fix the errors in the form.");
      setSuccessful(false);
    }
  };

  const handleChange = (field, value) => {
    let valid = true;

    if (field === "firstName" || field === "lastName") {
      valid = !/\d/.test(value);
    } else if (field === "username") {
      valid = /^[a-zA-Z0-9_]+$/.test(value);
    } else if (field === "email") {
      valid = isEmail(value);
    } else {
      valid = value !== "";
    }

    setValidInputs({
      ...validInputs,
      [field]: valid,
    });

    if (field === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "sex":
        setSex(value);
        break;
      case "role":
        setRole(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "level":
        setLevel(value);
        break;
      default:
        break;
    }
  };

  const getInputStyle = (field) => {
    return validInputs[field] ? {} : { borderColor: "red" };
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length > 10) {
      strength = 3;
    } else if (password.length > 6) {
      strength = 2;
    } else if (password.length > 0) {
      strength = 1;
    }

    return strength;
  };

  const generateRomanNumeral = (num) => {
    const romanNumerals = {
      1: "I",
      2: "II",
      3: "III",
      4: "IV",
      5: "V",
      6: "VI",
      7: "VII",
      8: "VIII",
      9: "IX",
      10: "X",
      11: "XI",
      12: "XII",
      13: "XIII",
      14: "XIV",
      15: "XV",
    };
    return romanNumerals[num];
  };

  return (
    <div className="col-md-12">
      <div
        className="card card-container"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="firstName" style={{ color: "black" }}>
                  First Name
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("firstName")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" style={{ color: "black" }}>
                  Last Name
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("lastName")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" style={{ color: "black" }}>
                  Username
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("username")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ color: "black" }}>
                  Email
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  validations={[required, validEmail]}
                  style={getInputStyle("email")}
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
                  onChange={(e) => handleChange("password", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("password")}
                />
                <div className="password-strength">
                  <div
                    className={`strength-bar ${
                      passwordStrength >= 1 ? "filled" : ""
                    }`}
                  />
                  <div
                    className={`strength-bar ${
                      passwordStrength >= 2 ? "filled" : ""
                    }`}
                  />
                  <div
                    className={`strength-bar ${
                      passwordStrength >= 3 ? "filled" : ""
                    }`}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sex" style={{ color: "black" }}>
                  Sex
                </label>
                <select
                  className="form-control"
                  name="sex"
                  value={sex}
                  onChange={(e) => handleChange("sex", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("sex")}
                >
                  <option value="">Select Sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level" style={{ color: "black" }}>
                  Level
                </label>
                <select
                  className="form-control"
                  name="level"
                  value={level}
                  onChange={(e) => handleChange("level", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("level")}
                >
                  <option value="">Select Level</option>
                  {[...Array(15)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {generateRomanNumeral(index + 1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="role" style={{ color: "black" }}>
                  Role
                </label>
                <select
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("role")}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="approver">Approver</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department" style={{ color: "black" }}>
                  Department
                </label>
                <select
                  className="form-control"
                  name="department"
                  value={department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  validations={[required]}
                  style={getInputStyle("department")}
                >
                  <option value="">Select Department</option>
                  <option value="Electronic Services and Application Development Directorate">
                    ESAADD
                  </option>
                  <option value="Planning and Budget Preparation Monitoring and Evaluation Directorate">
                    PABPMAED
                  </option>
                  <option value="Directorate of Procurement Finance and Property Management">
                    DOPFAPM
                  </option>
                  <option value="Access to Science and Technology, Radiation Protection and Intellectual Property Protection Directorate">
                    STRPIPD
                  </option>
                  <option value="Ecote Infrastructure and Service Management Directorate">
                    EISMD
                  </option>
                  <option value="Directorate of Human Resource Management">
                    DHRM
                  </option>
                  <option value="Ecote Private Entrepreneurship and Community Information Centers Management Directorate">
                    EPEACICMD
                  </option>
                  <option value="Internal Audit Support and Monitoring Directorate">
                    IASAMD
                  </option>
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
                style={{ color: "white" }}
              >
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

export default Register;
