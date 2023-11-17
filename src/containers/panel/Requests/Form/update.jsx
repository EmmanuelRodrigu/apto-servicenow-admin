import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useStore } from '@store';
import Error from '@components/Error';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { http } from '@providers/http';
import notify from "@utils/notify";
import Modal from '@components/Modal';
import { FaCheck, FaTrash } from 'react-icons/fa';
import LogoClient from '@assets/icons/clients.svg';
import WysiwygEditor from "@components/TextEditor";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from "draftjs-to-html";

export default function UpdateRequest({ data, id, navigate, getData }) {
    const store = useStore();
    const { user } = store;
    const defaultContent = data.description[0];
    const [showModal, setShowModal] = useState(false);
    const [assigneeId, setAssigneeId] = useState(data.assignee ? data.assignee[0].value : null);
    const [comment, setComment] = useState(null);
    const [newComment, setNewComment] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const schema = yup.object({
        summary: yup.string().required('El campo titulo es requerido'),
        assignee: yup.string().required('El campo asignar es requerido'),
        reporter: yup.string().required('El campo responsable es requerido'),
    });

    const {
        setValue,
        register,
        handleSubmit,
        clearErrors,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            summary: data.summary,
            assignee: data.assignee ? data.assignee[0].value : '',
            reporter: data.reporter[0].value,
        }
    })

    const modalHandler = () => {
        setShowModal(!showModal);
    };

    const onSubmit = async (values) => {
        http.put(`api/requests/update/${id}`, values)
            .then((response) => {
                if(response.status) {
                    notify(response.message, 'success');
                    navigate('/solicitudes-de-soporte');
                }
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    const acceptRequest = async () => {
        let description = '';
        defaultContent.blocks.map((value) => { description += value.text })
        const values = {
            projectId: data.projectId,
            summary: data.summary,
            description: description,
            assigneeId: assigneeId,
        }
        http.post(`api/requests/accept/${id}`, values)
            .then((response) => {
                if(response.status) {
                    notify(response.message, 'success');
                    navigate('/solicitudes-de-soporte');
                } else {
                    notify(response.message, 'error');
                }
            })
            .catch((error) => {
                if(!error.ok) {
                    notify('Se requiere asignar un usuario');
                } else {
                    notify(error, 'error');
                }
            });
    };

    const deleteRequest = async () => {
        http.delete(`api/requests/delete/${id}`)
        .then((response) => {
            if(response.status) {
                notify(response.message, 'success');
                navigate('/solicitudes-de-soporte');
            } else {
                notify(response.message, 'error');
            }
        })
        .catch((error) => {
            notify(error, 'error');
        });
    };

    const createComment = async () => {
        if(comment) {
            http.post(`api/requests/comment`, comment)
                .then((response) => {
                    if(response) {
                        setNewComment(false);
                    } else {
                        notify('Error al crear comentario', 'error');
                    }
                })
                .catch((error) => {
                    notify(error, 'error');
                });
            getData();
            setComment(null);
        }
    };

    useEffect(() => {

    }, [getData])

    return (
        <div className="">
            <div className='flex flex-cols-2 justify-between pr-10'>
                <h1 className="title">Detalles - Actualizar solicitud de soporte</h1>
                <button onClick={() => { setShowModal(true) }} className='btn-delete'>Eliminar Solicitud</button>
            </div>
            <div className='p-4'>
                <div className='w-full border-2 shadow-sm'>
                    <div className='flex flex-cols-2 pt-4 border-y-2 justify-evenly bg-slate-100'>
                        <div className='p-1 pb-2'>
                            <p className='tex-sm'>TIPO DE SOLICITUD: {
                                data.type_request === 'SUPPORTREQUEST' ? 'Solicitud de soporte' : 
                                data.type_request === 'BUG' ? 'Bug' : 
                                data.type_request === 'FUNCTINALITY' ? 'Nueva funcionalidad' : ''
                                }
                            </p>
                            <p className='text-sm'>FECHA DE CREACION: {data.created_at}</p>
                        </div>
                        <div className='p-1 pb-4'>
                            <p className='tex-sm'>PROYECTO: { data.project.name }</p>
                            <p className='text-sm'>ID EN JIRA: { data.id_jira ? data.id_jira : 'N/A' }</p>
                        </div>
                    </div>
                    {
                        data.issue ? (
                            <div className='flex pt-2 space-x-2'>
                                <p className={`w-full ${!data.issue.fields.status.name ? 'status-pending' 
                                    : data.issue.fields.status.name === 'Backlog' ? 'status-backlog' 
                                    : data.issue.fields.status.name === 'Done' ? 'status-done' 
                                    : data.issue.fields.status.name === 'To Do' ? 'status-todo'
                                    : data.issue.fields.status.name === 'In Progress' ? 'status-pr'
                                    : data.issue.fields.status.name === 'Work in progress' ? 'status-pr' : ''}`}
                                >
                                    { data.issue.fields.status.name }
                                </p>
                            </div>
                        ) : ''
                    }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='p-10'>
                            <div className='w-full pt-2'>
                                <label className='text-input'>Titulo*</label>
                                <input
                                    className={`input-form ${errors?.summary ? 'error' : ''}`}
                                    type='text'
                                    disabled={true}
                                    { ...register('summary') }
                                />
                                <Error error={errors?.summary} />
                            </div>
                            <div className='w-full pt-2'>
                                <label className='text-input'>Descripcion*</label>
                                <WysiwygEditor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    initialContent={defaultContent}
                                    disabled={true}
                                />
                            </div>
                            {
                                data.id_jira ? (
                                <div className='p-2'>
                                    <div className='flex'>
                                        <label className='text-lg'
                                            onClick={() => { setNewComment(true) }}
                                        >
                                            + Comentario
                                        </label>
                                        {
                                            newComment && (
                                                <div className='flex p-1.5 space-x-2'>
                                                    <FaTrash size={'14'} onClick={() => { setNewComment(false) }}/>
                                                    <FaCheck size={'14'} onClick={() => { createComment() }}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        newComment && (
                                            <div className=''>
                                                <input
                                                    className={`input-form ${ comment ? '' : 'error' }`}
                                                    onChange={(e) => {
                                                        setComment({ accountId: user.payload.id, comment: e.target.value, requestId: id });
                                                    }}
                                                />
                                            </div>
                                        )
                                    }
                                    {
                                        data.comments.map((value) => (
                                            <>
                                                <div className='flex p-1 bg-slate-100 border-b-2 space-x-2' key={`comment-${value.id}`}>
                                                    <img 
                                                        className='w-8 h-8' 
                                                        src={data.project.avatarUrl ? data.project.avatarUrl : LogoClient} 
                                                    />
                                                    <div className=''>
                                                        <p className=''>{value.comment}</p>
                                                        <p className='text-slate-600'>{data.project.name} - {value.created_at}</p>
                                                    </div>

                                                </div>
                                            </>
                                        ))
                                    }
                                </div>

                                ) : ''
                            }
                            <div className='flex flex-cols-2 flex-wrap justify-evenly pt-4'>
                                <div className='pt-2 relative'>
                                    <label className='text-input'>Responsable*</label>
                                    <Select
                                        isDisabled={true}
                                        value={data.reporter}
                                        isClearable={true}
                                        className={`input-form ${errors?.reporter ? 'error' : ''}`}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none',
                                            width: '16rem',
                                            }),
                                        }}
                                        onChange={(option) => {
                                            if(option != null) {
                                                setValue('reporter', option.value);
                                            } else {
                                                setValue('reporter')
                                                clearErrors('reporter')
                                            }
                                        }}
                                    />
                                    <Error error={errors?.reporter} />
                                </div>
                                <div className='pt-2 relative'>
                                    <label className='text-input'>Asignado a*</label>
                                    <Select
                                        defaultInputValue={data.assignee ? data.assignee[0].label : ''}
                                        isClearable={true}
                                        className={`input-form ${errors?.assignee ? 'error' : ''}`}
                                        options={data.users}
                                        placeholder=''
                                        styles={{
                                            control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none',
                                            width: '16rem',
                                            }),
                                        }}
                                        onChange={(option) => {
                                            if(option != null) {
                                                setValue('assignee', option.value);
                                                setAssigneeId(option.value)
                                            } else {
                                                setValue('assignee')
                                                clearErrors('assignee')
                                            }
                                        }}
                                    />
                                    <Error error={errors?.assignee} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-cols-2 justify-between pt-10 pr-10 pb-6 pl-4'>
                            {
                                !data.id_jira ? (
                                    <div className='w-40 h-10 border-x border-y border-black text-white bg-black rounded-lg hover:bg-violet-900' 
                                        onClick={acceptRequest}>
                                        <p className='text-center p-1.5'>Aceptar solicitud</p>
                                    </div>
                                ) : ''
                            }
                            <div className='flex flex-wrap'>
                                <div className='pr-4 relative'>
                                    <button type='submit' className='btn-primary'>Guardar</button>
                                </div>
                                <Link to={'/solicitudes-de-soporte'} className='btn-cancel relative'>Cancelar</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                actionOpenOrClose={() => {
                    setModalShow();
                }}
                title={`¿Estás seguro de eliminar la solicitud?`}
                size=""
                description="Al aceptar se eliminara la solicitud y no se podra recuperar."
            >
                <div className='flex justify-center gap-3'>
                    <button className="w-full" onClick={deleteRequest}>Aceptar</button>
                    <button className="w-full" onClick={modalHandler}>Cancelar</button>
                </div>
            </Modal>
        </div>
        
    )
}