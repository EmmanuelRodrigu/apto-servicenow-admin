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

    const clients = [
        {value: data.name_client, label: data.name_client},
    ]

    const schema = yup.object({
        name: yup.string().required('El campo nombre proyecto es requerido'),
        description: yup.string(),
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
            name: data.name,
            description: data.description,
            client: 1,
            typeProject: [1, 2],
        }
    });

    const onSubmit = async (values) => {
        console.log(values)
        http.put(`api/projects/update/${id}`, values)
            .then((response) => {
                if(response < 400) {
                    notify('Proyecto actualizado', 'success');
                    navigate('/proyectos');
                }else {
                    notify('Ocurrio un error al actualiza proyecto', 'error');
                };
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    const deleteProject = async () => {
        http.delete(`${id}`)
            .then((response) => {
                if(response) {
                    notify('Proyecto eliminado', 'success');
                    navigate('/proyectos');
                }else {
                    notify('Ocurrio un error al eliminar proyecto', 'error');
                };
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    return (
        
            <div className='pt-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="docker border-x border-y w-11/12">
                        <div className="pl-10 pr-10 pt-6 pb-4">
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
                                <div className='bg-black rounded-xl px-3 py-2'>
                                    <p className='text-violet-300 font-bold text-6xl pl-16 pt-3'>{data?.no_request_support}</p>
                                    <h2 className='text-white text-xl'>Solicitudes de soporte</h2>
                                </div>
                            </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Cliente*</h3>
                                    <Select
                                        defaultInputValue={data?.name_client}
                                        options={clients}
                                        placeholder="Selecciona el cliente"
                                        className='w-full w-2/3 text-sm pt-2'
                                        onChange={(option) => {
                                            setValue('client', option.value)
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
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Tipo de proyecto</h3>
                                    
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
    )

}