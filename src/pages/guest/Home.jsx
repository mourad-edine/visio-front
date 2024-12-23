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
          "https://visishop.youpihost.fr/back/public/api/produit_all"
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
    if (!user) {
      toast.error("vous devez vous connecter pour pouvoir commander");
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
      produit_id: selectedProduct.id,
      quantity,
      user_id: localStorage.getItem("userId"),
    };

    try {
      await axios.post("https://visishop.youpihost.fr/back/public/api/create_panier", orderData);
      toast.success("ajouté au panier");
      console.log(orderData);
      handleModalClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande :", error);
      console.log("data :", orderData);

      toast.success("une erreur est survenur , veuiller réessayer ! ");
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar fixe */}
      <Sidebar />
      {/* Liste des produits avec scroll */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              {/* Vérification de l'image */}
              <img
                src={
                  product.image && product.image !== "pas d'image"
                    ? product.image
                    : image
                }
                alt={product.nom_produit || "Produit"}
              />
              <h4>{product.nom_produit || "Nom indisponible"}</h4>
              <p>{product.descriptions || "Pas de description disponible"}</p>
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
                <button className="btn video-call boto" onClick={() => navigate(`/details/${product.id}`)}>
                  <FaVideo
                    className="icone"
                    
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun produit disponible</p>
        )}
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
