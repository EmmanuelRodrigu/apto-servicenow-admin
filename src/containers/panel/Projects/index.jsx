import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import { useStore } from '@store';
import Paginate from '@components/Paginate';
import paramsState from "@components/Hooks/Params";
import { useDebouncedCallback } from "use-debounce";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import imgLoading from "@assets/loading.gif";

export default function Projects() {
    const store = useStore();
    const { app } = store;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const {useCustomParams, location, paginate, setPaginate} = paramsState();
    const [params, updateParams] = useCustomParams();
    const [query, setQuery] = useState(params.query ? params.query : '');
    const [order, setOrder] = useState(params.order ? params.order : '');
    const [option, setOption ] = useState(params.option ? params.option : '');
    const [arrowOrder, setArrowOrder] = useState({ id: 'ASC', name: 'ASC', rfc: 'ASC', name_client: 'ASC' });

    const getData = async () => {
        await http.get('api/projects', params)
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
            field == 'id' ? { id: status, name: arrowOrder.name, rfc: arrowOrder.rfc, name_client: arrowOrder.name_client } : 
            field == 'name' ? { id: arrowOrder.id, name: status, rfc: arrowOrder.rfc, name_client: arrowOrder.name_client } : 
            field == 'rfc' ? { id: arrowOrder.id, name: arrowOrder.name, rfc: status, name_client: arrowOrder.name_client } : 
            field == 'name_client' ? { id: arrowOrder.id, name: arrowOrder.name, rfc: arrowOrder.rfc, name_client: status } : 
            ''
        )
        setOrder(status);
        setOption(field)
        debounceQuery();
    }

    const syncProjects = async () => {
        setLoading(true)
        http.get('api/projects/sync')
            .then((response) => {
                if(response.sync) {
                    notify(response.message, 'success');
                } else {
                    notify('Sincronizacion exitosa', 'success');
                }
            })
            .catch((error) => {
                notify(error, 'error')
            });
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [location])

    const debounceQuery = useDebouncedCallback(() => {
        updateParams({query, order, option, page: 1});
        getData();
    }, app.debounceTime)

    return (
        <div className="" >
            <div className="flex justify-between pb-5 w-1/7 h-18">
                <h1 className="title">Proyectos</h1>
                <button 
                    className="p-2 bg-black text-lg text-white rounded-lg text-center"
                    onClick={syncProjects}
                    >
                    { loading ? <img className="w-10 h-10" src={imgLoading} /> : "Sincronizar proyectos"}
                </button>
            </div>
            <div className="flex filter flex-wrap">
                <div className="pt-5 pb-5 pl-10 relative">
                    <p className="text-lg">Busqueda de proyectos</p>
                    <input 
                        className="text-sm text-left pl-2 h-8 w-60 rounded-md" 
                        placeholder="Buscar por nombre o ID" 
                        type="text"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            debounceQuery();
                        }}
                    />
                </div>
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Filtros</p>
                    <div className=" relative">
                        <div className="pr-5">
                         <input 
                            className="text-sm text-center pr-5 h-8 w-48 rounded-md" 
                            placeholder="Fecha de creacion" 
                            type="date"
                            onChange={(date) => {
                                console.log(date.target.value)
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
                                        Nombre proyecto
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.name == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'name') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'name') }} />)}
                                        </div> 
                                    </div>
                                </th>
                                <th>
                                    <div className="flex">
                                        RFC cliente
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.rfc == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'rfc') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'rfc') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex">
                                        Nombre cliente
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.name_client == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'name_client') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'name_client') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>Tipo de proyecto</th>
                                <th>Fecha de creacion</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <td>
                                <Link className="table-id" to={`/detalles-proyecto/${v.id}`}>
                                    {v.id}
                                </Link>
                                </td>
                                <td>{v.name}</td>
                                <td>{v?.client?.rfc ? v.client.rfc : 'Cliente no asignado'}</td>
                                <td>{v?.client?.name ? v.client.name : 'Cliente no asignado'}</td>
                                <td>{v.type_project}</td>
                                <td>{v.created_at}</td>
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