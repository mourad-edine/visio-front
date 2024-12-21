import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify"; // Importation de react-toastify
import "react-toastify/dist/ReactToastify.css"; // Style pour react-toastify
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

   const navigate = useNavigate();
  useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        navigate("/dashboard"); // Redirige vers la page principale si déjà connecté
      }
    }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/create_user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        toast.success("Inscription réussie !");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast container */}
      <div className="register-card">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="Entrez votre nom"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-register">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
