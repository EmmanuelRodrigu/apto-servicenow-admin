import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import Select from 'react-select';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";

export default function UpdateUser({ data, id, navigate }) {
    const [loading, setLoading] = useState(false);

    const options = [
        {value: 1, label: 'Master'},
        {value: 2, label: 'Admin'}
    ];

    const schema = yup.object({
        name: yup.string().required('El nombre de usuario es requerido'),
        first_last_name: yup.string().required('El primer apellido de usuario es requerido'),
        second_last_name: yup.string().required('El segundo apellido de usuario es requerido'),
        email: yup.string().email('Debe ser un correo electronico valido').required('El correo electronico es requerido'),
        password: yup.string().required('La contraseña es requerida'),
        rol: yup.number().required('El rol es requerido'),
    }).required();

    const {
        setValue,
        register, 
        handleSubmit,
        clearErrors,
        formState: {errors}, 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data.dataUser.name,
            first_last_name: data.dataUser.first_last_name,
            second_last_name: data.dataUser.second_last_name,
            email: data.profileUser.email,
            password: '',
            rol: data.rol.value,
        }
    });
    
    const onSubmit = async (values) => {
        setLoading(true);
        await http.put(`api/users/update/${id}`, values)
            .then((response) => {
                if(response){
                    notify('Usuario actualizado', 'success');
                    navigate('/usuarios');
                } else {
                    notify('Error al crear usuario', 'error');
                };
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    return (
        <div>
            <h1 className="title">Detalles / Editar usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-cols-2 justify-evenly pt-10'>
                    <div className='docker border-x border-y w-10/12'>
                        <div className='pl-10 pr-10 pt-4 pb-4'>
                            <h2 className='subtitle pb-10 text-left'>Informacion personal</h2>
                            <div className='pb-10'>
                                <h3 className='text-input'>Nombre del usuario*</h3>
                                <input 
                                    defaultValue={data.dataUser.name}
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
                                    defaultValue={data.dataUser.first_last_name}
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
                                    defaultValue={data.dataUser.second_last_name}
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
                                    defaultValue={data.profileUser.email} 
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
                                    className='input-form'
                                    { ...register('password') }
                                />
                                <Error error={errors?.password} />
                            </div>
                            <div className='pb-10'>
                                <h3 className='text-input'>Rol del usuario*</h3>
                                <Select
                                    isClearable={true}
                                    defaultInputValue={data.rol.label}
                                    placeholder='Selecciona una opcion'
                                    options={options}
                                    onChange={(option) => {
                                        if(option != null) {
                                            setValue('rol', option.value);
                                            clearErrors('rol')
                                        } else {
                                            setValue('rol')
                                        }
                                    }}
                                />
                                <Error error={errors?.rol} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-10 pr-40 pb-6'>
                    <div className='pr-4'>
                        <button type='submit' className='btn-primary'>Guardar</button>
                    </div>
                    <Link to={'/usuarios'} className='btn-cancel'>Cancelar</Link>
                </div>
            </form>
        </div>
    )
}