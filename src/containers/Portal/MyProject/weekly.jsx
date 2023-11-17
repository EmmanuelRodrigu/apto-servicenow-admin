import React, { useState, useEffect } from "react";
import { http } from "@providers/http";
import { Link } from "react-router-dom";

export default function Weekly({ clientId }) {
    const [list, setList] = useState([]);

    const getData = async () =>{
        http.get(`api/clients/${clientId}/weekly`)
            .then((response) => {
                setList(response);
            })
            .catch((error) => {
                notify(error, 'error');
            })
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="p-1 pt-10 space-y-1">
            <h1 className="subtitle">Avances Semanales</h1>
            <p className="text-sm pb-4">En la siguiente tabla se muestan los avances semanales del proyecto, para descargar el archivo tiene que hacer click en el ID.</p>
            {
                !list ? '' : 
                <>
                    <div className="text-center">
                        <table className="bg-slate-100 table-border table-responsive table-border-inside">
                            <thead className="font-bold text-lg">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Titulo</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                list.map((v, i) => (
                                    <tr key={`index-${i}`}>
                                        <td>
                                            <Link to={`${v.urlFile}`} className="table-id">
                                                {v.id}
                                            </Link>
                                        </td>
                                        <td> {v.title} </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
}