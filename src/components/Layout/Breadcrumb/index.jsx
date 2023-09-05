import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@store';

export default function Breadcrumb() {
    const store = useStore();
    const { app } = store;
    const routes = app.currentPath.split('/').filter((url) => url !== '');
    return (
        <div className='font-normal text-sm leading-5  hidden md:block'>
            <ul className='flex'>
                <li className=''><Link className={`${routes.length > 0 ? 'text-grey-external-3' : 'text-green-external-3'}`} to={`${import.meta.env.VITE_BASE_PREFIX}`}>Inicio</Link></li>
                {routes.map((route, i) => {
                    const url = `/${routes.slice(0, i + 1).join('/')}`;
                    const isLast = routes[routes.length - 1];
                    return (
                        <li className='pl-3' key={url}>
                            /&nbsp;&nbsp; {i === routes.length ? (
                                ''
                            ) : (
                                <Link className={`${isLast != route ? 'text-grey-external-3' : 'text-green-external-3'}`} to={url}>{route}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
