import { useEffect } from 'react';

export function useEffectAsync(effect, inputs) {
    useEffect(() => {
        effect();
    }, inputs);
}
export function getDriverStorage() {
    if (import.meta.env.VITE_LOCAL_STORAGE === 'true') {
        return localStorage;
    }
    return sessionStorage;
}
export function sidebarAction(status, store) {
    getDriverStorage().setItem('sidebarApto', status);
    store.setSidebar(status);
};
export function getSidebar(store) {
    const sidebar = getDriverStorage().getItem('sidebarApto');
    if (sidebar != null) {
        if (sidebar == 'true') {
            sidebarAction(true, store);
        } else {
            sidebarAction(false, store);
        }
    } else {
        sidebarAction(true, store);
    }
}
export function getJwt(user) {
    const jwt =
        user.jwt != null
            ? user.jwt
            : getDriverStorage().getItem('tokenApto');
    return jwt;
};
export function getUser(user) {
    const us =
        user.payload != null
            ? user.payload
            : JSON.parse(
                getDriverStorage().getItem('currentUser')
            );
    return us;
};
export function getHasSession(user) {
    const jwt = getJwt(user);
    const us = getUser(user);
    if (
        jwt !== null &&
        us !== null &&
        typeof jwt === 'string' &&
        typeof us === 'object'
    ) {
        return true;
    }
    return false;
};

export function canViewModules(modulePermissions, nameRoute) {
    const search = modulePermissions.find(mo => mo.includes(nameRoute));
    return search ? true : false
  }

export function userFormatShort(response, type) {
    if(type === 'client') {
        return {
            id: response.id,
            email: response.email,
            name: response.name,
            rol: response.rol
        }
    }
    return {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        fullName: response.fullName,
        photo: response.photo,
    };
}

export function setRol(rol, store) {
    store.app.rol = rol;
    return true;
}