import React from 'react'

const InicioSesion = () => {
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

                                <h3 className="card-title text-center ">Inicia Sesion</h3>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="Correo" className="form-label">Correo</label>
                                        <input type="text" className="form-control input-bg-secondary-subtle" id="email" placeholder="correo" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                                    </div>

                                    <div className="mb-3 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-secondary">Ingresar</button>
                                    </div>
                                    <div className="mb-3 d-flex justify-content-center">
                                        <p >¿Aun no tienes cuenta?</p><span>
                                            <a className='text-decoration-none text-success' href=''>registrate</a>
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

export default InicioSesion
