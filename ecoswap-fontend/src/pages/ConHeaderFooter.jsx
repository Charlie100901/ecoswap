import React from 'react';
import HeaderT from '../components/HeaderT';
import Footer from '../components/Footer';

function ConHeaderFooter({children}) {
    return (
        <>
            <HeaderT/>
            {children}
            <Footer/>
        </>
    );
}



export default ConHeaderFooter;
