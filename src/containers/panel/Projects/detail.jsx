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
                console.log(response)
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    const deleteProject = async () => {
        await http.delete(`api/projects/delete/${id}`)
            .then((response) => {
                if(response) {
                    notify('proyecto eliminado', 'success');
                    navigate('/proyectos');
                } else {
                    notify('Error', 'error');
                }
            })
            .catch((error) => {
                notify(error, 'error')
            })
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex flex-cols-2 justify-between pr-32">
                <h1 className="title">Detalles - Editar proyecto</h1>
                <button onClick={() => { setShowModal(true) }} className='btn-delete'>Eliminar proyecto</button>
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
            <Modal
                isOpen={showModal}
                actionOpenOrClose={() => {
                    setModalShow();
                }}
                title={`¿Estás seguro de eliminar al cliente?`}
                size=""
                description="Al aceptar se eliminara el proeycto y no se podra recuperar."
            >
                <div className='flex justify-center gap-3'>
                    <button className="w-full" onClick={deleteProject}>Aceptar</button>
                    <button className="w-full" onClick={modalHandler}>Cancelar</button>
                </div>
            </Modal>
        </div>
    )
}