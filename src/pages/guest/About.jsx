import React, { useEffect } from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        navigate("/dashboard"); // Redirige vers la page principale si déjà connecté
      }
    }, [navigate]);
  
  return (
    <div className="about-container">
      <div className="about-header">
        <h3>À propos de nous</h3>
      </div>
      <div className="about-content">
        <section>
          <h2>Notre Mission</h2>
          <p>
            Bienvenue sur <strong>ShopMaster</strong>, votre plateforme en ligne dédiée à
            la découverte, la sélection et l'achat des meilleurs produits. Notre mission
            est de vous offrir une expérience d'achat simple, intuitive et enrichissante,
            en mettant en avant des produits de qualité pour toutes vos envies.
          </p>
        </section>

        <section>
          <h2>Qui sommes-nous ?</h2>
          <p>
            Fondé en 2024, ShopMaster est né de la volonté de créer une marketplace
            moderne et accessible où chaque utilisateur peut explorer des articles variés,
            comparer facilement et faire des achats en toute confiance. Nous travaillons
            avec des partenaires fiables pour garantir la satisfaction de nos clients.
          </p>
        </section>

        <section>
          <h2>Nos Fonctionnalités</h2>
          <ul>
            <li>
              <strong>Catégories variées :</strong> Découvrez des produits dans des
              catégories comme <em>Électronique</em>, <em>Vêtements</em>, <em>Maison</em>,{" "}
              <em>Sports</em> et bien plus encore.
            </li>
            <li>
              <strong>Filtres intelligents :</strong> Utilisez nos filtres pour affiner vos
              recherches par catégorie, taille, prix et disponibilité.
            </li>
            <li>
              <strong>Expérience personnalisée :</strong> Recevez des recommandations
              adaptées à vos préférences.
            </li>
            <li>
              <strong>Sécurité et confiance :</strong> Toutes vos transactions sont
              sécurisées, et nous garantissons la confidentialité de vos données.
            </li>
          </ul>
        </section>

        <section>
          <h2>Pourquoi choisir ShopMaster ?</h2>
          <p>
            Chez ShopMaster, nous plaçons l'utilisateur au cœur de nos préoccupations. Que
            vous cherchiez des articles du quotidien ou des produits spécifiques, nous
            vous accompagnons tout au long de votre parcours d'achat pour vous offrir une
            satisfaction optimale.
          </p>
          <p>
            <strong>Rejoignez-nous</strong> dès aujourd'hui et découvrez une nouvelle façon
            de magasiner en ligne.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
