import React from "react";
import "./register.css";
import AdminSidebar from "../AdminSidebar";

const AddProduit = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="register-container">
        <div className="register-card">
          <h2>Créer un compte</h2>
          <form>
            <div className="input-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" placeholder="Entrez votre nom" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Entrez votre email" />
            </div>

            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Entrez votre mot de passe"
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <button type="submit" className="btn-register">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduit;
