import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./modal.css";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Pour afficher des messages toast

const ListCategorie = () => {
  const [categories, setCategories] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategorie, setNewCategorie] = useState({
    nom_categorie: "",
    description: "",
    catalogue_id: "",
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Charger les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost/visio/back/public/api/liste_categorie"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };

    // Charger les catalogues pour le select
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

    fetchCategories();
    fetchCatalogues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategorie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleAddCategorie = async () => {
    const user_id = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("nom_categorie", newCategorie.nom_categorie);
    formData.append("description", newCategorie.description);
    formData.append("catalogue_id", newCategorie.catalogue_id);
    formData.append("user_id", user_id);
    if (photo) {
      formData.append("image", photo);
    }

    try {
      const response = await axios.post(
        "http://localhost/visio/back/public/api/create_categorie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Catégorie ajoutée avec succès.");
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setShowModal(false);
      setNewCategorie({ nom_categorie: "", description: "", catalogue_id: "" });
      setPhoto(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      toast.error("Erreur lors de l'ajout de la catégorie.");
    }
  };

  const handleDeleteCategorie = async (id) => {
    try {
      await axios.delete(
        `https://visishop.youpihost.fr/back/public/api/categories/${id}`
      );
      setCategories((prevCategories) =>
        prevCategories.filter((categorie) => categorie.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <ToastContainer position="top-right" autoClose={3000} />

      <main className="main-content">
        <h3>Liste des Catégories</h3>
        <button className="btnq btn-add" onClick={() => setShowModal(true)}>
          Ajouter une catégorie
        </button>
        <table className="table-liste">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Catalogue</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie.id}>
                <td>{categorie.id}</td>
                <td>{categorie.nom_categorie}</td>
                <td>{categorie.descriptions}</td>
                <td>{categorie.catalogue_id}</td>
                <td>
                  {categorie.photos && (
                    <img
                      src={`http://localhost/visio/back/public/storage/${categorie.photos}`}
                      alt={categorie.nom_categorie}
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
                    onClick={() => handleDeleteCategorie(categorie.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajouter une catégorie</h2>
            <div className="modal-content">
              <div className="form-group">
                <input
                  type="text"
                  name="nom_categorie"
                  value={newCategorie.nom_categorie}
                  onChange={handleInputChange}
                  placeholder="Nom"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  value={newCategorie.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
              <div className="form-group">
                <select
                  name="catalogue_id"
                  value={newCategorie.catalogue_id}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Sélectionner un catalogue
                  </option>
                  {catalogues.map((catalogue) => (
                    <option key={catalogue.id} value={catalogue.id}>
                      {catalogue.nom_catalogue}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  aria-label="Photo"
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button className="btn btn-confirm" onClick={handleAddCategorie}>
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

export default ListCategorie;
