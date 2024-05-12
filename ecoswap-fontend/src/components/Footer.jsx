import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-center text-md-start mt-md-5" style={{ height: 'auto' }}>
            <div className="container p-9">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0 mt-3">
                        <h5 className="text-uppercase ">ACERCA DE</h5>
                        <p>
                            En EcoSwap, creemos en un mundo donde la sostenibilidad y la comunidad van de la mano. Nuestra plataforma proporciona un espacio en línea para que las personas intercambien artículos de manera fácil, segura y respetuosa con el medio ambiente.
                        </p>
                    </div>
                    <div className=" d-flex justify-content-end col-lg-6 col-md-12 mb-4 mb-md-0 mt-3">
                        <ul className="list-unstyled mb-0 ">
                            <li>
                                <FontAwesomeIcon icon={faTwitter} style={{ color: "#000000" }} />
                                <a href='https://twitter.com/ecoSwapTC' className=' text-black ms-2 text-decoration-none'>ecoSwapTC</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faInstagram} style={{ color: "#000000" }} />
                                <a href='https://instagram.com/igEcoswap' className=' text-black ms-2 text-decoration-none'>igEcoswap</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faFacebook} style={{ color: "#000000" }} />
                                <a href='https://facebook.com/EcoswapTV' className=' text-black ms-2 text-decoration-none'>EcoswapFB</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faYoutube} style={{ color: "#000000" }} />
                                <a href='https://youtube.com/ecoSwap' className=' text-black ms-2 text-decoration-none'>ecoSwapYT</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;