import React, { useState } from "react";
import "./commande.css";

const Commande = () => {
  // Exemple de données fictives pour les commandes
  const [orders, setOrders] = useState([
    { id: 1, name: "Ordinateur Portable", price: 1200, quantity: 1 },
    { id: 2, name: "Chaussures de Sport", price: 85, quantity: 2 },
    { id: 3, name: "Montre Connectée", price: 199, quantity: 1 },
    { id: 4, name: "Casque Audio", price: 99, quantity: 1 },
  ]);

  // Fonction pour supprimer un produit
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
                    <button onClick={() => handleRemove(order.id)} className="remove-btn">
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
