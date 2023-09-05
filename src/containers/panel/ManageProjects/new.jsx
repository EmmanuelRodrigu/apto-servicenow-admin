import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import Select from 'react-select';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

export default function ManageProjects() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const options = [
        {value: 'CMS', label: 'Administrador'},
        {value: 'APP', label: 'App movil'},
        {value: 'LP', label: 'Landing page'},
        {value: 'AW', label: 'App web'},
    ];

    const schema = yup.object({
        name: yup.string().required('El nombre de proyecto es requerido'),
        description: yup.string().required('La descripcion es requerida'),
        typeProject: yup.array().min(1, 'Se requiere al menos 1 tipo de proyecto'),
    }).required();

    const {
        setValue,
        register, 
        handleSubmit, 
        formState: {errors}, 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            typeProject: [],
        }
    });

    const onSubmit = async (values) => {
        const type = projects.map((project) => { return [project.value] })
        const data = {
            name: values.name,
            description: values.description,
            typeProject: type,
        }
        setLoading(true);
        await http.post('api/projects/create', data)
            .then((response) => {
                if(response.status){
                    notify(response.message, 'error');
                } else {
                    notify('Proyecto creado exitosamente', 'success')
                    navigate('/proyectos');
                }
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    useEffect(() => {
        
    }, [])

    return (
        <div className="">
            <h1 className="title">Crear nuevo proyecto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-cols-2 justify-evenly pt-10'>
                    <div className='docker border-x border-y w-10/12 '>
                        <div className='pl-10 pr-10 pt-6 pb-4'>
                            <h2 className='subtitle pb-10 text-left'>Informacion del proyecto</h2>
                            <div className='pb-10'>
                                <h3 className='text-input'>Nombre del proyecto*</h3>
                                <input 
                                    type='text' 
                                    placeholder='Escribe el nombre del proyecto' 
                                    className={`input-form`}
                                    { ...register('name') }
                                />
                                <Error error={errors?.name} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Descripcion*</h3>
                                <textarea 
                                    placeholder='Escribe una descripcion' 
                                    className='input-form'
                                    { ...register('description') }
                                />
                                <Error error={errors?.description} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Tipo de proyecto*</h3>
                                <Select
                                    isMulti={true}
                                    placeholder='Tipo de proyecto'
                                    options={options} 
                                    className='w-5/12'
                                    onChange={(option) => {
                                        setValue('typeProject', option)
                                        setProjects(option)
                                    }}
                                />
                                <Error error={errors?.typeProject} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-10 pr-40 pb-6'>
                    <div className='pr-4'>
                        <button type='submit' className='btn-primary'>Crear proyecto</button>
                    </div>
                    <Link to={'/usuarios'} className='btn-cancel'>Cancelar</Link>
                </div>
            </form>
        </div>
    )
}