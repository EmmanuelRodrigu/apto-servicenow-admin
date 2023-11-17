import React, { useState, useEffect } from "react";
import { useStore } from '@store';
import { http } from '@providers/http.js';
import notify from '@utils/notify'
import { Link, Navigate, useParams } from "react-router-dom";
import Weekly from "./weekly"
import Paginate from '@components/Paginate';
import paramsState from "@components/Hooks/Params";
import { useDebouncedCallback } from "use-debounce";

export default function MyProject() {
    const store = useStore();
    const { app } = store;
    const { clientId } = useParams();
    const {useCustomParams, location, paginate, setPaginate}  = paramsState();
    const [params, updateParams] = useCustomParams();
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null);
    const [list, setList] = useState([]);

    const getData = async () => {
        await http.get(`api/clients/${clientId}/data-client`)
        .then((response) => {
                const parse = new Date(response.createdAt);
                setDate(parse.toLocaleDateString())
                setData(response)
            })
            .catch((error) => {
                notify(error, 'error')
            })
    };

    const requests = async () => {
        await http.get(`api/requests/${clientId}`)
            .then((response) => {
                setList(response.data);
                setPaginate(response.paginate);
            })
            .catch((error) => {
                notify(error, 'error');
            })
    };

    const debounceQuery = useDebouncedCallback(() => {
        updateParams({query, page: 1});
        getData()
    }, app.debounceTime)

    useEffect(() => {
        getData();
        requests();
    }, [location]);

    return (
        <div className="p-10">
            <div className="flex bg-slate-100 rounded-lg w-full">
                <div className="flex p-7 justify-start text-center space-x-6">
                    <img className="w-10 h-10" src={`${data?.avatarUrl}`}></img>
                    <h2 className="text-4xl text-fuchsia-900 pr-10">{data?.nameClient}</h2>
                    <p className="text-black p-2 text-lg">RFC: { data?.rfc } </p>
                    <p className="text-black p-2 text-lg">Nombre proyecto: { data?.nameProject } </p>
                    <p className="text-black p-2 text-lg">Inicio de proyecto: { date } </p>
                </div>
            </div>
            <div className="p-7">
                <h2 className="subtitle">Solicitudes</h2>
                <p className="text-sm">En la siguiente lista se muestran las solicitudes de nuevas funcionalidades, reportes de bug, soporte tecnico.</p>
                <div className="pt-6">
                    {
                    !list ? '' : 
                    <>
                        <div>
                            <table className="pt-4 border border-2 rounded-lg table-border-inside">
                                <thead className="border border-2 table-head">
                                    <tr>
                                        <th>Responsable</th>
                                        <th>Titulo</th>
                                        <th>Fecha de creacion</th>
                                        <th>Tipo</th>
                                        <th>Estatus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map((v, i) => (
                                        <tr key={`index-${i}`}>
                                            <td>
                                                <div className="flex">
                                                    <img className="rounded-full" src={v.reporter.avatarUrl}/>
                                                    <div className="text-center text-sm py-4 pl-2">
                                                        {v.reporter.displayName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{v.summary}</td>
                                            <td>{v.created_at}</td>
                                            <td>{ v.type_request === 'FUNCTIONALITY' ? 'Nueva funcionalidad' : v.type_request === 'BUG' ? 'Bug' : 'Soporte tecnico' }
                                            
                                            </td>
                                            <td className="w-1/8">
                                                <p 
                                                    className={`w-1/2 ${!v.status ? 'status-pending' 
                                                    : v.status === 'Backlog' ? 'status-backlog' 
                                                    : v.status === 'Done' ? 'status-done' 
                                                    : v.status === 'To Do' ? 'status-todo'
                                                    : v.status === 'In Progress' ? 'status-pr'
                                                    : v.status === 'Work in progress' ? 'status-pr' : ''}`}
                                                >
                                                    {v.status ? v.status : 'PENDIENTE'}
                                                </p>
                                                    
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
                <Weekly 
                    clientId={clientId}
                />
            </div>
        </div>
    )
}