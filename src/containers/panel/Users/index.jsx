import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Paginate from '@components/Paginate';
import paramsState from "@components/Hooks/Params";
import { useDebouncedCallback } from "use-debounce";
import { useStore } from '@store';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function Users() {
    const store = useStore();
    const { app } = store;
    const [list, setList] = useState([]);
    const {useCustomParams, location, paginate, setPaginate}  = paramsState();
    const [params, updateParams] = useCustomParams();
    const [query, setQuery] = useState(params.query ? params.query : '');
    const [order, setOrder] = useState(params.order ? params.order : '');
    const [rol, setRol] = useState(params.rol ? params.rol : '');
    const [option, setOption ] = useState(params.option ? params.option : '');
    const [arrowOrder, setArrowOrder] = useState({ id: 'ASC', full_name: 'ASC', email: 'ASC'})

    const optionsRol = [
        { value: 'MASTER', label: 'Master' },
        { value: 'ADMIN', label: 'Admin' },
    ];

    const getData = async () => {
        await http.get('api/users', params)
            .then((response) => {
                setList(response.data);
                setPaginate(response.paginate)
            })
            .catch((error) => {
                notify(error, 'error')
            });
    };

    const changeArrow = (status, field) => {
        setArrowOrder(
            field == 'id' ? { id: status, full_name: arrowOrder.full_name, email: arrowOrder.email } : 
            field == 'full_name' ? { id: arrowOrder.id, full_name: status, email: arrowOrder.email } : 
            field == 'email' ? { id: arrowOrder.id, full_name: arrowOrder.full_name, email: status } :
            ''
        )
        setOrder(status);
        setOption(field)
        debounceQuery();
    }

    useEffect(() => {
        getData();
    }, [location])

    const debounceQuery = useDebouncedCallback(() => {
        updateParams({query, order, option, rol, page: 1});
        getData()
    }, app.debounceTime)

    return (
        <div className="" >
            <div className="flex justify-between pb-5">
                <h1 className="title">Usuarios</h1>
                <Link className="w-40 text-center bg-black text-slate-50 py-2 rounded-full" to="/crear-usuario">Nuevo usuario</Link>
            </div>
            <div className="flex filter flex-wrap gap-x-5">
                <div className="pt-5 pb-5 pl-10 relative">
                    <p className="text-lg">Busqueda de usuarios</p>
                    <input 
                        className="text-sm text-left pl-2 h-8 w-60 rounded-md" 
                        placeholder="Buscar por nombre o ID" 
                        type="text"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            debounceQuery();
                        }}
                        value={query}
                    />
                </div>
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Filtros</p>
                    <div className="flex flex-wrap">
                        <div className="pr-5 relative">
                         <input className="text-sm text-center pr-5 h-8 w-48 rounded-md" placeholder="Fecha de creacion" type="date"></input>
                        </div>
                        <div className="relative">
                            <Select
                                className="text-sm w-40"
                                isClearable={true}
                                options={optionsRol}
                                placeholder="Rol"
                                onChange={(option) => {
                                    setRol(option.value);
                                    debounceQuery();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {!list ? '' : 
            <>
                <div className="pt-5 table-responsive table-border table-border-inside">
                    <table>
                        <thead className="table-head">
                            <tr >
                                <th>
                                    <div className="flex">
                                        ID
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.id == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'id') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'id') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex">
                                        Nombre
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.full_name == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'full_name') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'full_name') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex">
                                        Correo electronico
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.email == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'email') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'email') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>Fecha de creacion</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <td>
                                    <Link className="table-id" to={`/detalles-usuario/${v.id}`}>
                                        {v.id}
                                    </Link>
                                </td>
                                <td>{v.full_name}</td>
                                <td>{v.accountUser.email}</td>
                                <td>{v.accountUser.created_at}</td>
                                <td>{v.rolId == 1 ? 'MASTER': 'ADMIN'}</td>
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
                paginate={paginate}
                updateParams={updateParams}
            />
        </div>
            
    )
}