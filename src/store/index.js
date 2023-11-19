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
            modulePermissions: [],
            session: false,
            rol: ''
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
                    showSplash: false,
                    debounceTime: 600,
                    sidebar: true,
                    modulePermissions: [],
                    rol: ''
                },
            })),
        setSplash: (value) =>
            set((state) => {
                state.app.showSplash = value;
                return { state };
            }),
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
        setModulePermissions: (value) =>
            set((state) => {
              state.app.modulePermissions = value;
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
        saveRole: (value) => 
            set((state) => {
                state.user.role = value;
                return { state };
            }),
    }));

export { Provider, globalStore, useStore };
