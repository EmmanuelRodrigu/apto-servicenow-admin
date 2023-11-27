import React, { useEffect, useState } from 'react';
import { useStore } from "@store";
import * as yup from 'yup';
import Error from '@components/Error';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { http } from '@providers/http';
import notify from "@utils/notify";

export default function ChangePassword({ data, id, navigate }) {

    const schema = yup.object({
        email: yup.string().required('El campo email es requerido'),
        password: yup.string().required('El campo password es requerido'),
        confirmPassword: yup.string().required('Confirmar contraseña es requerido'),
    });

    const {
        setValue,
        clearErrors,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: data.email,
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (values) => {
        http.put(`api/clients/change-password`, values)
            .then((response) => {
                if(response.status) {
                    notify(response.message, 'success');
                    navigate('/clientes');
                } else {
                    notify(response.message, 'error');
                }
            })
            .catch((error) => {
                notify(error, 'error')
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='docker border-x border-y w-11/12 p-4 space-y-10'>
                    <div className='flex flex-cols-2 justify-evenly'>
                        <div className='p-2 pb-4'>
                            <label className='text-input'>Correo electronico</label>
                            <input
                                disabled={true}
                                type='email'
                                className={`input-form ${errors?.email ? 'error' : ''}`}
                                value={data.email}
                                { ...register('email') }
                            />
                            <Error error={errors?.email} />
                        </div>
                        <div className='p-2'>
                            <label className='text-input'>Telefono</label>
                            <input
                                disabled={true}
                                type='tel'
                                className={`input-form`}
                                value={data.phone}
                            />
                        </div>
                    </div>
                        <div className='text-center'>
                            <h2 className='subtitle'>Nueva contraseña</h2>
                        </div>
                    <div className='flex justify-evenly space-y-10'>
                        <div className='flex justify-start py-4 space-x-4'>
                            <div className='flex flex-cols-2'>
                                <div className='pt-2 pr-2'>
                                    <label className='text-input'>Contraseña:</label>
                                </div>
                                <div>
                                    <input 
                                        type={''}
                                        className={`input-form ${errors?.password ? 'error' : ''}`}
                                        { ...register('password') }
                                    />
                                    <Error error={errors?.password} />
                                </div>
                            </div>
                            <div className='flex flex-cols-2'>
                                <div className='pt-2 pr-2'>
                                    <label className='text-input'>Confirmar contraseña:</label>
                                </div>
                                <div>
                                    <input 
                                        type={''}
                                        className={`input-form ${errors?.confirmPassword ? 'error' : ''}`}
                                        { ...register('confirmPassword') }
                                    />
                                    <Error error={errors?.confirmPassword} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-10 pr-40 pb-6'>
                    <div className='pr-4'>
                        <button type='submit' className='btn-primary'>Guardar</button>
                    </div>
                    <Link to={'/clientes'} className='btn-cancel'>Cancelar</Link>
                </div>
            </form>
        </div>
    )
}