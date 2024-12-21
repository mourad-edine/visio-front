import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./modal.css";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";

const ListProduit = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduit, setNewProduit] = useState({
    nom_produit: "",
    descriptions: "",
    prix: "",
    quantite: "",
    categorie_id: "",
    user_id: localStorage.getItem("userId"),
  });

  useEffect(() => {
    // Charger les produits et les catégories
    const fetchData = async () => {
      try {
        const [produitRes, categorieRes] = await Promise.all([
          axios.get("http://localhost:8000/api/produit_all"),
          axios.get("http://localhost:8000/api/liste_categorie"),
        ]);
        setProduits(produitRes.data); // Pas besoin de .data[0]
        setCategories(categorieRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create_produit",
        newProduit
      );
      setProduits((prevProduits) => [...prevProduits, response.data]);
      setShowModal(false);
      setNewProduit({
        nom_produit: "",
        descriptions: "",
        prix: "",
        quantite: "",
        categorie_id: "",
        user_id: localStorage.getItem("userId"),
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  const handleDeleteProduit = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/produits/${id}`);
      setProduits((prevProduits) =>
        prevProduits.filter((produit) => produit.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <main className="main-content">
        <h3>Liste des produits</h3>
        <button className="btnq btn-add" onClick={() => setShowModal(true)}>
          Ajouter un produit
        </button>
        <table className="table-liste">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>{produit.id}</td>
                <td>{produit.nom_produit || "Non spécifié"}</td>
                <td>{produit.descriptions}</td>
                <td>{produit.prix} €</td>
                <td>{produit.quantite}</td>
                <td>{categories.find(cat => cat.id === produit.categorie_id)?.nom_categorie || "Inconnue"}</td>
                <td>
                  <button className="btn btn-edit">Modifier</button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteProduit(produit.id)}
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
            <h2>Ajouter un produit</h2>
            <div className="modal-content">
              <div className="form-group">
                <label>Nom du produit :</label>
                <input
                  type="text"
                  name="nom_produit"
                  value={newProduit.nom_produit}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description :</label>
                <textarea
                  name="descriptions"
                  value={newProduit.descriptions}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Prix :</label>
                <input
                  type="number"
                  name="prix"
                  value={newProduit.prix}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Quantité :</label>
                <input
                  type="number"
                  name="quantite"
                  value={newProduit.quantite}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Catégorie :</label>
                <select
                  name="categorie_id"
                  value={newProduit.categorie_id}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.nom_categorie}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="btn btn-confirm"
                onClick={handleAddProduit}
              >
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

export default ListProduit;
