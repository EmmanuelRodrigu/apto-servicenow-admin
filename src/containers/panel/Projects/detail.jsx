import React, { useEffect, useState } from 'react';
import { http } from '@providers/http';
import notify from "@utils/notify";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from './Form/update';
import { FaTrash } from 'react-icons/fa';

export default function DetailsProject() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const getData = async () => {
        http.get(`api/projects/${id}`)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex flex-cols-2 justify-between pr-32">
                <h1 className="title">Detalles - Editar proyecto</h1>
                <FaTrash style={{ height: 40, width: 40, color: 'black' }} 
                    onClick={() => {
                        console.log('delete')
                    }}
                />
            </div>
            {
                data ? (
                    <Form
                        data={data}
                        id={id}
                        navigate={navigate}
                    />
                ) : ''
            }
        </div>
    )
}