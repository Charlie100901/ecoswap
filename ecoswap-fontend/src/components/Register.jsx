import React from 'react';

const Register = () => {
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
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Nombre</label>
                                        <input type="text" className="form-control input-bg-secondary-subtle" id="username" placeholder="Nombre" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                                        <input type="email" className="form-control" id="email" placeholder="Correo electrónico" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Dirección</label>
                                        <input type="text" className="form-control" id="address" placeholder="Dirección" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Número de teléfono</label>
                                        <input type="text" className="form-control" id="phone" placeholder="Número de teléfono" />
                                    </div>
                                    <div className="mb-3 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-secondary">Registrarse</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;