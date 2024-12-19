import React from "react";
import "./productDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const Detail = () => {
  // Données fictives
  const product = {
    id: 1,
    name: "Montre Intelligente X200",
    description:
      "Une montre connectée moderne avec des fonctionnalités avancées pour suivre votre santé et votre style de vie.",
    price: 199.99,
    images: [
      "https://via.placeholder.com/400x300?text=Image+1",
      "https://via.placeholder.com/400x300?text=Image+2",
      "https://via.placeholder.com/400x300?text=Image+3",
    ],
    features: [
      "Écran AMOLED 1.5 pouces",
      "Suivi de la fréquence cardiaque 24/7",
      "Autonomie de 7 jours",
      "Résistance à l'eau 5 ATM",
    ],
    reviews: [
      {
        id: 1,
        user: "Alice",
        rating: 5,
        comment: "Excellent produit, très pratique !",
      },
      { id: 2, user: "Bob", rating: 4, comment: "Bon rapport qualité-prix." },
    ],
    recommendations: [
      { id: 2, name: "Montre Intelligente X300", price: 249.99 },
      { id: 3, name: "Bracelet Connecté Y100", price: 99.99 },
    ],
  };

  return (
    <>
    <Sidebar/>
    <div className="product-detail-container">
        
      {/* Titre */}
      <h1 className="product-title">{product.name}</h1>

      {/* Carrousel d'images */}
      <div className="product-images">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Produit ${index + 1}`}
            className="product-image"
          />
        ))}
      </div>

      {/* Description et Prix */}
      <p className="product-description">{product.description}</p>
      <h2 className="product-price">${product.price.toFixed(2)}</h2>

      {/* Fonctionnalités */}
      <h3 className="section-title">Caractéristiques :</h3>
      <ul className="product-features">
        {product.features.map((feature, index) => (
          <li key={index} className="feature-item">
            {feature}
          </li>
        ))}
      </ul>

      {/* Avis */}
      <h3 className="section-title">Avis :</h3>
      {product.reviews.length > 0 ? (
        <ul className="product-reviews">
          {product.reviews.map((review) => (
            <li key={review.id} className="review-item">
              <strong>{review.user}</strong> ({review.rating}/5) :{" "}
              {review.comment}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-reviews">Aucun avis pour le moment.</p>
      )}

      {/* Recommandations */}
      <h3 className="section-title">Produits Recommandés :</h3>
      <ul className="product-recommendations">
        {product.recommendations.map((rec) => (
          <li key={rec.id} className="recommendation-item">
            {rec.name} - ${rec.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Detail;
