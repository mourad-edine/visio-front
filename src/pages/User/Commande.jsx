import React, { useState, useEffect } from "react";
import axios from "axios";
import "./commande.css";

const Commande = () => {
  const [orders, setOrders] = useState([]);

  // Charger les données de l'API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/panier_all");
        const produitsResponse = await axios.get("http://localhost:8000/api/produit_all");
        const produits = produitsResponse.data;

        // Ajouter les détails des produits à chaque commande
        const ordersWithDetails = response.data.map((order) => {
          const produit = produits.find((p) => p.id === order.produit_id);
          return {
            id: order.id,
            name: produit ? produit.nom_produit : "Produit inconnu",
            price: produit ? produit.prix : 0,
            quantity: order.quantite,
          };
        });

        setOrders(ordersWithDetails);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      }
    };

    fetchOrders();
  }, []);

  // Fonction pour supprimer une commande
  const handleRemove = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  // Fonction pour calculer le total
  const calculateTotal = () => {
    return orders.reduce((total, order) => total + order.price * order.quantity, 0);
  };

  return (
    <div className="commande-container">
      <h3>Votre Commande</h3>
      {orders.length > 0 ? (
        <div>
          <table className="commande-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.price} €</td>
                  <td>{order.quantity}</td>
                  <td>{order.price * order.quantity} €</td>
                  <td>
                    <button
                      onClick={() => handleRemove(order.id)}
                      className="remove-btn"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="commande-total">
            <h3>Total : {calculateTotal()} €</h3>
          </div>
        </div>
      ) : (
        <p className="empty-message">Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Commande;
