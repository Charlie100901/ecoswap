import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const HeaderT = () => {
    return (
        <header>
            <div className="bg-success bg-gradient py-3" style={{ height: '70px' }}>
                <div className="container">
                    <div className="text-center">
                        <img alt="LOGO ECOSWAP" src="img/ecoswap_logo.png" width="100" height="55" />
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
                                <a className="nav-link active" aria-current="page" href="#">Inicio</a>
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
                            <li className="nav-item bg-success rounded">
                                <a className="nav-link btn btn-success text-white fw-bolder" href="#">Publicar Producto</a>
                            </li>
                        </ul>
                        <img
                            className='inicioFoto'
                            alt=""
                            src="img/4096477.png"
                            width="30"
                            height="30"
                        />
                        <div className="ms-lg-2">
                            <a href="#" className='text-decoration-none text-black me-2'>Iniciar Sesión</a>
                            <a href="#" className='text-decoration-none text-black'>Registrarse</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderT;