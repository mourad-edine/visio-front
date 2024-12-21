import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Pour afficher des messages toast
import "react-toastify/dist/ReactToastify.css"; // Style pour react-toastify
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Vérifier si un utilisateur est connecté
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/dashboard"); // Redirige vers la page principale si déjà connecté
    }
  }, [navigate]);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);
      console.log(response);
      
      if (response.data.result === "ok") {
        const userId = response.data.user.id;
        localStorage.setItem("userId", userId);
        toast.success("Connexion réussie !");
        navigate("/home");
      } else {
        toast.error(response.data.message || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast container */}
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn-login">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
