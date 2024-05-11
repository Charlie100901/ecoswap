import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const UploadProduct = () => {
    const location = useLocation();
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

    const [showModal, setShowModal] = useState(false);

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
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            };
            const response = await fetch('http://localhost:8080/api/v1/product', requestOptions);
            if (response.ok) {;
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    location.reload();
                }, 2000);
                //Recibir la respuesta del backend
                const responseData = await response.json();

                // Acceder al estado del producto enviado desde ProductView
                const { product } = location.state;

                // Crear el objeto de datos a enviar
                const requestData = {
                    productTo: {
                        id: product.id 
                    },
                    productFrom: {
                        id: responseData.id 
                    }
                };

                // Realizar la otra petición a la API utilizando los datos necesarios
                const requestOptionsExchange = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                };
                const responseExchange = await fetch("http://localhost:8080/api/v1/request-exchange/create", requestOptionsExchange);
                if(responseExchange.ok){
                    console.log("Solicitud de intercambio creada exitosamente");
                }else{
                    console.log("Error al crear la solicitud de intercambio");
                }
                
            } else {

            }



        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    


    return (
        <div className='container mt-5'>
            <div className='p-4 shadow-sm'>
                <h3 className="text-center">NUEVO PRODUCTO</h3>
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
                            <button className='btn btn-success w-100 p-3 rounded' type='submit'>Subir Producto</button>
                        </div>
                    </div>
                </form>

                {showModal && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Producto creado</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                ¡Tu producto ha sido creado exitosamente!
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default UploadProduct;
