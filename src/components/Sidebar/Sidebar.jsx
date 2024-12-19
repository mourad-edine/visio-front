import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const categories = ["Électronique", "Vêtements", "Accessoires", "Maison", "Sports", "Jouets"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const applyFilters = () => {
    console.log("Catégories sélectionnées :", selectedCategories);
    console.log("Tailles sélectionnées :", selectedSizes);
  };

  return (
    <div className="sidebar">
      {/* Catégories */}
      <h3>Catégories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(category)}
                checked={selectedCategories.includes(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>

      {/* Tailles */}
      <h3>Tailles</h3>
      <ul>
        {sizes.map((size, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleSizeChange(size)}
                checked={selectedSizes.includes(size)}
              />
              {size}
            </label>
          </li>
        ))}
      </ul>

      {/* Bouton Appliquer */}
      <button className="filter-button" onClick={applyFilters}>
        Appliquer les filtres
      </button>
    </div>
  );
};

export default Sidebar;
