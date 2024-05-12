import React, { useState, useEffect } from 'react';

const ProfileUser = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/v1/user/validate', {
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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
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
            </div>
        </div>
    );
};

export default ProfileUser;
