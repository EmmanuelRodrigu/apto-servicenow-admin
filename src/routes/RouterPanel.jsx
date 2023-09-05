import React, { useEffect }  from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStore } from '@store';
import Dashboard from '@containers/panel/Dashboard';
import NewsLetter from '../containers/panel/NewsLetter';
import Projects from '@containers/panel/Projects';
import Requests from '@containers/panel/Requests';
import Users from '@containers/panel/Users';
import NewUser from '@containers/panel/Users/new';
import UserDetails from '@containers/panel/Users/detail';
import NewProject from '../containers/panel/ManageProjects/new';
import Payments from '@containers/panel/ManageProjects';
import Clients from '@containers/panel/Clients';
import NewClient from '@containers/panel/Clients/new';

function RouterPanel(props) {
    const location = useLocation();
    const store = useStore();
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
                    <Dashboard/>
                }
            />
            <Route
                path='/noticias'
                exact
                element={
                    <NewsLetter/>
                }
            />
            <Route
                path='/clientes'
                exact
                element={
                    <Clients/>
                }
            />
            <Route
                path='/nuevo-cliente'
                exact
                element={
                    <NewClient/>
                }
            />
            <Route
                path='/proyectos'
                exact
                element={
                    <Projects/>
                }
            />
            <Route
                path='/solicitudes-de-soporte'
                exact
                element={
                    <Requests/>
                }
            />
            <Route
                path='/usuarios'
                exact
                element={
                    <Users/>
                }
            />
            <Route
                path='/crear-usuario'
                exact
                element={
                    <NewUser/>
                }
            />
            <Route
                path='/detalles-usuario/:id'
                exact
                element={
                    <UserDetails/>
                }
            />
            <Route
                path='/crear-proyecto'
                exact
                element={
                    <NewProject/>
                }
            />
            <Route
                path='/listado-de-pagos'
                exact
                element={
                    <Payments/>
                }
            />
        </Routes>
    )
}

export default RouterPanel;