import React, { useEffect, useState } from 'react';
import { http } from '@providers/http';
import notify from "@utils/notify";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from './Form/update';

export default function NewClient() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const getData = () => {
        http.get(`api/clients/${id}`)
            .then((response) => {
                setData(response);
                console.log(response);
            })
            .catch((error) => {
                notify(error, 'error');
            });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="">
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