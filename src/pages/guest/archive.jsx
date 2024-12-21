import React, { useEffect, useState } from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaShoppingCart, FaInfoCircle, FaVideo } from "react-icons/fa"; // Importation des icônes
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "./../../Assets/images/produit.png";
import { toast, ToastContainer } from "react-toastify"; // Pour afficher des messages toast

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel à l'API pour récupérer les produits
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/produit_all"
        );
        setProducts(response.data); // Assurez-vous que response.data est bien un tableau
      } catch (error) {
        toast.error(
          "Erreur lors du chargement des produits. Veuillez réessayer."
        );
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const user = localStorage.getItem("userId");

    if (!user || user === "null") {
      toast.error("Vous devez vous connecter pour pouvoir commander");
    } else {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setQuantity(1); // Réinitialiser la quantité
  };

  const handleConfirmOrder = async () => {
    if (!selectedProduct) return;

    const orderData = {
      product_id: selectedProduct.id,
      quantity,
    };

    try {
      await axios.post("http://localhost:8000/api/commande", orderData);
      alert("commande passé avec success !");
      console.log(orderData);
      handleModalClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande :", error);
      console.log("data :", orderData);

      alert("erreur lors de l envoie !");
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar fixe */}
      <Sidebar />
      {/* Liste des produits avec scroll */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={image} alt={product.name} />
            <h4>{product.nom_produit}</h4>
            <p>{product.descriptions}</p>
            <span className="price">{product.prix} €</span>
            <div className="card-buttons">
              <button
                className="btn add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajouter au panier</h2>
            <p>
              <strong>Produit :</strong> {selectedProduct.nom_produit}
            </p>
            <p>
              <strong>Prix unitaire :</strong> {selectedProduct.prix} €
            </p>
            <div className="quantity-input">
              <label htmlFor="quantity">Quantité :</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button className="btn confirm" onClick={handleConfirmOrder}>
                ajouter au panier
              </button>
              <button className="btn cancel" onClick={handleModalClose}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
