import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Producto = ({ producto }) => {
    const { imageProduct, title, category, conditionProduct, description, productStatus, id } = producto;
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOptionsToggle = () => {
        setShowOptions(!showOptions);
    };
    
    const handleEditProduct = () => {
        setShowModal(true);
    };

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        productStatus: '',
        conditionProduct: '',
        file: null,
        description: ''
    });
    
    
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
            formDataToSend.append('file', formData.file);
            formDataToSend.append('productStatus', 'activo');
        }
        try {
            const token = localStorage.getItem('token');
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            };
            const response = await fetch(`http://localhost:8001/api/v1/product/${id}/update`, requestOptions);
            if (response.ok) {
                //Recibir la respuesta del backend
                const responseData = await response.json();
                console.log(responseData);
                location.reload();
               
                
            } else {

            }



        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };
    

    const handleDeleteProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8001/api/v1/product/${id}/delete`,{
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`}
            });

            if(response.ok){
                const data = await response.json();
                location.reload();
                console.log(data);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <div className="col-md-4 mb-3">
             <Link to={`/product/${id}`} className='text-decoration-none text-black'>
            <div className="card shadow-lg link-product">
                <img className="card-img-top imagen-producto" src={imageProduct} alt={title} />
                <div className="card-body">
                    <h5 className="card-title font-bold">Nombre: {title}</h5>
                    <p className="card-text">Categoría: {category}</p>
                    <p className="card-text">Descripción: {description}</p>
                    <p className="card-text">Estado: {conditionProduct}</p>
                </div>
                <div className="position-absolute bottom-0 end-0 mb-2">
                    <img src='config.png' height="30px" alt="Configuración" onClick={handleOptionsToggle} style={{ cursor: 'pointer' }} />
                    {showOptions && (
                        <div className="card position-absolute bottom-100 end-0 " style={{ width: '200px' }}>
                            <div className="card-body">
                                <button className="btn btn-danger me-2" onClick={handleDeleteProduct}>Eliminar Producto</button>
                                <button className="btn btn-primary mt-2" onClick={handleEditProduct}>Editar Producto</button>
                            </div>
                        </div>
                    )}
                </div>
            </div></Link>
            {showModal && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-2">
                            <form onSubmit={handleSubmit}>
                                <div className="row mt-5">
                                    <div className="col">
                                        <h5>Nombre Producto</h5>
                                        <input type="text" className="form-control-lg" placeholder="Nombre Producto" aria-label="Nombre Producto" name='title' onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <h5>Categoría</h5>
                                        <select className="form-select" aria-label="Categoría" name='category' onChange={handleChange}>
                                            <option defaultValue>Selecciona una opción</option>
                                            <option value="tecnologia">Tecnología</option>
                                            <option value="arte">Arte</option>
                                            <option value="deporte">Deporte</option>
                                            <option value="ropa">Ropa</option>
                                            <option value="juguete">Juguetes</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <h5>Estado del producto</h5>
                                        <select className="form-select" aria-label="Estado del Producto" name='conditionProduct' onChange={handleChange}>
                                            <option defaultValue>Selecciona una opción</option>
                                            <option value="nuevo">Nuevo</option>
                                            <option value="usado">Usado</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <h5>Subir imagen del producto</h5>
                                        <input className="form-control form-control-lg" id="formFileLg" type="file" name='file' onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <h5>Agregar descripción</h5>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <button className='btn btn-success w-100 p-3 rounded' type='submit'>Actualizar Producto</button>
                                    </div>
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}        

        </div>

    );
  };




const ProfileUser = () => {
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    if(token == null){
        window.location.href = "/";
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8001/api/v1/user/validate', {
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
    
                    const response = await fetch('http://localhost:8001/api/v1/products/find/user', data);
    
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
                    <h3 className='text-center'>Productos subidos para intercambio</h3>
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
