import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import image from "./../../Assets/images/produit.png";
import {FaShoppingCart} from "react-icons/fa"; // Importation des icônes

const Detail = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les détails du produit depuis l'API
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost/visio/back/public/api/detail_produit/${id}`
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
        <h1 className="product-title">
          {product.nom_produit || "Nom du produit indisponible"}
        </h1>

        <div className="product-media">
          {/* Afficher la vidéo si disponible */}
          {product.video && product.video !== "pas de vidéo" ? (
            <video
              width="100%"
              controls
              className="product-video"
            >
              <source
                src={`http://localhost/visio/back/public/storage/${product.video}`}
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          ) : (
            // Sinon, afficher l'image par défaut
            <img
              src={
                product.image !== "pas d'image" && product.image
                  ?`http://localhost/visio/back/public/storage/${product.image}`
                  : image
              }
              alt={product.nom_produit || "Produit"}
              className="product-image"
            />
          )}
        </div>

        <h3 className="section-title">
          {product.descriptions || "Aucune description disponible"}
        </h3>
        <h2 className="product-price">
          {product.prix ? `${product.prix} €` : "Prix non disponible"}
        </h2>
        <p className="product-quantity">
          <strong>Quantité disponible :</strong>{" "}
          {product.quantite || "Non spécifiée"}
        </p>
        <p className="product-type">
          <strong>Type :</strong> {product.type || "Non spécifié"}
        </p>
        <p className="product-status">
          <strong>Statut :</strong> {product.status || "Non spécifié"}
        </p>

        <button className="btn add-to-cart">
          <FaShoppingCart className="icone"/> Commander Maintenant</button>
        {/* <button className="btn video-calls botos">
          <FaVideo className="icone" />
          Appel Vidéo
        </button> */}

        

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
