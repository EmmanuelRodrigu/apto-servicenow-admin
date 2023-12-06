import React from 'react'
import { useStore } from '@store';
import Login from '@containers/login';
import Helmet from 'react-helmet';
import Layout from '@components/Layout';
import { http } from '@providers/http';
import notify from '@utils/notify';
import Splash from '@components/Splash';
import { useNavigate } from 'react-router-dom';
import {
  userFormatShort,
  getDriverStorage,
  getJwt,
  getUser,
  getSidebar,
  useEffectAsync,
  getHasSession,
  setRol,
} from '@utils';

export default function App() {
    const store = useStore();
    const navigate = useNavigate()
    const { user, app } = store;

    useEffectAsync(async () => {
        console.log(user)
        const hasSession = getHasSession(user);
        const getMe = async () => {
            return await http
                .get('auth/me')
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    error.json().then((data) => {
                        notify(`Autorización: ${data.error}`, 'error');
                    });
                    return null;
                });
        }
        const validateToken = async () => {
            const jwt = getJwt(user);
            if (jwt !== null) {
                const responseMe = await getMe();
                if (responseMe != null) {
                    store.saveUser(userFormatShort(responseMe.user, responseMe.user.rol));
                    store.setModulePermissions(responseMe.modulesPermissions);
                    store.saveRole(setRol(responseMe.user.rol, store));
                    getDriverStorage().setItem(
                        'currentUser',
                        JSON.stringify(userFormatShort(responseMe.user))
                    );
                    
                    if(responseMe.user.rol != 'Client') {
                        navigate('/dashboard')
                    } else {
                        navigate(`/${responseMe.user.id}/home`)
                    }
                }
            }
        };
        await validateToken();
        store.saveUser(getUser(user));
        store.saveJwt(getJwt(user));
        getSidebar(store);
        store.setSession(hasSession);
        setTimeout(() => {
            store.setSplash(false);
        }, 100)
    }, []);

    if(app.showSplash) {
        return <Splash />;
    };
    
    if (!app.session) {
        return <Login />;
    };

    return (
        <main>
            <Helmet>
                <title>ServiceNow</title>
            </Helmet>
            <Layout />
        </main>
    );
}
