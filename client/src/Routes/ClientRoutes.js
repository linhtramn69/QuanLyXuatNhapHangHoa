import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Components';

const ClientRoutes = () => {
    const [showHeader, setShowHeader] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowHeader(window.scrollY >= 190);
        };
        window.addEventListener('scroll', handleScroll);
        console.log('render');
    }, []);
    return (
        <>
            <Header showHeader={showHeader} />
            <Outlet />
        </>
    );
};

export default ClientRoutes;
