import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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




const ProfileUser = () => {
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/v1/user/validate', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    setUserData(data);
                    
                } else {
                    throw new Error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchUserData();
    }, []);

    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Verificar que userData no sea null antes de enviar la solicitud
                if (userData) {
                    const data = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData)
                    };
    
                    const response = await fetch('http://localhost:8080/api/v1/products/find/user', data);
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const productsData = await response.json();
                    console.log(productsData);
                    setProducts(productsData);
                }
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };
    
        fetchProducts();
    }, [userData]); // Agregar userData como dependencia para que se ejecute cuando userData cambie
    
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 mb-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                <img src="img/4096477.png" alt="LOGO ECOSWAP" width="100" height="100" />
                            </div>
                            <div className="bg-success p-2 text-dark bg-opacity-25 mt-3 mx-5 w-75 p-3 rounded">
                                <p>Nombre: {userData && userData.name}</p>
                                <p>Numero de teléfono: {userData && userData.cellphoneNumber}</p>
                                <p>Correo: {userData && userData.email}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <h3 className='text-center'>Productos disponibles para intercambio</h3>
                    <div className='row'>
                        {products && products.map((producto, index) => (
                            <Producto key={index} producto={producto} />
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
