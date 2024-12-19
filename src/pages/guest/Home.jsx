import React from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import phone from "./../../Assets/images/phone.jpg";
import cafe from "./../../Assets/images/café.jpg";
import sac from "./../../Assets/images/sac à dos.jpg";
import montre from "./../../Assets/images/montre.jpg";
import enceinte from "./../../Assets/images/enceinte.jpg";
import chaussure from "./../../Assets/images/chaussure.jpg";
import { FaShoppingCart, FaInfoCircle, FaVideo } from "react-icons/fa"; // Importation de l'icône vidéo

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone XYZ",
      description: "Un smartphone avec des fonctionnalités avancées.",
      price: "299 €",
      image: phone,
    },
    {
      id: 2,
      name: "Chaussures de sport",
      description: "Confortables et légères pour vos activités.",
      price: "79 €",
      image: chaussure,
    },
    {
      id: 3,
      name: "Montre connectée",
      description: "Gardez le contrôle de votre journée.",
      price: "149 €",
      image: montre,
    },
    {
      id: 4,
      name: "Enceinte Bluetooth",
      description: "Un son clair et puissant.",
      price: "59 €",
      image: enceinte,
    },
    {
      id: 5,
      name: "Sac à dos",
      description: "Idéal pour vos déplacements quotidiens.",
      price: "39 €",
      image: sac,
    },
    {
      id: 6,
      name: "Machine à café",
      description: "Préparez votre café préféré facilement.",
      price: "99 €",
      image: cafe,
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
              <button className="btn add-to-cart">
                <FaShoppingCart />
              </button>
              <button className="btn details">
                <FaInfoCircle /> Détails
              </button>
              <button className="btn video-call boto">
                <FaVideo className="icone" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
