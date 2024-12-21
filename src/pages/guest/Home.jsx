import React, { useEffect, useState } from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaShoppingCart, FaInfoCircle, FaVideo } from "react-icons/fa"; // Importation des icônes
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from './../../Assets/images/produit.png'

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel à l'API pour récupérer les produits
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/produit_all");
        console.log(response.data);
        // Si les produits sont dans un tableau imbriqué, accédez au premier élément
        setProducts(response.data[0]);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Sidebar fixe */}
      <Sidebar />
      {/* Liste des produits avec scroll */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={image} alt={product.name} />
            <h4>{product.nom_produit}</h4>
            <p>{product.descriptions}</p>
            <span className="price">{product.prix} €</span>
            <div className="card-buttons">
              <button className="btn add-to-cart">
                <FaShoppingCart />
              </button>
              <button
                className="btn details"
                onClick={() => navigate(`/details/${product.id}`)}
              >
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
