import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStore } from '@store';
import HomePage from '@containers/Portal/HomePage';
import NewFunctionality from "@containers/Portal/Tickets/NewFunctionality";
import Bug from "@containers/Portal/Tickets/Bug";
import Support from "@containers/Portal/Tickets/Support";
import MyProject from '@containers/Portal/MyProject';

function RouterPortal(props) {
    const location = useLocation();
    const store = useStore();

    useEffect(() => {
        store.setCurrentPath(location.pathname);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route
                path="/:clientId/home"
                exact
                element={
                    <HomePage />
                }
            />
            <Route
                path="/:clientId/nueva-funcionalidad"
                exact
                element={
                    <NewFunctionality />
                }
            />
            <Route
                path="/:clientId/reportar-bug"
                exact
                element={
                    <Bug />
                }
            />
            <Route
                path="/:clientId/soporte-tecnico"
                exact
                element={
                    <Support />
                }
            />
            <Route
                path="/:clientId/mi-proyecto"
                exact
                element={
                    <MyProject />
                }
            />
        </Routes>
    )
}

export default RouterPortal;