import React from 'react'

const ProductsTable = () => {
    return (
        <div>
            <div className='container mt-5'>
                <h3 className='text-center mt-5 mb-5'>PRODUCTOS</h3>
                <div className='d-flex justify-content-end'>
                <button>Crear</button></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre Producto</th>
                            <th scope="col">Dueño</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Condicion</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>carlos</td>
                            <td>123</td>
                            <td>carlos@gmail.com</td>
                            <td>san jose</td>
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


export default ProductsTable
