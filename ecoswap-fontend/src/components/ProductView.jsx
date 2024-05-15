import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductSelect from './ProductSelect';


const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);   
    const token = localStorage.getItem('token');
     
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/product/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]); 


    return (
        <div className="container mt-4 mb-sm-5">
            {product && ( 
                <div className='row mb-4'>
                    <div className='col-md-5 order-md-1'>
                        <img src={`${product.imageProduct}`} alt={`${product.imageProduct} `} className="img-fluid rounded-4  zoom mx-auto d-block shadow" />
                    </div>
                    <div className='col-md-7 order-md-2  '>
                        <div className="ms-5 mb-5 ">
                            <h2>{product.title}</h2>
                            <h4>Detalles del Producto</h4>
                            <p>Descripción: {product.description}</p>
                            <p>Categoría: {product.category}</p>
                            <p>Estado: {product.conditionProduct}</p>
                            <p>Fecha de Publicación: {product.releaseDate}</p>
                            <p>Datos del Dueño del Intercambio: {product.user.name}</p>
                        </div>
                    </div>
                </div>
            )}
            {token !== null && (
                <div className="row w-50">
                    <div className="col">
                        <Link
                            to={{ pathname: "/upload", state: { product: product } }}
                            className="btn btn-primary mx-auto d-block"
                        >
                            Ofertar Producto para Intercambio
                        </Link>
                    </div>
                </div>
            )}

            <div className='row mt-5 border p-5 rounded'>
                <ProductSelect productId={id} />
            </div>
        </div>
    );
}

export default ProductView;
