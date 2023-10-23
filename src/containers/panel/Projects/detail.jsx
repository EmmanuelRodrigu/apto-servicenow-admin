import React, { useEffect, useState } from 'react';
import { http } from '@providers/http';
import notify from "@utils/notify";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from './Form/update';
import Modal from '@components/Modal';

export default function DetailsProject() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const modalHandler = () => {
        setShowModal(!showModal);
    };

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