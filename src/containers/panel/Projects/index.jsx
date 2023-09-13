import React, { useState, useEffect } from "react"
import { http } from '@providers/http.js'
import notify from '@utils/notify'
import { Link } from "react-router-dom";
import Select from 'react-select'
import Paginate from '@components/Paginate'

export default function Projects() {
    const [list, setList] = useState([]);
    const [params, setParams] = useState([]);
    const [pagesLength, setPagesLength] = useState(null);
    const options = [
        { value: 'CMS', label: 'Administrador' },
        { value: 'APP', label: 'App movil' },
        { value: 'LP', label: 'Landing page' },
        { value: 'AW', label: 'App web' },
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

    return (
        <div className="" >
            <div className="flex justify-between pb-5">
                <h1 className="title">Proyectos</h1>
            </div>
            <div className="flex filter">
                <div className="pt-5 pb-5 pl-10">
                    <p className="text-lg">Busqueda de proyectos</p>
                    <input className="text-sm text-left pl-2 h-8 w-60 rounded-md" placeholder="Buscar por nombre o ID" type="text"></input>
                </div>
                <div className="pt-5 pb-5 pl-20">
                    <p className="text-lg">Filtros</p>
                    <div className="flex">
                        <div className="pr-5">
                         <input className="text-sm text-center pr-5 h-8 w-48 rounded-md" placeholder="Fecha de creacion" type="date"></input>
                        </div>
                        <Select
                            className="text-sm w-60"
                            options={options}
                            placeholder="Tipo de proyecto"
                            
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
                                <th>Nombre proyecto</th>
                                <th>RFC cliente</th>
                                <th>Nombre cliente</th>
                                <th>Contacto</th>
                                <th>Estatus</th>
                                <th>Fecha de creacion</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        list.map((v, i) => (
                            <tr key={`index-${i}`}>
                                <Link className="border-x border-y rounded-full bg-black text-white hover:bg-indigo-600" to={`/detalles-proyecto/${v.id}`}><td>{v.id}</td></Link>
                                <td>{v.name_project}</td>
                                <td>{v.rfc}</td>
                                <td>{v.name_client}</td>
                                <td>{v.contact}</td>
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