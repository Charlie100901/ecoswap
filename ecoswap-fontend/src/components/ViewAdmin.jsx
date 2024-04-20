import React from 'react';

const ViewAdmin = () => {
    return (
        <div className="container mt-5 p-3">
            <div className="row">
                <div className="col">
                    <div className="card w-auto" style={{ maxWidth: '250px' }}>
                        <img src="img/4096477.png" className="card-img-top img-fluid" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Total Usuarios</h5>
                            <p className="card-text">numero usuarios</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card w-auto mt-3" style={{ maxWidth: '250px' }}>
                        <img src="img/skin-care.png" className="card-img-top img-fluid" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Total Productos</h5>
                            <p className="card-text">numero de productos</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card w-auto mt-3" style={{ maxWidth: '250px' }}>
                        <img src="img/intercambio.png" className="card-img-top img-fluid" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Total de Intercambios</h5>
                            <p className="card-text">Numero de intercambios</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ height: '450px' }}></div>
                </div>
            </div>
        </div>
    );
}

export default ViewAdmin;