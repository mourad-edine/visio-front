import React from 'react';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebars">
        <h3>Menu</h3>
        <ul className='liste'>
          <li>
            <NavLink className="nav-link" to="home">Accueil</NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="home">Commande</NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="home">Liste Catégorie</NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="home">Liste Produit</NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="home">Paramètres</NavLink>
          </li>
        </ul>
      </aside>

      {/* Contenu principal */}
      <main className="main-content">
        <h3>Dashboard</h3>
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

export default Dashboard;


