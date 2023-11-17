import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import { useStore } from '@store';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Paginate from '@components/Paginate';
import paramsState from "@components/Hooks/Params";
import { useDebouncedCallback } from "use-debounce";
import Modal from '@components/Modal';

export default function Request() {
    const store = useStore();
    const { app } = store;
    const [list, setList] = useState([]);
    const {useCustomParams, location, paginate, setPaginate}  = paramsState();
    const [params, updateParams] = useCustomParams();
    const [query, setQuery] = useState(params.query ? params.query : '');
    const [order, setOrder] = useState(params.order ? params.order : '');
    const [option, setOption ] = useState(params.option ? params.option : '');
    const [arrowOrder, setArrowOrder] = useState({ id: 'ASC', name_project: 'ASC', summary: 'ASC' });

    const getData = async () => {
        setList(null)
        await http.get('api/requests', params)
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
            field == 'id' ? { id: status, name_project: arrowOrder.name_project, summary: arrowOrder.summary } : 
            field == 'summary' ? { id: arrowOrder.id, name_project: arrowOrder.name_project, summary: status } : 
            field == 'name_project' ? { id: arrowOrder.id, name_project: status, summary: arrowOrder.summary } : ''  
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
                <h1 className="title">Solicitudes de Soporte</h1>
            </div>  
            <div className="flex filter">
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Busqueda de solicitudes</p>
                    <input 
                        className="text-sm text-left pl-2 h-8 w-60 rounded-md" 
                        placeholder="Buscar por titulo o ID" 
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
                                        Titulo
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.summary == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'summary') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'summary') }} />)}
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex">
                                        Nombre Proyecto
                                        <div className="pt-1 pl-1">
                                            { arrowOrder.name_project == 'ASC' ? (<FaArrowUp onClick={() => { changeArrow('DESC', 'name_project') }} />) : (<FaArrowDown onClick={() => { changeArrow('ASC', 'name_project') }} />) }
                                        </div>
                                    </div>
                                </th>
                                <th>Fecha creacion</th>
                                <th>Estatus</th>
                                <th>Tipo de solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <td>
                                    <Link className={`table-id`} to={`/solicitudes-de-soporte/${v.id}`}>
                                        {v.id}
                                    </Link>
                                </td>
                                <td className="pt-1">{v.summary}</td>
                                <td>{v.project.name}</td>
                                <td>{v.created_at}</td>
                                <td>{v.status}</td>
                                <td>{v.type_request}</td>
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