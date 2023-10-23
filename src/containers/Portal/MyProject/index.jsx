import React, { useState, useEffect } from "react";
import { useStore } from '@store';
import { http } from '@providers/http.js';
import notify from '@utils/notify'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { useParams } from "react-router-dom";

export default function MyProject() {
    const store = useStore();
    const { user } = store;
    const { clientId } = useParams();
    const [data, setData] = useState(null);

    const getData = async () => {
        const date = new Date();
        await http.get(`api/clients/${clientId}/data-client`)
            .then((response) => {
                setData(response)
            })
            .catch((error) => {
                notify(error, 'error')
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="p-10">
            <div className="flex bg-slate-100 rounded-lg w-full">
                <div className="flex p-7 justify-start text-center space-x-6">
                    <img src="https://aptomx.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10554"></img>
                    <h2 className="text-4xl text-fuchsia-900 pr-10">{data?.nameClient}</h2>
                    <p className="text-black p-2 text-lg">RFC: { data?.rfc } </p>
                    <p className="text-black p-2 text-lg">Nombre proyecto: { data?.nameProject } </p>
                    <p className="text-black p-2 text-lg">Inicio de proyecto: { '10/10/23' } </p>
                </div>
                        <div className="flex py-10 pr-4 pl-48">
                            <p className="text-sm pr-1">Pagos</p>
                            <FaArrowAltCircleRight />
                        </div>
                        <div className="flex py-10 pr-4">
                            <p className="text-sm pr-1">Facturas</p>
                            <FaArrowAltCircleRight />
                        </div>
                        <div className="flex py-10 pr-4">
                            <p className="text-sm pr-1">Archivos</p>
                            <FaArrowAltCircleRight />
                        </div>
            </div>
            <div className="p-7">
                <h2 className="subtitle">Solicitudes</h2>
                <p className="text-sm">En la siguiente lista se muestran las solicitudes de nuevas funcionalidades, reportes de bug, soporte tecnico.</p>
                <div className="pt-6">
                    <div>
                        <table className="pt-4 border border-2 rounded-lg">
                            <thead className="border border-2">
                                <tr>
                                    <th>Responsable</th>
                                    <th>Titulo</th>
                                    <th>Fecha de creacion</th>
                                    <th>Tipo</th>
                                    <th>Estatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="flex">
                                            <img src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/63977fab76fb74a951420eaf/411c9f8a-301a-4a9b-bcfa-08299e5ba2e9/48"/>
                                            <div className="p-1 text-sm">
                                                Emmanuel
                                                <p className="text-slate-400">emmanuel@apto.mx</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Ticket test</td>
                                    <td>10/10/2023</td>
                                    <td>Soporte tecnico</td>
                                    <td>
                                    <p className="bg-indigo-200 text-lg w-min">PENDING</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex">
                                            <img src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:d14d43ca-cef3-4d2d-b402-bbbf6cc9d8e0/626dc7d8-0473-47de-953e-bc3a5bde0736/48"/>
                                            <div className="p-1 text-sm">
                                                Jose Manuel
                                                <p className="text-slate-400">jcorona@apto.mx</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Ticket test</td>
                                    <td>10/10/2023</td>
                                    <td>Nueva funcionalidad</td>
                                    <td>
                                        <p className="bg-green-200 text-lg w-min">DONE</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}