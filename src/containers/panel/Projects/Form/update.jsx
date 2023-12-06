import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import Select from 'react-select';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link  } from 'react-router-dom';
import Modal from '@components/Modal';

export default function UpdateProject({ data, id, navigate }) {
    const [showModal, setShowModal] = useState(false);

    const schema = yup.object({
        name: yup.string().required('El campo nombre proyecto es requerido'),
        description: yup.string().required('El campo descripcion es requerido'),
        client: yup.string(),
    }).required()

    const modalHandler = () => {
        setShowModal(!showModal);
    };
    
    const {
        setValue,
        register, 
        handleSubmit, 
        formState: {errors}, 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data.dataProject.name,
            description: data.dataProject.description,
            clientId: data.clientOfProject ? data.clientOfProject.value : '',
        }
    });

    const onSubmit = async (values) => {
        console.log(values)
        await http.put(`api/projects/update/${id}`, values)
            .then((response) => {
                if(response) {
                    notify('Proyecto actualizado', 'success');
                    navigate('/proyectos');
                }else {
                    notify('Ocurrio un error al actualizar el proyecto', 'error');
                };
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

    return (
        <div>
            <div className="flex flex-cols-2 justify-between pr-32">
                <h1 className="title">Detalles - Editar proyecto</h1>
                <button onClick={() => { setShowModal(true) }} className='btn-delete'>Eliminar proyecto</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='pt-6'>
                    <div className="docker border-x border-y w-11/12">
                        <div className="pl-10 pr-10 pt-6 pb-4">
                            <div className='flex p-2'>
                                <img className='h-14 h-14' src={`${data.dataProject.avatar_url}`} />
                                <p className='text-xl p-2'>Tipo de proyecto: { data.dataProject.type_project } </p>
                            </div>
                            <div className='flex flex-cols-2 justify-between'>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Nombre proyecto*</h3>
                                    <input
                                        type="text"
                                        placeholder="Escribe el nombre de proyecto"
                                        className={`input-form ${errors?.name ? 'error': ''}`}
                                        { ...register('name') }
                                    />
                                    <Error error={errors?.name} />
                                </div>
                            </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Cliente*</h3>
                                    <Select
                                        isClearable={true}
                                        defaultInputValue={data?.clientOfProject?.label}
                                        options={data.clients}
                                        placeholder="Selecciona el cliente"
                                        className='w-full w-2/3 text-sm pt-2'
                                        onChange={(option) => {
                                            if(option != null) {
                                                setValue('clientId', option.value)
                                            } else{
                                                setValue('clientId')
                                            }
                                        }}
                                    />
                                    <Error error={errors?.client} />
                                </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Descripcion</h3>
                                    <textarea
                                        placeholder="Descripcion"
                                        className='input-form'
                                        { ...register('description') }
                                    />
                                    <Error error={errors?.description} />
                                </div>
                        </div>
                    </div>
                    <div className='flex justify-end pt-10 pr-40 pb-6'>
                        <div className='pr-4'>
                            <button type='submit' className='btn-primary'>Guardar</button>
                        </div>
                        <Link to={'/proyectos'} className='btn-cancel'>Cancelar</Link>
                    </div>
                </div>
            </form>
            <Modal
                isOpen={showModal}
                actionOpenOrClose={() => {
                    setModalShow();
                }}
                title={`¿Estás seguro de eliminar el proyecto?`}
                size=""
                description="Al aceptar se eliminara el proyecto y no se podra recuperar."
            >
                <div className='flex justify-center gap-3'>
                    <button className="w-full" onClick={deleteProject}>Aceptar</button>
                    <button className="w-full" onClick={modalHandler}>Cancelar</button>
                </div>
            </Modal>
        </div>
    )
}