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
import Modal from '@components/Modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function CreateAccount({ data, id, navigate }) {
    const [eye, setEye] = useState(false);

    const schema = yup.object({
        email: yup.string().required('El campo email es requerido'),
        password: yup.string().required('El campo password es requerido'),
        phone: yup.string().required('El campo telefono es requerido'),
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
            email: '',
            password: 'Clienteapto1234',
            phone: '',
        }
    });

    const onSubmit = async (values) => {
        http.post(`api/clients/create-account/${id}`, values)
            .then((response) => {
                if(response.message) {
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
                <div className='docker border-x border-y w-full p-4 space-y-10'>
                    <div className='flex flex-cols-3 justify-evenly'>
                        <div className='p-2 pb-4'>
                            <label className='text-input'>Correo electronico</label>
                            <input
                                type='email'
                                className={`input-form ${errors?.email ? 'error' : ''}`}
                                value={data.email}
                                { ...register('email') }
                            />
                            <Error error={errors?.email} />
                        </div>
                        <div className='p-2'>
                            <label className='text-input'>Contraseña</label>
                            <div className='flex'>
                                <input
                                    style={{ border: 'none' }}
                                    value={'Clienteapto1234'}
                                    type={`${ eye ? 'text' : 'password'}`}
                                    className={`input-form ${errors?.password ? 'error' : ''}`}
                                    { ...register('password') }
                                >
                                </input>
                                <div className='pt-4'>
                                {
                                    eye ? (
                                        <FaEye onClick={() => { setEye(!eye) }}/>
                                    ) : (
                                        <FaEyeSlash onClick={() => { setEye(!eye) }}/>
                                    )
                                }
                                </div>
                                <Error error={errors?.password} />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-input'>Telefono</label>
                            <input
                                type='tel'
                                className={`input-form ${errors?.phone ? 'error' : ''}`}
                                value={data.phone}
                                { ...register('phone') }
                            />
                            <Error error={errors?.phone} />
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