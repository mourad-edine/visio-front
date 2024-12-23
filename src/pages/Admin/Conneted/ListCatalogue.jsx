import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./modal.css";
import { toast, ToastContainer } from "react-toastify"; // Pour afficher des messages toast

import AdminSidebar from "../AdminSidebar";
import axios from "axios";

const ListCatalogue = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCatalogue, setNewCatalogue] = useState({
    nom: "",
    description: "",
    reference: "",
  });

  useEffect(() => {
    // Charger les catalogues depuis l'API
    const fetchCatalogues = async () => {
      try {
        const response = await axios.get(
          "https://visishop.youpihost.fr/back/public/api/liste_catalogue"
        );
        setCatalogues(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catalogues:", error);
      }
    };

    fetchCatalogues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCatalogue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCatalogue = async () => {
    try {
      const response = await axios.post(
        "https://visishop.youpihost.fr/back/public/api/create_catalogue",
        newCatalogue
      );
                  toast.success("produit ajouté avec success.");
      
      setCatalogues((prevCatalogues) => [...prevCatalogues, response.data]);
      setShowModal(false);
      setNewCatalogue({ nom: "", description: "", reference: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du catalogue:", error);
    }
  };

  const handleDeleteCatalogue = async (id) => {
    try {
      await axios.delete(`https://visishop.youpihost.fr/back/public/api/catalogues/${id}`);
      setCatalogues((prevCatalogues) =>
        prevCatalogues.filter((catalogue) => catalogue.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du catalogue:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <AdminSidebar />
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Contenu principal */}
      <main className="main-content">
        <h3>Listes catalogues</h3>
        <button className="btnq btn-add" onClick={() => setShowModal(true)}>
          Ajouter un catalogue
        </button>
        <table className="table-liste">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Référence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogues.map((catalogue) => (
              <tr key={catalogue.id}>
                <td>{catalogue.id}</td>
                <td>{catalogue.nom_catalogue}</td>
                <td>{catalogue.descriptions}</td>
                <td>{catalogue.reference}</td>
                <td>
                  <button className="btn btn-edit">Modifier</button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteCatalogue(catalogue.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajouter un catalogue</h2>
            <div className="modal-content">
              <div className="form-group">
                <label>Nom :</label>
                <input
                  type="text"
                  name="nom"
                  value={newCatalogue.nom_produit}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description :</label>
                <textarea
                  name="description"
                  value={newCatalogue.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Référence :</label>
                <input
                  type="text"
                  name="reference"
                  value={newCatalogue.reference}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button className="btn btn-confirm" onClick={handleAddCatalogue}>
                Ajouter
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCatalogue;
