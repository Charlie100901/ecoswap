import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('http://localhost:8001/api/v1/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los usuarios');
                }
            })
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            window.location.href = "/login";
        }
    }, []);

    const handleDeleteUser = async (userId) => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:8001/api/v1/user/${userId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                throw new Error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const refreshUsers = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/v1/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <div className='container mt-5'>
                <h3 className='text-center mt-5 mb-5'>USUARIOS</h3>
                <div className='d-flex justify-content-end'>
                    <Link to="/admin"><button className='mx-5 btn btn-success text-white fw-bolder'>admin View</button></Link>
                    <button className='btn btn-success text-white fw-bolder' onClick={() => setShowModal(true)}>Crear</button>
                </div>
                
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Número de Telefono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.cellphoneNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className='btn btn-success text-white fw-bolder' onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <RegisterModal closeModal={() => setShowModal(false)} refreshUsers={refreshUsers} />
            )}
        </div>
    );
};

const RegisterModal = ({ closeModal, refreshUsers }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        cellphoneNumber: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };

            const response = await fetch('http://localhost:8001/api/v1/user/create', requestOptions);

            if (response.ok) {
                closeModal();
                refreshUsers();
                location.reload();
            } else {
                console.error('Error al registrar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Crear Usuario</h5>
                        <button type="button" className="btn-close " aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre</label>
                                <input onChange={handleChange} type="text" className="form-control" id="username" placeholder="Nombre" name="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input onChange={handleChange} type="email" className="form-control" id="email" placeholder="Correo electrónico" name='email'/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input onChange={handleChange} type="password" className="form-control" id="password" placeholder="Contraseña" name='password'/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Dirección</label>
                                <input onChange={handleChange} type="text" className="form-control" id="address" placeholder="Dirección" name='address'/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Número de teléfono</label>
                                <input onChange={handleChange} type="text" className="form-control" id="phone" placeholder="Número de teléfono" name='cellphoneNumber'/>
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-success ">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;