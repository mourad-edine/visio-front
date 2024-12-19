import React from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone XYZ",
      description: "Un smartphone avec des fonctionnalités avancées.",
      price: "299 €",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Chaussures de sport",
      description: "Confortables et légères pour vos activités.",
      price: "79 €",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Montre connectée",
      description: "Gardez le contrôle de votre journée.",
      price: "149 €",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Enceinte Bluetooth",
      description: "Un son clair et puissant.",
      price: "59 €",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Sac à dos",
      description: "Idéal pour vos déplacements quotidiens.",
      price: "39 €",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Machine à café",
      description: "Préparez votre café préféré facilement.",
      price: "99 €",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="home-container">
      {/* Sidebar fixe */}
      <Sidebar />
      {/* Liste des produits avec scroll */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <span className="price">{product.price}</span>
            <div className="card-buttons">
              <button className="btn add-to-cart">Ajouter au panier</button>
              <button className="btn details">Détails</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
