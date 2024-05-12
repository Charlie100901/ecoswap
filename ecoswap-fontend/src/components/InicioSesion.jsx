import React, { useState  } from 'react';
import { Link  } from 'react-router-dom';

const InicioSesion = () => {
     // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: '',   
    });
    const [error, setError] = useState("");

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

            const response = await fetch('http://localhost:8080/auth/login', requestOptions);

            if (response.ok) {
                // Procesar la respuesta exitosa, por ejemplo, redirigir a la página de inicio
                const responseData = await response.json(); // Parsea el cuerpo de la respuesta como JSON
                const token = responseData.token; 
                localStorage.setItem('token', token);
                window.location.href = "/";

            } else {
                
                const responseData = await response.json();
                setError(responseData.message);
                console.log(responseData.message);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
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
                            <div className="card-body bg-body-tertiary rounded shadow">
                                <div className="text-center">
                                    <img className='' lt="LOGO ECOSWAP" src="img/ecoswap_logo.png" width="70" height="60" />
                                </div>

                                <h3 className="card-title text-center ">Inicia Sesión</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="Correo" className="form-label">Correo</label>
                                        <input type="text" name='email' className="form-control input-bg-secondary-subtle shadow-sm" id="email" placeholder="Correo Electrónico" onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input type="password" name='password' className="form-control shadow-sm" id="password" placeholder="Contraseña" onChange={handleChange} />
                                    </div>
                                    {error}
                                    <div className="mb-3 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-secondary">Ingresar</button>
                                    </div>
                                    <div className="mb-3 d-flex justify-content-center">
                                        <p >¿Aún no tienes cuenta?</p><span>
                                            <Link to="/register" className="text-decoration-none text-success">Registrate</Link>
                                        </span>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InicioSesion;
