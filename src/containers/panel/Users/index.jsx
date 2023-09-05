import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';
import Paginate from '@components/Paginate';

export default function Users() {
    const [list, setList] = useState([]);
    const [params, setParams] = useState([]);
    const [pagesLength, setPagesLength] = useState(null);
    const options = [
        { value: 'MASTER', label: 'Master' },
        { value: 'ADMIN', label: 'Admin' },
    ]

    const getData = async () => {
        await http.get('api/users', params)
            .then((response) => {
                setList(response);
                setPagesLength(response.length);
            })
            .catch((error) => {
                notify(error, 'error')
            });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="" >
            <div className="flex justify-between pb-5">
                <h1 className="title">Usuarios</h1>
                <Link className="w-40 text-center bg-black text-slate-50 py-2 rounded-full" to="/crear-usuario">Nuevo usuario</Link>
            </div>
            <div className="flex filter">
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Busqueda de usuarios</p>
                    <input className="text-sm text-left pl-2 h-8 w-60 rounded-md" placeholder="Buscar por nombre o ID" type="text"></input>
                </div>
                <div className="pt-5 pb-5 pl-20">
                    <p className="text-lg">Filtros</p>
                    <div className="flex">
                        <div className="pr-5">
                         <input className="text-sm text-center pr-5 h-8 w-48 rounded-md" placeholder="Fecha de creacion" type="date"></input>
                        </div>
                        <Select
                            className="text-sm w-40"
                            options={options}
                            placeholder="Rol"
                            
                        />
                    </div>
                </div>
            </div>
            {!list ? '' : 
            <>
                <div className="pt-5">
                    <table className="table-responsive table-border table-border-inside">
                        <thead className="table-head">
                            <tr >
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Fecha de creacion</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <a className="table-id" href={`/detalles-usuario/${v.user.id}`}><td>{v.user.id}</td></a>
                                <td>{v.user.full_name}</td>
                                <td>{v.data.email}</td>
                                <td>{v.data.created_at}</td>
                                <td>{v.rol.rol == 1 ? 'MASTER': 'ADMIN'}</td>
                                <td>{}</td>
                            </tr>
                        ))

                    }   
                        </tbody>
                    </table>

                </div>
            
            </>

            }
            <Paginate
                pages={[1, 2, 3, 4]}
                currentPage={2}
                pagesLength={pagesLength}
            />
        </div>
            
    )
}