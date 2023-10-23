import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import Select from 'react-select';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link  } from 'react-router-dom';

export default function UpdateProject({ data, id, navigate }) {

    const schema = yup.object({
        name: yup.string().required('El campo nombre proyecto es requerido'),
        description: yup.string().required('El campo descripcion es requerido'),
        client: yup.string().required('El campo cliente es requerido'),
        type_project: yup.array().required().min(1, 'El campo tipo de proyecto debe contener al menos 1 elemento')
    }).required()

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
            client: data.clientOfProject ? data.clientOfProject.value : '',
            typeProject: data.dataProject.type_project,
        }
    });

    const onSubmit = async (values) => {
        http.put(`api/projects/update/${id}`, values)
            .then((response) => {
                if(response < 400) {
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

    return (
        <div>
            <div className='pt-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                            defaultInputValue={data.clientOfProject.label}
                                            options={data.clients}
                                            placeholder="Selecciona el cliente"
                                            className='w-full w-2/3 text-sm pt-2'
                                            onChange={(option) => {
                                                if(option != null) {
                                                    setValue('client', option.value)
                                                } else{
                                                    setValue('client')
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
                </form>
            </div>
        </div>
    )
}