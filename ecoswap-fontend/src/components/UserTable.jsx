import React from 'react'

const UserTable = () => {
    return (
        <div>
            <div className='container mt-5'>
                <h3 className='text-center mt-5 mb-5'>USUARIOS</h3>
                <div className='d-flex justify-content-end'>
                <button>Crear</button></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Numero de Telefono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Dirrecion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>carlos</td>
                            <td>123</td>
                            <td>carlos@gmail.com</td>
                            <td>san jose</td>
                            <td><button>Eliminar</button>
                            <button>Editar</button></td>

                        </tr>
                        <tr>
                            <td>carlos</td>
                            <td>123</td>
                            <td>carlos@gmail.com</td>
                            <td>san jose</td>
                            <td><button>Eliminar</button>
                            <button>Editar</button></td>

                        </tr>
                        <tr>
                            <td>carlos</td>
                            <td>123</td>
                            <td>carlos@gmail.com</td>
                            <td>san jose</td>
                            <td><button>Eliminar</button>
                            <button>Editar</button></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default UserTable
