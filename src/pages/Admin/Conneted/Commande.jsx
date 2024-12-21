import React from 'react';
import './Dashboard.css';
import AdminSidebar from '../AdminSidebar';

const CommandeAdmin = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <AdminSidebar/>

      {/* Contenu principal */}
      <main className="main-content">
        <h3>Listes des commandes</h3>
        <table className="table-liste">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Produit A</td>
              <td>Description du produit A</td>
              <td>
                <button className="btn btn-edit">Modifier</button>
                <button className="btn btn-delete">Supprimer</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Produit B</td>
              <td>Description du produit B</td>
              <td>
                <button className="btn btn-edit">Modifier</button>
                <button className="btn btn-delete">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CommandeAdmin;


