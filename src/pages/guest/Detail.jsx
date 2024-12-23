import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import image from "./../../Assets/images/produit.png";
import { FaVideo } from "react-icons/fa"; // Importation des icônes
import { io } from "socket.io-client"; // Socket.io client

const Detail = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Références pour WebRTC
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const socket = useRef(null);

  const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    // Charger les détails du produit depuis l'API
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://visishop.youpihost.fr/back/public/api/detail_produit/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();

    // Initialisation du socket
    socket.current = io("http://localhost:8000");

    // Gestion des signaux WebRTC
    socket.current.on("offer", async (offer) => {
      await handleAnswerCall(offer);
    });

    socket.current.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(answer);
    });

    socket.current.on("ice-candidate", async (candidate) => {
      if (candidate) {
        await peerConnection.current.addIceCandidate(candidate);
      }
    });

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [id]);

  const handleStartCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;

    peerConnection.current = new RTCPeerConnection(servers);

    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    peerConnection.current.ontrack = (event) => {
      const [remoteStream] = event.streams;
      remoteVideoRef.current.srcObject = remoteStream;
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", event.candidate);
      }
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.current.emit("offer", offer);

    setIsCallActive(true);
  };

  const handleAnswerCall = async (offer) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;

    peerConnection.current = new RTCPeerConnection(servers);

    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    peerConnection.current.ontrack = (event) => {
      const [remoteStream] = event.streams;
      remoteVideoRef.current.srcObject = remoteStream;
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", event.candidate);
      }
    };

    await peerConnection.current.setRemoteDescription(offer);

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.current.emit("answer", answer);

    setIsCallActive(true);
  };

  const handleStopCall = () => {
    if (peerConnection.current) peerConnection.current.close();
    if (localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setIsCallActive(false);
  };

  if (loading) {
    return (
      <p className="loading-message">Chargement des détails du produit...</p>
    );
  }

  if (!product) {
    return <p className="error-message">Produit introuvable.</p>;
  }

  // Produits similaires fictifs
  const similarProducts = [
    { id: 2, name: "suggestion", price: 120.99, image: image },
    { id: 3, name: "suggestion", price: 89.99, image: image },
    { id: 4, name: "suggestion", price: 150.0, image: image },
  ];

  return (
    <>
      <Sidebar />
      <div className="product-detail-container">
        <h1 className="product-title">
          {product.nom_produit || "Nom du produit indisponible"}
        </h1>

        <div className="product-images">
          <img
            src={
              product.image !== "pas d'image" && product.image
                ? product.image
                : image
            }
            alt={product.nom_produit || "Produit"}
            className="product-image"
          />
        </div>

        <p className="product-description">
          {product.descriptions || "Aucune description disponible"}
        </p>
        <h2 className="product-price">
          {product.prix ? `${product.prix} €` : "Prix non disponible"}
        </h2>

        <button className="order-button">Commander Maintenant</button>
        <button
          className="btn video-calls botos"
          onClick={isCallActive ? handleStopCall : handleStartCall}
        >
          <FaVideo className="icone" />
          {isCallActive ? "Terminer l'appel" : "Appel Vidéo"}
        </button>

        <div className="video-container">
          <video ref={localVideoRef} autoPlay muted className="local-video" />
          <video ref={remoteVideoRef} autoPlay className="remote-video" />
        </div>

        <p className="product-quantity">
          <strong>Quantité disponible :</strong>{" "}
          {product.quantite || "Non spécifiée"}
        </p>
        <p className="product-type">
          <strong>Type :</strong> {product.type || "Non spécifié"}
        </p>
        <p className="product-status">
          <strong>Statut :</strong> {product.status || "Non spécifié"}
        </p>

        <h3 className="section-title">Produits Similaires :</h3>
        <div className="similar-products">
          {similarProducts.map((simProd) => (
            <div key={simProd.id} className="similar-product-item">
              <img
                src={simProd.image}
                alt={simProd.name}
                className="similar-product-image"
              />
              <h4>{simProd.name}</h4>
              <p>{simProd.price.toFixed(2)} €</p>
              <button className="view-button">Voir</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;
