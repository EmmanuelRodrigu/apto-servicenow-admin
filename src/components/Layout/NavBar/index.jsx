import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getDriverStorage } from '../../../utils';
import { useStore } from '@store';
import logo from '@assets/logo_blanco.png';

export default function Navbar() {
    const navigate = useNavigate();
    const store = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = store;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logOut = async () => {
        getDriverStorage().removeItem('tokenApto');
        getDriverStorage().removeItem('currentUser')
        store.setDefaultApp();
        store.setDefaultSessionUser();
        navigate('/')
    }

    return (
        <div>
            <nav className="bg-navbar pr-4 pl-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-xl">
                        <a href="/home"><img className="w-20 h-20" src={logo} /></a>
                    </div>
                    <div className="space-x-10 flex">
                        <Link to={`/${user.payload.id}/mi-proyecto`} className="link">
                            Mi proyecto
                        </Link>
                        <a href="#" className="link">
                            Ticket
                        </a>
                        <div className="rounded-full bg-white border-2 w-7 h-7">
                            <button
                            onClick={toggleDropdown}
                            className="rounded-full bg-white border-2 w-7 h-7 hover:underline"
                            ></button>

                            {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                <ul>
                                    <li>
                                        <button
                                            onClick={logOut}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                        Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
}
