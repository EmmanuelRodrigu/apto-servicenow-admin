export const routesList = [
    {
        name: null,
        icon: 'dashboard',
        haveChildren: false,
        children: [
            {
                name: 'Dashboard',
                route: 'dashboard',
            },
        ],
    },
    {
        name: null,
        icon: 'news',
        haveChildren: false,
        children: [
            {
                name: 'Noticias',
                route: 'noticias',
            }
        ]
    },
    {
        name: 'Clientes',
        icon: 'clients',
        haveChildren: 'true',
        children: [
            {
                name: 'Clientes',
                route:'clientes'
            },
            {
                name:'Nuevo cliente',
                route: 'nuevo-cliente',
            }
        ]
    },
    {
        name: 'Proyectos',
        icon: 'projects',
        haveChildren: true,
        children: [
            {
                name: 'Listado de proyectos',
                route: 'proyectos',
            },
            {
                name: 'Crear proyecto',
                route: 'crear-proyecto',
            },
        ],
    },
    {
        name: 'Solicitudes',
        icon: 'support',
        haveChildren: true,
        children: [
            {
                name: 'Solicitudes de soporte',
                route: 'solicitudes-de-soporte',
            },
        ],
    },
    {
        name: 'Administrador de usuarios',
        icon: 'users',
        haveChildren: true,
        children: [
            {
                name: 'Listado de usuarios',
                route: 'usuarios',
            },
            {
                name: 'Crear usuario',
                route: 'crear-usuario',
            },
        ],
    },
]