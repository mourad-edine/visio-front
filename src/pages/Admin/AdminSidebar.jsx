import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("type");
    if (userType !== "1") {
      navigate("/home"); // Rediriger vers la page de login si l'utilisateur n'est pas autorisé
    }
  }, [navigate]);

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
            <NavLink className="nav-link" to="/commande-admin">
              Commande
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/catalogue-admin">
              Catalogue
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/list-categorie">
              Liste Catégorie
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/list-produit">
              Liste Produit
            </NavLink>
          </li>
          <li>
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
