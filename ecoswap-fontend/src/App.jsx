import './App.css';
import Footer from './components/Footer';
import InicioContenido from './components/InicioContenido';
import HeaderT from './components/HeaderT';
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

function App() {
  return (
    <>
      <HeaderT></HeaderT>
      <ViewAdmin></ViewAdmin>
      <Footer></Footer>
      {/* <UploadProduct></UploadProduct>
      <ProductsTable></ProductsTable> 
      <UserTable></UserTable>
      <ExchangeOffers></ExchangeOffers>
      <ProfileUser></ProfileUser>
       <ProductView></ProductView>
      <InicioContenido></InicioContenido>
      <ExchangeView></ExchangeView>
      <Register></Register>
       <InicioSesion></InicioSesion>  */}

    </>
  );
}

export default App;