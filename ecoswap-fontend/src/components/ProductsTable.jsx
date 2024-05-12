import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/admin/products')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los productos');
                }
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); 

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/product/${productId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Eliminar el producto de la lista de productos mostrada en la UI
                setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
            } else {
                throw new Error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container mt-5">
            <h3 className="text-center mt-5 mb-5">PRODUCTOS</h3>
            <div className="d-flex justify-content-end">
            <Link to="/admin"><button className='mx-5 btn btn-success text-white fw-bolder'>admin View</button></Link>

                <Link to="/upload"><button className=' btn btn-success text-white fw-bolder'>Crear</button></Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre Producto</th>
                        <th scope="col">Dueño</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Condición</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.user ? product.user.name : ''}</td> {/* Verificación de null/undefined */}
                            <td>{product.category}</td>
                            <td>{product.conditionProduct}</td>
                            <td>{product.productStatus}</td>
                            <td>
                                <button className='btn btn-success text-white fw-bolder' onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable;
