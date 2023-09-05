export const routesList = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        haveChildren: true,
        children: [
            {
                name: 'Dashboard',
                route: 'dashboard',
            },
        ],
    },
    {
        name: 'Noticias',
        icon: 'news',
        haveChildren: true,
        children: [
            {
                name: 'Noticias',
                rote: 'noticias',
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
    {
        name: 'Administrador de proyectos',
        icon: 'settings',
        haveChildren: true,
        children: [
            {
                name: 'Crear proyecto',
                route: 'crear-proyecto',
            },
            {
                name: 'Listado de pagos',
                route: 'listado-de-pagos'
            }
        ],
    },
]