import React from 'react'

const ProfileUser = () => {
    return (
        <div>
            <container className=''>
                <div className="container">
                    <div className="row justify-content-center align-items-center " style={{ height: '100%' }}>
                        <div className="col-md-5 mt-5">
                            <div className="card mt-5">
                                <div className="card-body bg-body-tertiary  shadow-lg rounded">
                                    <div className='text-center'>
                                        <img lt="LOGO ECOSWAP" src="img/4096477.png" width="100" height="100" />
                                    </div>
                                    <div className='bg-success p-2 text-dark bg-opacity-25 mt-3 mx-5 w-75 p-3 rounded '>
                                    <p>Nombre</p>
                                        <p>Numero de telefono</p>
                                        <p>Correo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </container>
        <div className="row">
                <div className="col">
                    <div style={{ height: '192px' }}></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUser;


