import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebars">
        <h3>Menu</h3>
        <ul className="liste">
          <li>
            <NavLink className="nav-link" to="/dashboard">
              Accueil
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="/commande-admin">
              Commande
            </NavLink>
            
          </li>
          <li>
              {" "}
              <NavLink className="nav-link" to="/catalogue-admin">
                catalogue
              </NavLink>
            </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="/list-categorie">
              Liste Catégorie
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="/list-produit">
              Liste Produit
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink className="nav-link" to="/dashboard">
              Paramètres
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminSidebar;
