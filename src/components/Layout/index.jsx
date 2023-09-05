import React from 'react';
import RouterPanel from '@routes/RouterPanel';
import Sidebar from '@components/Layout/Sidebar';
import { useStore } from '@store';
import Header from './Header';

export default function Layout() {
    const store = useStore();
    const { app } = store;
    const { sidebar } = app;
    
    return (
        <div>
            <Sidebar sidebar={sidebar} store={store} />
            <Header sidebar={sidebar} store={store} />
            <div className={`content ${sidebar == false ? 'hidden-sidebar' : ''}`}>
                <div className='p-5'>
                    <RouterPanel/>
                </div>
            </div>
        </div>
    )
}