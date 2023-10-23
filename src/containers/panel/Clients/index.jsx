import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import { useStore } from '@store';
import { FaMailBulk, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Paginate from '@components/Paginate';
import paramsState from "@components/Hooks/Params";
import { useDebouncedCallback } from "use-debounce";

export default function Clients() {
    const store = useStore();
    const { app } = store;
    const [list, setList] = useState([]);
    const {useCustomParams, location, paginate, setPaginate}  = paramsState();
    const [params, updateParams] = useCustomParams();
    const [query, setQuery] = useState(params.query ? params.query : '');
    const [order, setOrder] = useState(params.order ? params.order : '');
    const [option, setOption ] = useState(params.option ? params.option : '');
    const [arrowOrder, setArrowOrder] = useState({ id: 'ASC', name: 'ASC', rfc: 'ASC' })

    const getData = async () => {
        setList(null)
        await http.get('api/clients', params)
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
            field == 'id' ? { id: status, name: arrowOrder.name, rfc: arrowOrder.rfc } : 
            field == 'name' ? { id: arrowOrder.id, name: status, rfc: arrowOrder.rfc } : 
            field == 'rfc' ? { id: arrowOrder.id, name: arrowOrder.name, rfc: status } : ''
        )
        setOrder(status);
        setOption(field)
        debounceQuery();
    }

    useEffect(() => {
        getData();
    }, [location])
    
    const debounceQuery = useDebouncedCallback(() => {
        updateParams({query, order, option, page: 1});
        getData()
    }, app.debounceTime)

    return (
        <div className="" >
            <div className="flex justify-between pb-5">
                <h1 className="title">Clientes</h1>
                <Link className="w-40 text-center bg-black text-slate-50 py-3 rounded-full" to="/nuevo-cliente">Nuevo cliente</Link>
            </div>  
            <div className="flex filter">
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Busqueda de clientes</p>
                    <input 
                        className="text-sm text-left pl-2 h-8 w-60 rounded-md" 
                        placeholder="Buscar por contacto o ID" 
                        type="text"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            debounceQuery();
                        }}
                        value={query}
                    />
                </div>
            </div>
            {!list ? '' : 
            <>
                <div className="pt-5">
                    <table className="table-responsive table-border table-border-inside">
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
                                        RFC
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.rfc == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'rfc') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'rfc') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex">
                                        Nombre
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.name == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'name') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'name') }} />) }
                                        </div>
                                    </div>
                                </th>
                                <th>Contacto principal</th>
                                <th>Correo electronico</th>
                                <th>Telefono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <td>
                                    <Link className={`table-id`} to={`/detalles-cliente/${v.id}`}>
                                        {v.id}
                                    </Link>
                                </td>
                                <td className="pt-1">{v.rfc}</td>
                                <td>{v.name}</td>
                                <td>{v.full_name}</td>
                                <td>{v.email}</td>
                                <td>{v.phone}</td>
                                <td className="flex justify-left">
                                    <FaMailBulk className="h-6" onClick={() => console.log('email')}/>
                                </td>
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