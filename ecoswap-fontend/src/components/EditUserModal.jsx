import React, { useState } from 'react';

const EditUserModal = ({ user, closeModal, updateUser }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
        cellphoneNumber: user.cellphoneNumber
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };

            const response = await fetch(`http://localhost:8001/api/v1/user/${user.id}/update`, requestOptions);

            if (response.ok) {
                updateUser(user.id, formData);
                closeModal();
            } else {
                console.error('Error al actualizar el usuario:', response.statusText);
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
        <div className="modal fade show" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editUserModalLabel">Editar Usuario</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre</label>
                                <input onChange={handleChange} type="text" className="form-control" id="username" placeholder="Nombre" name="name" value={formData.name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input onChange={handleChange} type="email" className="form-control" id="email" placeholder="Correo electrónico" name="email" value={formData.email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Dirección</label>
                                <input onChange={handleChange} type="text" className="form-control" id="address" placeholder="Dirección" name="address" value={formData.address} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Número de teléfono</label>
                                <input onChange={handleChange} type="text" className="form-control" id="phone" placeholder="Número de teléfono" name="cellphoneNumber" value={formData.cellphoneNumber} />
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
