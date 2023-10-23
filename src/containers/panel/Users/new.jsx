import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import Select from 'react-select';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

export default function NewUser() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const options = [
        {value: 'MASTER', label: 'Master'},
        {value: 'ADMIN', label: 'Admin'},
        {value: 'CLIENT', label: 'Cliente'},
    ];

    const schema = yup.object({
        name: yup.string().required('El nombre de usuario es requerido'),
        first_last_name: yup.string().required('El primer apellido de usuario es requerido'),
        second_last_name: yup.string().required('El segundo apellido de usuario es requerido'),
        email: yup.string().email('Debe ser un correo electronico valido').required('El correo electronico es requerido'),
        password: yup.string().required('La contraseña es requerida'),
        rol: yup.string().required('El rol es requerido'),
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
            first_last_name: '',
            second_last_name: '',
            email: '',
            password: 'Apto1234',
            rol: '',
        }
    });

    const onSubmit = async (values) => {
        setLoading(true);
        await http.post('api/users/create', values)
            .then((response) => {
                if(response.status){
                    notify(response.message, 'error');
                } else {
                    notify('Usuario creado exitosamente', 'success')
                    navigate('/usuarios');
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
            <h1 className="title">Crear nuevo usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-cols-2 justify-evenly pt-10'>
                    <div className='docker border-x border-y w-10/12 '>
                        <div className='pl-10 pr-10 pt-6 pb-4'>
                            <h2 className='subtitle pb-10 text-left'>Informacion personal</h2>
                            <div className='pb-10'>
                                <h3 className='text-input'>Nombre del usuario*</h3>
                                <input 
                                    type='text' 
                                    placeholder='Escribe el nombre' 
                                    className={`input-form`}
                                    { ...register('name') }
                                />
                                <Error error={errors?.name} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Primer apellido del usuario*</h3>
                                <input 
                                    type='text' 
                                    placeholder='Escribe el apellido' 
                                    className='input-form'
                                    { ...register('first_last_name') }
                                />
                                <Error error={errors?.first_last_name} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Segundo apellido del usuario*</h3>
                                <input 
                                    type='text' 
                                    placeholder='Escribe el apellido' 
                                    className='input-form'
                                    { ...register('second_last_name') }
                                />
                                <Error error={errors?.second_last_name} />
                            </div>
                        </div>
                        <div className='pl-10 pr-10 pt-4 pb-4'>
                            <h2 className='subtitle text-left pb-10'>Perfil</h2>
                            <div className='pb-10'>
                                <h3 className='text-input'>Correo electronico*</h3>
                                <input 
                                    type='text' 
                                    placeholder='email@email.com' 
                                    className='input-form'
                                    { ...register('email') }
                                />
                                <Error error={errors?.email} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Contraseña*</h3>
                                <input 
                                    placeholder='Apto1234'
                                    className='input-form'
                                    { ...register('password') }
                                />
                                <Error error={errors?.password} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Rol del usuario*</h3>
                                <Select 
                                    placeholder='Selecciona una opcion'
                                    options={options} 
                                    className='w-3/12'
                                    onChange={(option) => {
                                        setValue('rol', option.value);
                                    }}
                                />
                                <Error error={errors?.rol} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-10 pr-40 pb-6'>
                    <div className='pr-4'>
                        <button type='submit' className='btn-primary'>Crear usuario</button>
                    </div>
                    <Link to={'/usuarios'} className='btn-cancel'>Cancelar</Link>
                </div>
            </form>
        </div>
    )
}