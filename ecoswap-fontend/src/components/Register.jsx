import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Importa Link para crear enlaces internos en tu aplicación

const Register = () => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        cellphoneNumber: ''
    });
    const [showModal, setShowModal] = useState(false);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Construir los datos del formulario para enviarlos en la petición POST
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };

            const response = await fetch('http://localhost:8001/api/auth/register', requestOptions);

            if (response.ok) {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    location.reload();
                }, 3000);
            } else {
                console.error('Error al registrar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='backg vh-100'>
            <div className="container">
                <div className="row justify-content-center align-items-center " style={{ height: '100%' }}>
                    <div className="col-md-5 mt-5">
                        <div className="card mt-5">
                            <div className="card-body bg-body-tertiary rounded ">


                                <div className="text-center">
                                    <img className='' lt="LOGO ECOSWAP" src="img/ecoswap_logo.png" width="70" height="60" />
                                </div>

                                <h3 className="card-title text-center ">Crea tu cuenta</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Nombre</label>
                                        <input onChange={handleChange} type="text" className="form-control input-bg-secondary-subtle" id="username" placeholder="Nombre" name="name" />
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
                                        <button type="submit" className="btn btn-secondary">Registrarse</button>
                                    </div>
                                    <div>
                                    <Link to="/login" className="btn btn-link mt-3 d-block text-center text-decoration-none text-success">Ir a iniciar sesión</Link>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">¡Usuario Registrado!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                ¡Usuario registrado exitosamente!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            

        </div>
    );
}

export default Register;
