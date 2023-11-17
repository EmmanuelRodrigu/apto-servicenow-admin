import React, { useEffect, useState }  from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStore } from '@store';
import NotPermissions from '@containers/panel/Errors/NotPermissions';
import Dashboard from '@containers/panel/Dashboard';
import NewsLetter from '@containers/panel/NewsLetter';
import Projects from '@containers/panel/Projects';
import Requests from '@containers/panel/Requests';
import DetailRequest from '@containers/panel/Requests/detail';
import Users from '@containers/panel/Users';
import NewUser from '@containers/panel/Users/new';
import UserDetails from '@containers/panel/Users/detail';
import NewProject from '@containers/panel/Projects/new';
import Payments from '@containers/panel/ManageProjects';
import Clients from '@containers/panel/Clients';
import NewClient from '@containers/panel/Clients/new';
import DetailClient from '@containers/panel/Clients/detail';
import DetailsProject from '@containers/panel/Projects/detail';
import { ProtectedRoute } from './ProtectedRoute';


function RouterPanel(props) {
    const location = useLocation();
    const store = useStore();
    const { app, user } = store;
    const { modulePermissions } = app;
    
    useEffect(() => {
        store.setCurrentPath(location.pathname);
        window.scrollTo(0, 0);
      }, [location]);
    return (
        <Routes>
            <Route
                path='/dashboard'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            
            <Route
                path='/noticias'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="News">
                        <NewsLetter />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/clientes'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Clients">
                        <Clients />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/nuevo-cliente'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Clients">
                        <NewClient />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/detalles-cliente/:id'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Clients">
                        <DetailClient />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/proyectos'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Projects">
                        <Projects />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/crear-proyecto'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Projects">
                        <NewProject />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/detalles-proyecto/:id'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Projects">
                        <DetailsProject/>
                    </ProtectedRoute>
                }
            />
            <Route
                path='/solicitudes-de-soporte'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Requests">
                        <Requests />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/solicitudes-de-soporte/:id'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Requests">
                        <DetailRequest />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/usuarios'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Users">
                        <Users/>
                    </ProtectedRoute>
                }
            />
            <Route
                path='/crear-usuario'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Users">
                        <NewUser/>
                    </ProtectedRoute>
                }
            />
            <Route
                path='/detalles-usuario/:id'
                exact
                element={
                    <ProtectedRoute modulePermissions={modulePermissions} nameRoute="Users">
                        <UserDetails/>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default RouterPanel;