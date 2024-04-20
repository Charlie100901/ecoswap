import React from 'react';

const ProductView = () => {
    return (
        <div className="container mt-4 mb-7">
            <div className='row'>
                <div className='col-md-5 order-md-1'>
                    <img src='img/ps4.jpg' alt="PS4 objeto" className="img-fluid rounded-4" />
                </div>
                <div className='col-md-7 order-md-2 '>
                    <div className="ms-5 mb-4 ">
                        <h2>PS4</h2>
                        <h4>Detalles del Producto</h4>
                        <p>Descripción</p>
                        <p>Tecnología</p>
                        <p>Estado: Poco Uso</p>
                        <p>Fecha de Publicación</p>
                        <p>Datos del Dueño del Intercambio</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ height: '50px' }}></div>
                </div>
            </div>
        </div>
    );
}

export default ProductView;