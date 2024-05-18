import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';


const Product =  ({ producto }) => {
    const { imageProduct, title, category, conditionProduct, description, productStatus, id } = producto.productFrom;
    const [user, setUser] = useState(null);
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            };

            try {
                const response = await fetch('http://localhost:8001/api/v1/user/validate', requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);


    const handleSelectExchange = async () => {
        try {
            const token = localStorage.getItem("token");
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({  
                    productFrom: producto.productFrom,
                    productTo: producto.productTo
                })
            };

            const response = await fetch('http://localhost:8001/api/v1/select-request-exchange', requestOptions );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setResponse(responseData);
                navigate('/exchange', { state: {responseData} }); // Redirect with data
            
        } catch (error) {
            console.error('Error al seleccionar intercambio:', error);
        }
    };
    
    
    
    return (
        <div className="row">
            <div className="mb-3">
                <div className="card shadow link-product">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="card-img-top img-fluid h-100" src={imageProduct} alt={title} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title font-bold">Nombre: {title}</h5>
                                <p className="card-text">Categoria: {category}</p>
                                <p className="card-text">Descripción: {description}</p>
                                <p className="card-text">Estado: {conditionProduct}</p>
                                {user?.id == producto.productTo.user.id && (
                                    <button className='btn btn-primary' onClick={handleSelectExchange}>Seleccionar intercambio</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        

    );
};

const ProductSelect = ( {productId}) => {
    const [requestExchange, setRequestExchange] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/v1/request-exchange');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productsData = await response.json();
                const filteredProducts = productsData.filter( requestExchange => {
                    return requestExchange.productTo.id == productId;
                })
                console.log(filteredProducts);
                setRequestExchange(filteredProducts);
            } catch (error) {
                setError(error.message);
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    
    return (
        <div className="container mt-5">
            {requestExchange.length > 0 ? (
                <div className="row">
                    <h2 className='text-center h1'>Productos para intercambios</h2>
                    {requestExchange.map((requestExchange, index) => (
                        <Product key={index} producto={requestExchange} />
                    ))}
                </div>
            ) : (
                <p className="text-center h2">No hay productos disponibles para intercambio.</p>
            )}
        </div>
    );
};

export default ProductSelect;
