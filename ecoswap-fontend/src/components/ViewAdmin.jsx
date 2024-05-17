import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewAdmin = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/v1/admin/statistic');
            if (response.ok) {
                const data = await response.json();
                setStatistics(data);
            } else {
                throw new Error('Error al obtener las estadísticas');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="container mt-5 p-3">
            {statistics && (
                <div className="row">
                    <div className="col">
                        <div className="card w-auto" style={{ maxWidth: '250px' }}>
                            <Link to="/admin/users" className="link-card text-decoration-none text-success">
                                <img src="img/4096477.png" className="card-img-top img-fluid" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Total Usuarios</h5>
                                    <p className="card-text">{statistics.usersCount}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card w-auto mt-3" style={{ maxWidth: '250px' }}>
                            <Link to="/admin/products" className="link-card text-decoration-none text-success">
                                <img src="img/skin-care.png" className="card-img-top img-fluid" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Total Productos</h5>
                                    <p className="card-text">{statistics.productsCount}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card w-auto mt-3 text-decoration-none text-success" style={{ maxWidth: '250px' }}>
                            <img src="img/intercambio.png" className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Total de Intercambios</h5>
                                <p className="card-text">{statistics.countRequestExchangeCompleted}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewAdmin;
