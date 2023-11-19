import React, { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import App from '../containers/App';

export default function NotLoggedRoutes() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route 
                path="/"
                exact
                element={<App />}
            />
            <Route path="*" element={<App />} />
        </Routes>
    )
}