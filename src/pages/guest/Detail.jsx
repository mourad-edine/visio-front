import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import image from "./../../Assets/images/produit.png";
import { FaVideo } from "react-icons/fa"; // Importation des icônes

const Detail = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les détails du produit depuis l'API
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/detail_produit/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <p className="loading-message">Chargement des détails du produit...</p>
    );
  }

  if (!product) {
    return <p className="error-message">Produit introuvable.</p>;
  }

  // Produits similaires fictifs
  const similarProducts = [
    { id: 2, name: "suggestion", price: 120.99, image: image },
    { id: 3, name: "suggestion", price: 89.99, image: image },
    { id: 4, name: "suggestion", price: 150.0, image: image },
  ];

  return (
    <>
      <Sidebar />
      <div className="product-detail-container">
        {/* Titre */}
        <h1 className="product-title">
          {product.nom_produit || "Nom du produit indisponible"}
        </h1>

        {/* Image */}
        <div className="product-images">
          <img
            src={
              product.image !== "pas d'image" && product.image
                ? product.image
                : image
            }
            alt={product.nom_produit || "Produit"}
            className="product-image"
          />
        </div>

        {/* Description et Prix */}
        <p className="product-description">
          {product.descriptions || "Aucune description disponible"}
        </p>
        <h2 className="product-price">
          {product.prix ? `${product.prix} €` : "Prix non disponible"}
        </h2>

        {/* Bouton Commander */}
        <button className="order-button">Commander Maintenant</button>
        <button className="btn video-calls botos">
          <FaVideo className="icone" />
        </button>

        {/* Quantité */}
        <p className="product-quantity">
          <strong>Quantité disponible :</strong>{" "}
          {product.quantite || "Non spécifiée"}
        </p>

        {/* Type */}
        <p className="product-type">
          <strong>Type :</strong> {product.type || "Non spécifié"}
        </p>

        {/* Statut */}
        <p className="product-status">
          <strong>Statut :</strong> {product.status || "Non spécifié"}
        </p>

        {/* Produits Similaires */}
        <h3 className="section-title">Produits Similaires :</h3>
        <div className="similar-products">
          {similarProducts.map((simProd) => (
            <div key={simProd.id} className="similar-product-item">
              <img
                src={simProd.image}
                alt={simProd.name}
                className="similar-product-image"
              />
              <h4>{simProd.name}</h4>
              <p>{simProd.price.toFixed(2)} €</p>
              <button className="view-button">Voir</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;
