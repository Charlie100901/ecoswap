import React from 'react';
import { useLocation } from 'react-router-dom';

const ExchangeView = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div className="container mt-4">
            <h2 className="text-center">INTERCAMBIO EXITOSO</h2>
            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">DIRECCION DE ENTREGA</h5>
                            <p className="card-text">Dirección del usuario que publicó</p>
                            <input type="text" className="form-control mb-3" value={state?.responseData?.productTo?.user?.address} readOnly />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">INFORMACIÓN DEL PRODUCTO</h5>
                            <img src="img/ecoswap_logo.png" alt="LOGO ECOSWAP" width="80"  className="mb-3" />
                            <div className="mb-3">
                                <label className="form-label">Nombre del producto:</label>
                                <input type="text" className="form-control" value={state?.responseData?.productFrom?.title} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción:</label>
                                <input type="text" className="form-control" value={state?.responseData?.productFrom?.description} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">INFORMACION DE INTERCAMBIADOR</h5>
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input type="text" className="form-control" value={state?.responseData?.productFrom?.user?.name} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono:</label>
                                <input type="number" className="form-control" value={state?.responseData?.productFrom?.user?.cellphoneNumber} readOnly />
                            </div>
                            <div>
                                <label className="form-label">Correo Electrónico:</label>
                                <input type="text" className="form-control" value={state?.responseData?.productFrom?.user?.email} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeView;
