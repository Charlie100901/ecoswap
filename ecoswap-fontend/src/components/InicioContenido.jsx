import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Producto = ({ producto }) => {
  const { imageProduct, title, category, conditionProduct, description, productStatus, id } = producto;
  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-lg link-product">
        <Link to={`/product/${id}`} className='text-decoration-none text-black'>
          <img className="card-img-top imagen-producto " src={imageProduct} alt={title} />
          <div className="card-body">
            <h5 className="card-title font-bold">Nombre: {title}</h5>
            <p className="card-text">Categoría: {category}</p>
            <p className="card-text">Descripción: {description}</p>
            <p className="card-text">Estado: {conditionProduct}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const InicioContenido = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const {category} = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(category);

        const response = category
          ? await fetch(`http://localhost:8080/api/v1/products/${category}`)
          : await fetch('http://localhost:8080/api/v1/products');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchProducts();
  }, [category]);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center h1'>Productos para intercambios</h2>
      <div className="row">
        {products.map((producto, index) => (
          <Producto key={index} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default InicioContenido;
