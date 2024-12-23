import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./pages/Layout.jsx";
import About from "./pages/guest/About.jsx";
import Home from "./pages/guest/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/register.jsx";
import Commande from "./pages/User/Commande.jsx";
import Profil from "./pages/User/Profil.jsx";
import Dashboard from "./pages/Admin/Conneted/Dashboard.jsx";
import ListCategorie from "./pages/Admin/Conneted/ListCategorie.jsx";
import ListProduit from "./pages/Admin/Conneted/ListProduit.jsx";
import Detail from "./pages/guest/Detail.jsx";
import CommandeAdmin from "./pages/Admin/Conneted/Commande.jsx";
import ListCatalogue from "./pages/Admin/Conneted/ListCatalogue.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Définit Home comme la page par défaut pour "/" */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="commande" element={<Commande />} />
          <Route path="commande-admin" element={<CommandeAdmin />} />
          <Route path="catalogue-admin" element={<ListCatalogue />} />
          <Route path="profil" element={<Profil />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="list-categorie" element={<ListCategorie />} />
          <Route path="list-produit" element={<ListProduit />} />
          <Route path="details/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
