import React from 'react';

const ExchangeView = () => {
    return (
        <div>
            <div className="container mt-4">
                <h2 className='text-center'>INTERCAMBIO EXITOSO</h2>
                <div className='row mt-5'></div>
                <div className='row'>
                    <div className='col'>
                        <div class="card-header bg-body-tertiary w-25 rounded">
                            <h5 className='mb-5'>DIRECCION DE ENTREGA</h5>
                        </div>
                        <p>Dirección del usuario que publicó</p>
                    </div>
                    <div className='col'>
                        <div className="card-header bg-body-tertiary w-25 rounded">
                            <h5 className='mb-5'>INFORMACION DEL PRODUCTO</h5>
                        </div>
                        <img alt="LOGO ECOSWAP" src="img/ecoswap_logo.png" width="100" height="60" />

                        <p>Nombre del producto</p>
                        <p>Descripción</p>
                        <p>Precio</p>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div class="card-header bg-body-tertiary w-25 rounded">
                                <h5 className='mb-5'>INFORMACION DE INTERCAMBIADORES</h5>
                            </div>
                            <p>Nombre</p>
                            <p>Numero de telefono</p>
                            <p>Correo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeView;