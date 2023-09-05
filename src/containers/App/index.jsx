import React from 'react'
import { useStore } from '@store';
import Login from '@containers/login';
import Helmet from 'react-helmet';
import Layout from '@components/Layout';
import { http } from '@providers/http';
import notify from '@utils/notify';
import {
  userFormatShort,
  getDriverStorage,
  getJwt,
  getUser,
  getSidebar,
  useEffectAsync,
  getHasSession,
} from '@utils';

export default function App() {
    const store = useStore();
    const { user, app } = store;
    useEffectAsync(async () => {
        const hasSession = getHasSession(user);
        const getMe = async () => {
            return await http
                .get('auth/me/test')
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    error.json().then((data) => {
                        //notify(`Autorización: ${data.error}`, 'error');
                    });
                    return null;
                });
        }
        const validateToken = async () => {
            const jwt = getJwt(user);
            if (jwt !== null) {
                const responseMe = await getMe();
                if (responseMe != null) {
                  store.saveUser(userFormatShort(responseMe));
                    getDriverStorage().setItem(
                        'currentUser',
                        JSON.stringify(userFormatShort(responseMe))
                    );
                }
            }
        };
        await validateToken();
        store.saveUser(getUser(user));
        store.saveJwt(getJwt(user));
        getSidebar(store);
        store.setSession(hasSession);
    }, []);

    if (!app.session) {
        return <Login />;
    }

    return (
        <main>
            <Helmet>
                <title>ServiceNow Admin</title>
            </Helmet>
            <Layout />
        </main>
    );
}
