import React from 'react';
import { Link } from 'react-router-dom'; 

const HeaderT = () => {
    const logoUrl = `img/ecoswap_logo.png?timestamp=${new Date().getTime()}`;

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return token !== null; 
    };

    const logout = async () => {
        const token = localStorage.getItem('token');
        
        // Construir los datos del formulario para enviarlos en la petición POST
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        };

        const response = await fetch('http://localhost:8080/auth/logout', requestOptions);
        if (response.ok) {
            localStorage.removeItem('token');
        } else {
            console.error('Error al cerrar sesión:', response.statusText);
        }
    };

    return (
        <>
            <header>
                <div className="bg-success bg-gradient py-3" style={{ height: '70px' }}>
                    <div className="container">
                        <div className="text-center">
                            <img alt="LOGO ECOSWAP" src={logoUrl} width="70" height="55" />
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ height: '50px' }}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse ms-4 me-4" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorias</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Tecnología</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Arte</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Deporte</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Ropa</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Juguetes</a></li>
                                    </ul>
                                </li>
                                {isLoggedIn() && ( 
                                    <li className="nav-item bg-success rounded">
                                        <Link to="/upload" className='nav-link btn btn-success text-white fw-bolder' aria-current="page">Publicar Producto</Link>
                                    </li>
                                )}
                            </ul>
                            <img
                                className='inicioFoto'
                                alt=""
                                src="img/4096477.png"
                                width="30"
                                height="30"
                            />
                            <div className="ms-lg-2">
                                {!isLoggedIn() && ( 
                                    <>
                                        <Link to="/login" className='text-decoration-none text-black me-2'>Iniciar Sesión</Link> 
                                        <Link to="/register" className='text-decoration-none text-black'>Registrarse</Link> 
                                    </>
                                )}
                                {isLoggedIn() && ( 
                                    <>
                                        <Link to="/profile" className='text-decoration-none text-black me-2'>Perfil</Link>
                                        <a href='' className=' text-black cursor-pointer' onClick={logout}>Logout</a>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default HeaderT;