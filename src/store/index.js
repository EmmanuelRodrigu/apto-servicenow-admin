import create from 'zustand';
import createContext from 'zustand/context';

const { Provider, useStore } = createContext();

const globalStore = () =>
    create((set) => ({
        app: {
            titlePage: 'Admin',
            currentPath: '/',
            showSplash: true,
            debounceTime: 600,
            sidebar: true,
            notifications: [],
            modulePermissions: [],
            session: false,
        },
        user: {
            jwt: null,
            payload: null,
        },
        setDefaultApp: () =>
            set(() => ({
                app: {
                    session: false,
                    titlePage: 'Admin',
                    currentPath: '/',
                    showSplash: false, // Different an original
                    debounceTime: 600,
                    sidebar: true,
                    notifications: [],
                    modulePermissions: [],
                },
            })),
        setSession: (value) =>
            set((state) => {
                state.app.session = value;
                return { state };
            }),
        setSidebar: (value) =>
            set((state) => {
                state.app.sidebar = value;
                return { state };
            }),
        setCurrentPath: (value) =>
            set((state) => {
                state.app.currentPath = value;
                return { state };
            }),
        setDefaultSessionUser: () =>
            set(() => ({
                user: {
                    jwt: null,
                    payload: null,
                },
            })),
        saveJwt: (value) =>
            set((state) => {
                state.user.jwt = value;
                return { state };
            }),
        saveUser: (value) =>
            set((state) => {
                state.user.payload = value;
                return { state };
            }),
    }));

export { Provider, globalStore, useStore };
