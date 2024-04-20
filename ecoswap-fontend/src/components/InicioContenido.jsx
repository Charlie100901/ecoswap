import React from 'react';

const Producto = ({ imagenSrc, titulo, categoria, estado }) => {
  return (
    <div className="card mx-auto mb-8 mt-3"style={{ width: '62%' }}>
      <img className="card-img-top" src={imagenSrc} alt="imagen producto" />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{categoria}</p>
        <p className="card-text">{estado}</p>
      </div>
    </div>
  );
};

const InicioContenido = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Producto imagenSrc="img/ps4.jpg" titulo="PS4" categoria="Tecnología" estado="Usado" />
        </div>
        <div className="col">
          <Producto imagenSrc="img/ps4.jpg" titulo="PS4" categoria="Tecnología" estado="Usado" />
        </div>
        <div className="col">
          <Producto imagenSrc="img/ps4.jpg" titulo="PS4" categoria="Tecnología" estado="Usado" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Producto imagenSrc="img/ps4.jpg" titulo="PS4" categoria="Tecnología" estado="Usado" />
        </div>
        <div className="col">
          <Producto imagenSrc="img/ps4.jpg" titulo="PS4" categoria="Tecnología" estado="Usado" />
        </div>
        <div className="col">
          <Producto imagenSrc="img/ps4.jpg" titulo="PS4" categoria="Tecnología" estado="Usado" />
        </div>
      </div>
    </div>
  );
};

export default InicioContenido;