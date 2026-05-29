import React, { useState } from "react";
import API from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await API.post("/signup", formData);

      alert(response.data.message);
    } catch (error) {
      const message = error.response?.data?.message || "Backend connection failed";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignup} style={styles.container}>
      <h2>Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={styles.input}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        style={styles.button}
      >
        {isSubmitting ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "100px auto",
    gap: "10px",
  },

  input: {
    padding: "10px",
    fontSize: "16px",
  },

  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Signup;
