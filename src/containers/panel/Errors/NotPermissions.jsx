import React from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '@store';

export default function NotPermissions() {
    const store = useStore();

    const hasBannerPermissions = () => {
      const { app } = store;
      const { modulePermissions } = app;
      const permission = modulePermissions.find((({module}) => module === 'Banners'));

      return !!permission;
    }

    return (
        <div>
            <div
                className='flex items-center justify-center bg-grey-external-7 rounded-md'
                style={{ height: 'calc(100vh - 112px)' }}
            >
                <div className='flex flex-col items-center'>
                    <h2>NO TIENES PERMISOS PARA VER ESTA PÁGINA</h2>
                    {
                      hasBannerPermissions() &&
                      (
                        <Link
                          to='/'
                          className="btn--green flex items-center justify-center mt-4"
                          style={{ width: 160 }}
                        >
                          Volver a Inicio
                        </Link>
                      )
                    }
                </div>
            </div>
        </div>

    )
}