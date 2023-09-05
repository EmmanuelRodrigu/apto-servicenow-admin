import React, { useState, useEffect } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Link } from "react-router-dom";
import Select from 'react-select';
import { FaTrash, FaMailBulk } from 'react-icons/fa';
import Paginate from '@components/Paginate';

export default function Clients() {
    const [list, setList] = useState([]);
    const [params, setParams] = useState([]);
    const [pagesLength, setPagesLength] = useState(null);
    const options = [
        { value: 'MASTER', label: 'Master' },
        { value: 'ADMIN', label: 'Admin' },
    ]

    const getData = async () => {
        await http.get('api/clients', params)
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

    return (
        <div className="" >
            <div className="flex justify-between pb-5">
                <h1 className="title">Clientes</h1>
                <Link className="w-40 text-center bg-black text-slate-50 py-2 rounded-full" to="/nuevo-cliente">Nuevo cliente</Link>
            </div>
            <div className="flex filter">
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Busqueda de clientes</p>
                    <input className="text-sm text-left pl-2 h-8 w-60 rounded-md" placeholder="Buscar por contacto o ID" type="text"></input>
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
                                <th>RFC</th>
                                <th>Contacto principal</th>
                                <th>Correo electronico</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <a className={`table-id`} href={`/detalles-usuario/${v?.client?.id ? v.client.id : ''}`}>
                                    <td>{v?.client?.id ? v.client.id : ''}</td>
                                </a>
                                <td>{v?.client?.rfc ? v?.client?.rfc : ''}</td>
                                <td>{v?.major_contact?.name ? v?.major_contact?.name : ''}</td>
                                <td>{v?.major_contact?.email ? v?.major_contact?.email : ''}</td>
                                <td className="flex justify-left">
                                    <div className="pr-4">
                                        <FaTrash className="h-6" onClick={() => console.log('eliminar')}/>
                                    </div>
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
                pages={[1, 2, 3, 4]}
                currentPage={2}
                pagesLength={pagesLength}
            />
        </div>
            
    )
}