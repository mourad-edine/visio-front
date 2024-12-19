import React, { useState } from "react";
import "./profil.css";

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Logic to save the profile changes (e.g., make API request)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "",
    });
  };

  return (
    <div className="profil-container">
      <div className="profil-content">
        <div className="profil-header">
          <h3>Mon Profil</h3>
        </div>
        <div className="profil-section">
          <h3>Informations Personnelles</h3>
          {isEditing ? (
            <div>
              <div className="input-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="profil-input"
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="profil-input"
                />
              </div>
              <div className="input-group">
                <label>Mot de Passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="profil-input"
                />
              </div>
              <div className="button-group">
                <button onClick={handleSave} className="save-btn">
                  Enregistrer
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>Nom :</strong> {formData.name}
              </p>
              <p>
                <strong>Email :</strong> {formData.email}
              </p>
              <p>
                <strong>Mot de Passe :</strong> ********
              </p>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Modifier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
