import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import Select from 'react-select';
import { useStore } from '@store';
import Paginate from '@components/Paginate';
import paramsState from "@components/Hooks/Params";
import { useDebouncedCallback } from "use-debounce";

export default function Projects() {
    const store = useStore();
    const { app } = store;
    const [list, setList] = useState([]);
    const [pagesLength, setPagesLength] = useState(null);
    const {useCustomParams, paginate, setPaginate}  = paramsState();
    const [params, updatedParams] = useCustomParams();
    const [query, setQuery] = useState(params.query ? params.query : '');
    const [order, setOrder] = useState(params.order ? params.order : '');

    const options = [
        {value: 'ASC', label: 'ID Ascendente'},
        {value: 'DESC', label: 'ID Descendente'},
    ]

    const getData = async () => {
        await http.get('api/projects', params)
            .then((response) => {
                setList(response);
                setPagesLength(response.length);
                console.log(response)
            })
            .catch((error) => {
                notify(error, 'error')
            });
    };

    useEffect(() => {
        getData();
    }, [])

    const debounceQuery = useDebouncedCallback(() => {
        updatedParams({query, order, page: 1});
        getData()
    }, app.debounceTime)

    return (
        <div className="" >
            <div className="flex justify-between pb-5">
                <h1 className="title">Proyectos</h1>
            </div>
            <div className="flex filter">
                <div className="pt-5 pb-5 pl-10">
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
                <div className="pt-5 pb-5 pl-20">
                    <p className="text-lg">Filtros</p>
                    <div className="flex">
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
                        <div className="pr-5 h-6">
                        <Select
                            options={options}
                            className="text-sm text-left pr-5 h-6 w-48 rounded-md" 
                            placeholder="Ordenar por" 
                            onChange={(option) => {
                                setOrder(option.value);
                                debounceQuery();
                            }}
                         />
                        </div>
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
                                <th>Nombre proyecto</th>
                                <th>RFC cliente</th>
                                <th>Nombre cliente</th>
                                <th>Estatus</th>
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
                                <td>{v.client.rfc}</td>
                                <td>{v.client.name}</td>
                                <td>{}</td>
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
                pages={[1, 2, 3, 4]}
                currentPage={2}
                pagesLength={pagesLength}
            />
        </div>
            
    )
}