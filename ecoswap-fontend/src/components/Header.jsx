import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div>
            <Navbar className="PnavBar navbar-expand-lg">
                <Container>
                    <Navbar.Brand className="mx-auto">
                        <img
                            alt="LOGO ECOSWAP"
                            src="img/ecoswap_logo.png"
                            width="100"
                            height="100"
                            
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Navbar className="Snavbar navbar-expand-lg">
                <Container>
                    <Nav className="">
                        <Nav.Link className='NavInicio' href="">Inicio</Nav.Link>
                        <Nav.Link className='NavSP' href="">Subir Productos</Nav.Link>


                        <DropdownButton variant='success' title="Categorias">
                            <Dropdown.Item eventKey="1">Arte</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Deporte</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Hogar</Dropdown.Item>
                            <Dropdown.Item eventKey="4">Juguetes</Dropdown.Item>
                            <Dropdown.Item eventKey="5">Ropa</Dropdown.Item>
                            <Dropdown.Item eventKey="6">Tecnologia</Dropdown.Item>
                        </DropdownButton>
                    </Nav>
                    <div className="inicioFoto">
                        <img
                            alt=""
                            src="img/4096477.png"
                            width="30"
                            height="30"
                        />
                    </div>
                    <Nav className="">
                        <Nav.Link href="">Iniciar Sesión</Nav.Link>
                        <Nav.Link href="">Regístrate</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;