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

  useEffect(() => {
    // Charger les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/liste_categorie"
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
          "http://localhost:8000/api/liste_catalogue"
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

  const handleAddCategorie = async () => {
    const user_id = localStorage.getItem("userId");
    const data = { ...newCategorie, user_id };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create_categorie",
        data
      );
            toast.success("produit ajouté avec success.");
      
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setShowModal(false);
      setNewCategorie({ nom_categorie: "", description: "", catalogue_id: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
  };

  const handleDeleteCategorie = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
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
                <label>Nom :</label>
                <input
                  type="text"
                  name="nom_categorie"
                  value={newCategorie.nom_categorie}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description :</label>
                <textarea
                  name="description"
                  value={newCategorie.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Catalogue :</label>
                <select
                  name="catalogue_id"
                  value={newCategorie.catalogue_id}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un catalogue</option>
                  {catalogues.map((catalogue) => (
                    <option key={catalogue.id} value={catalogue.id}>
                      {catalogue.nom_catalogue}
                    </option>
                  ))}
                </select>
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
