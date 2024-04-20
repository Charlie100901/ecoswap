import React from 'react';

const UploadProduct = () => {
    return (
        <div className='container mt-5'>
            <h3 className="text-center">NUEVO PRODUCTO</h3>
            <div className="row mt-5">
                <div className="col">
                    <h5>Nombre Producto</h5>
                    <input type="text" className="form-control-lg" placeholder="Nombre Producto" aria-label="Nombre Producto" />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <h5>Categoría</h5>
                    <select className="form-select" aria-label="Categoría">
                        <option defaultValue>Selecciona una categoría</option>
                        <option value="1">Tecnología</option>
                        <option value="2">Arte</option>
                        <option value="3">Deporte</option>
                        <option value="4">Ropa</option>
                        <option value="5">Juguetes</option>

                    </select>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <h5>Estado del producto</h5>
                    <select className="form-select" aria-label="Estado del Producto">
                        <option defaultValue>Selecciona el estado del producto</option>
                        <option value="1">Nuevo</option>
                        <option value="2">Usado</option>
                    </select>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <h5>Subir imagen del producto</h5>
                    <input className="form-control form-control-lg" id="formFileLg" type="file" />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <h5>Agregar descripción</h5>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <button className='btn btn-success w-100 p-3 rounded'>Subir Producto</button>
                </div>
            </div>
        </div>
    );
}

export default UploadProduct;