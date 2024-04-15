import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'; // Importa los íconos necesarios

const Footer = () => {
    return (
        <div>
            <footer className='Footer'>
                <FontAwesomeIcon icon={faSquareXTwitter} style={{ color: "#000000" }} />
                <span><a href='' className=' LinkX  text-white'>ecoSwapTC</a></span>
                <FontAwesomeIcon icon={faInstagram} style={{ color: "#000000" }} />
                <span><a href='' className=' LinkIG   text-white'>igEcoswap</a></span><br />
                <FontAwesomeIcon icon={faFacebook} style={{ color: "#000000" }} />
                <a href='' className=' LinkF   text-white'>EcoswapTV</a>
                <FontAwesomeIcon icon={faYoutube} style={{ color: "#000000" }} />
                <span><a href='' className=' LinkYT   text-white'>ecoSwap</a></span>

                <div > 
                    <div className=' AcercaDe col-md-3 col-lg-3 col-xl-3 mt-3 '> 
                        <h5 className=''> Acerca de EcoSwap </h5>
                        <p className=''>En EcoSwap, creemos en un mundo donde la sostenibilidad y la comunidad van de la mano. Nuestra plataforma proporciona un espacio en línea para que las personas intercambien artículos de manera fácil, segura y respetuosa con el medio ambiente.
Nuestra Misión </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;