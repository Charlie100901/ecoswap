import React from 'react';
import {BrowserRouter , Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import HeaderT from './components/HeaderT';
import InicioContenido from './components/InicioContenido';
import ProductView from "./components/ProductView";
import Register from './components/Register';
import InicioSesion from './components/InicioSesion';
import ExchangeView from './components/ExchangeView';
import ProfileUser from './components/ProfileUser';
import ExchangeOffers from './components/ExchangeOffers';
import UserTable from './components/UserTable';
import ProductsTable from './components/ProductsTable';
import UploadProduct from './components/UploadProduct';
import ViewAdmin from './components/ViewAdmin';
import SinHeaderFooter from './pages/SinHeaderFooter';
import ConHeaderFooter from './pages/ConHeaderFooter';


function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<ConHeaderFooter><InicioContenido /></ConHeaderFooter>} />
        <Route path="/upload" element={<ConHeaderFooter><UploadProduct /></ConHeaderFooter>} />
        <Route path="/product/:id" element={<ConHeaderFooter><ProductView  /></ConHeaderFooter>} />
        <Route path="/register" element={<SinHeaderFooter><Register /></SinHeaderFooter>} />
        <Route path="/login" element={<SinHeaderFooter><InicioSesion /></SinHeaderFooter>} />
        <Route path="/exchange" element={<ConHeaderFooter><ExchangeView /></ConHeaderFooter>} />
        <Route path="/profile" element={<ConHeaderFooter><ProfileUser  /></ConHeaderFooter>} />
        <Route path="/exchange/offers" element={<ExchangeOffers />} />
        <Route path="/admin/users" element={<ConHeaderFooter><UserTable  /></ConHeaderFooter>} />
        <Route path="/admin/products" element={<ConHeaderFooter><ProductsTable  /></ConHeaderFooter>} />
        <Route path="/admin" element={<ConHeaderFooter><ViewAdmin  /></ConHeaderFooter>} />

      </Routes>
    </div>
  );
}


export default App;
