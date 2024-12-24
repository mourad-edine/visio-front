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
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Charger les catalogues depuis l'API
    const fetchCatalogues = async () => {
      try {
        const response = await axios.get(
          "http://localhost/visio/back/public/api/liste_catalogue"
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

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleAddCatalogue = async () => {
    try {
      const formData = new FormData();
      formData.append("nom", newCatalogue.nom);
      formData.append("description", newCatalogue.description);
      formData.append("reference", newCatalogue.reference);
      if (photo) {
        formData.append("image", photo); // Nom corrigé pour correspondre au backend
      }

      const response = await axios.post(
        "http://localhost/visio/back/public/api/create_catalogue",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Produit ajouté avec succès.");
      setCatalogues((prevCatalogues) => [...prevCatalogues, response.data]);
      setShowModal(false);
      setNewCatalogue({ nom: "", description: "", reference: "" });
      setPhoto(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du catalogue :", error);
      toast.error("Erreur lors de l'ajout du produit.");
    }
  };

  const handleDeleteCatalogue = async (id) => {
    try {
      await axios.delete(
        `https://visishop.youpihost.fr/back/public/api/catalogues/${id}`
      );
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
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogues.map((catalogue) => (
              <tr key={catalogue.id}>
                <td>{catalogue.id}</td>
                <td>{catalogue.nom_catalogue}</td>
                <td>{catalogue.descriptions}</td>
                <td>--{catalogue.reference}--</td>
                <td>
                  {catalogue.photos && (
                    <img
                      src={`http://localhost/visio/back/public/storage/${catalogue.photos}`}
                      alt={catalogue.nom_catalogue}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>

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
                <input
                  type="text"
                  name="nom"
                  value={newCatalogue.nom}
                  onChange={handleInputChange}
                  placeholder="Nom"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  value={newCatalogue.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="reference"
                  value={newCatalogue.reference}
                  onChange={handleInputChange}
                  placeholder="Référence"
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  aria-label="Photo"
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
