import React, { useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routesList } from './router';
import Submenu from './submenu';
import logo from '@assets/logo_blanco.png';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import dashboard from '@assets/icons/dashboard.svg';
import news from '@assets/icons/news.svg';
import projects from '@assets/icons/projects.svg';
import settings from '@assets/icons/settings.svg';
import support from '@assets/icons/support.svg';
import users from '@assets/icons/users.svg';
import clients from '@assets/icons/clients.svg';
import defaultPhoto from '@assets/default.jpg';
import logoutImg from '@assets/logout.jpg';
import Modal from '@components/Modal';
import { getDriverStorage } from '../../../utils';

export default function Sidebar({ sidebar, store }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { app, user } = store;
    const [modalShowLogOut, setModalShowLogOut] = useState(false);
    const [modalShowProfile, setModalShowProfile] = useState(false);
    
    const modalHandlerLogOut = () => {
        setModalShowLogOut(!modalShowLogOut);
    };

    const modalHandlerProfile = () => {
        setModalShowProfile(!modalShowProfile);
    };

    const isActiveRoute = (path) => {
        return location.pathname == path ? 'active' : '';
    };

    const isActiveSubmenu = (listPaths) => {
        let active = false;
        listPaths.forEach((path) => {
            if(location.pathname == path) {
                active = true;
            };
        });
        return active;
    };

    const icons = (name) => {
        const components = {
            dashboard,
            news,
            projects,
            clients,
            settings,
            support,
            users,
        };
        const iconName = components[name];
        return <img src={iconName} alt={name} />
    }

    const link = (menuBase) => (
        <Link
            to={`/${menuBase.children[0].route}`}
            className={`link-action ${isActiveRoute(
                `/${menuBase.children[0].route}`
            )}`}
        >
            {icons(menuBase.icon)}
            <span className="text">{menuBase.children[0].name}</span>
        </Link>
    );

    const moveSidebar = () => {
        store.setSidebar(!sidebar);
    }

    const logOut = async () => {
        getDriverStorage().removeItem('tokenApto');
        getDriverStorage().removeItem('currentUser')
        store.setDefaultApp();
        store.setDefaultSessionUser();
        navigate('/')
    }

    return (
        <>
           <div className={`sidebar ${sidebar == false ? 'hidden-sidebar' : ''}`}>
            <div className={` ${sidebar == false ? 'justify-center' : 'justify-between'}`}>
            {sidebar && (<img src={logo} width={'120'} alt="logo" className="max-w-full block" />)}
                <button className='outline-none' onClick={moveSidebar} >
                    {sidebar == false ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.97 22.75H8.97C3.54 22.75 1.22 20.43 1.22 15V9C1.22 3.57 3.54 1.25 8.97 1.25H14.97C20.4 1.25 22.72 3.57 22.72 9V15C22.72 20.43 20.41 22.75 14.97 22.75ZM8.97 2.75C4.36 2.75 2.72 4.39 2.72 9V15C2.72 19.61 4.36 21.25 8.97 21.25H14.97C19.58 21.25 21.22 19.61 21.22 15V9C21.22 4.39 19.58 2.75 14.97 2.75H8.97Z" fill="#D77FF9" />
                            <path d="M14.97 22.75C14.56 22.75 14.22 22.41 14.22 22V2C14.22 1.59 14.56 1.25 14.97 1.25C15.38 1.25 15.72 1.59 15.72 2V22C15.72 22.41 15.39 22.75 14.97 22.75Z" fill="#D77FF9" />
                            <path d="M7.97 15.3099C7.78 15.3099 7.59 15.2399 7.44 15.0899C7.15 14.7999 7.15 14.3199 7.44 14.0299L9.47 11.9999L7.44 9.96988C7.15 9.67988 7.15 9.19988 7.44 8.90988C7.73 8.61988 8.21 8.61988 8.5 8.90988L11.06 11.4699C11.35 11.7599 11.35 12.2399 11.06 12.5299L8.5 15.0899C8.36 15.2399 8.17 15.3099 7.97 15.3099Z" fill="#D77FF9" />
                        </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.97 22.75H8.96997C3.53997 22.75 1.21997 20.43 1.21997 15V9C1.21997 3.57 3.53997 1.25 8.96997 1.25H14.97C20.4 1.25 22.72 3.57 22.72 9V15C22.72 20.43 20.41 22.75 14.97 22.75ZM8.96997 2.75C4.35997 2.75 2.71997 4.39 2.71997 9V15C2.71997 19.61 4.35997 21.25 8.96997 21.25H14.97C19.58 21.25 21.22 19.61 21.22 15V9C21.22 4.39 19.58 2.75 14.97 2.75H8.96997Z" fill="#D77FF9" />
                            <path d="M7.96997 22.75C7.55997 22.75 7.21997 22.41 7.21997 22V2C7.21997 1.59 7.55997 1.25 7.96997 1.25C8.37997 1.25 8.71997 1.59 8.71997 2V22C8.71997 22.41 8.38997 22.75 7.96997 22.75Z" fill="#D77FF9" />
                            <path d="M14.97 15.3099C14.78 15.3099 14.59 15.2399 14.44 15.0899L11.88 12.5299C11.59 12.2399 11.59 11.7599 11.88 11.4699L14.44 8.90988C14.73 8.61988 15.21 8.61988 15.5 8.90988C15.79 9.19988 15.79 9.67988 15.5 9.96988L13.48 11.9999L15.51 14.0299C15.8 14.3199 15.8 14.7999 15.51 15.0899C15.36 15.2399 15.17 15.3099 14.97 15.3099Z" fill="#D77FF9" />
                        </svg>}
                </button>
            <h1 className='font-normal text-sm text-grey-external-5 px-4 mb-3'>Menu</h1>
            <ul
                className='mb-auto menu'
                style={{
                    height: `calc(100vh - ${sidebar == false ? '227' : '250'}px)`,
                }}
            >
            {routesList.map((base, index) => {
                if(!base.haveChildren) {
                    return (
                        <li key={`normal-${index}`}>
                            {sidebar == false ? 
                                ''
                             : (link(base))}
                        </li>
                    )
                }
                if(base.haveChildren) {
                    return (
                        <li key={`submenu-${index}`}>
                            <Submenu
                                index={index}
                                sidebar={sidebar}
                                title={[icons(base.icon), base.name]}
                                activeInitial={isActiveSubmenu(
                                    base.children.map((option) => {
                                        return `/${option.route}`;
                                    })
                                )}
                            >
                                {base.children.map((subMenuBase, index) => (
                                    <Link
                                        key={`normal-${subMenuBase.name}-${index}`}
                                        to={`/${subMenuBase.route}`}
                                        className={`link-action ${isActiveRoute(
                                            `/${subMenuBase.route}`
                                        )}`}
                                    >
                                        {subMenuBase.name}
                                    </Link>
                                ))}
                            </Submenu>
                        </li>
                    )
                }
            })
            }
            </ul>
            <div className={`footer ${sidebar == false ? 'hidden-sidebar' : ''}`}>
                    <div className='footer-card'>
                        <div onClick={modalHandlerProfile} className='mr-2 footer-img'>
                            <img src={user.payload.photo ? user.payload.photo : defaultPhoto} alt="imagen usuario" />
                        </div>
                        <div className='footer-user'>
                            <div className='text-white font-medium text-sm'>{'Emmanuel'}</div>
                            <div className='text-white font-normal text-xs'>{'Developer'}</div>
                        </div>
                    </div>
                    <div className='close-session'>
                        {sidebar == false ? (
                            <Tooltip
                                placement="right"
                                overlay="Cerrar sesión"
                            >
                                <div className='link-action' onClick={modalHandlerLogOut}>
                                    <img src={logoutImg} alt="Cerrar sesión" />
                                </div>
                            </Tooltip>
                        ) : (<div className='link-action' onClick={modalHandlerLogOut}>
                            <img src={logoutImg} alt="Cerrar sesión" /> <span className='text-white'>Cerrar sesión</span>
                        </div>)}
                    </div>
                </div>
            </div>
           </div>
           <Modal
                isOpen={modalShowLogOut}
                actionOpenOrClose={() => {
                    setModalShowLogOut();
                }}
                title={`¿Estás seguro que quieres salir?`}
                size=""
                description="Al aceptar tendrás que iniciar sesión de nuevo para acceder al administrador."
            >
                <div className='flex justify-center gap-3'>
                    <button className="w-full" onClick={modalHandlerLogOut}>Cancelar</button>
                    <button className="w-full" onClick={logOut}>Salir</button>
                </div>
            </Modal>
           <Modal
                isOpen={modalShowProfile}
                actionOpenOrClose={() => {
                    setModalShowProfile();
                }}
                title={`Perfil`}
                size=""
                description="A continuacion se muestran los datos del usuario"
            >
                <div className=''>
                    <div className='flex space-x-4'>
                        <label className='w-1/3'>Nombre</label>
                        <p className='p-1'>Emmanuel Rodriguez</p>
                    </div>
                    <div className='flex space-x-4'>
                        <label className='w-1/3'>Correo electronico</label>
                        <p className='p-1'>emanuel@apto.mx</p>
                    </div>
                    <div className='flex space-x-4'>
                        <label className='w-1/3'>Fecha de creacion</label>
                        <p className='p-1'>10/10/2023</p>
                    </div>
                </div>
            </Modal>
        </>
    )

}