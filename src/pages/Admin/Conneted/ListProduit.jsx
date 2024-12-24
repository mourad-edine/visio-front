import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./modal.css";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Pour afficher des messages toast

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
    image: null, // Nouveau champ pour l'image
  });

  useEffect(() => {
    // Charger les produits et les catégories
    const fetchData = async () => {
      try {
        const [produitRes, categorieRes] = await Promise.all([
          axios.get("http://localhost/visio/back/public/api/produit_all"),
          axios.get("http://localhost/visio/back/public/api/liste_categorie"),
        ]);
        setProduits(produitRes.data);
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

  const handleFileChange = (e) => {
    setNewProduit((prevState) => ({
      ...prevState,
      image: e.target.files[0], // Gérer l'image
    }));
  };

  const handleAddProduit = async () => {
    try {
      const formData = new FormData();
      Object.keys(newProduit).forEach((key) => {
        formData.append(key, newProduit[key]);
      });

      const response = await axios.post(
        "http://localhost/visio/back/public/api/create_produit",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Produit ajouté avec succès.");
      setProduits((prevProduits) => [...prevProduits, response.data]);
      setShowModal(false);
      setNewProduit({
        nom_produit: "",
        descriptions: "",
        prix: "",
        quantite: "",
        categorie_id: "",
        user_id: localStorage.getItem("userId"),
        image: null,
      });
    } catch (error) {
      console.log(newProduit);
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  const handleDeleteProduit = async (id) => {
    try {
      await axios.delete(
        `http://localhost/visio/back/public/api/produits/${id}`
      );
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
      <ToastContainer position="top-right" autoClose={3000} />

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
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>{produit.id}</td>
                <td>{produit.nom_produit}</td>
                <td>{produit.descriptions}</td>
                <td>{produit.prix} €</td>
                <td>{produit.quantite}</td>
                <td>{produit.categorie_id}</td>
                <td>
                  {produit.image ? (
                    <img
                      src={`http://localhost/visio/back/public/storage/${produit.image}`}
                      alt={produit.nom_produit}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "Aucune image"
                  )}
                </td>
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
                <input
                  type="text"
                  name="nom_produit"
                  value={newProduit.nom_produit}
                  onChange={handleInputChange}
                  placeholder="Nom du produit"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="descriptions"
                  value={newProduit.descriptions}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="prix"
                  value={newProduit.prix}
                  onChange={handleInputChange}
                  placeholder="Prix"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="quantite"
                  value={newProduit.quantite}
                  onChange={handleInputChange}
                  placeholder="Quantité"
                />
              </div>
              <div className="form-group">
                <select
                  name="categorie_id"
                  value={newProduit.categorie_id}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Sélectionnez une catégorie
                  </option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.nom_categorie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  aria-label="Image"
                />
              </div>
              
            </div>
            <div className="modal-buttons">
              <button className="btn btn-confirm" onClick={handleAddProduit}>
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
