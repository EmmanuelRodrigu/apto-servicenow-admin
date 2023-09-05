import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Modal from '@components/Modal'

export default function NewClient() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let [numContact, setNumContact] = useState(1);
    let val = 0;
    const options = [
        {value: 'MASTER', label: 'Master'},
        {value: 'ADMIN', label: 'Admin'}
    ];

    const schema = yup.object({
        bussiness_name: yup.string().required('El campo nombre es requerido'),
        rfc: yup.string().required('El campo RFC es requerido'),
        reason_social: yup.string().required('El campo rason social es requerido'),
        address: yup.string().required('El campo direccion es requerido'),
        name: yup.string().required('El campo nombre es requerido'),
        last_name: yup.string().required('El campo apellido es requerido'),
        email: yup.string().email('El correo electronico debe ser un correo valido').required('El correo electronico es requerido'),
        phone: yup.string().required('El campo telefono es requerido'),
        area: yup.string(),
    }).required();

    const {
        register,
        handleSubmit,
        formState: {errors}, 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            bussiness_name: '',
            rfc: '',
            reason_social: '',
            address: '',
            name: '',
            last_name: '',
            email: '',
            phone: '',
            area: ''
        }
    });

    const onSubmit = async (values) => {
        setLoading(true);
        console.log(values)
        setShowModal(true)
    };

    const newContact = async (value) => {
        let neww = [];
        for(numContact; numContact <= value; numContact++) {
            neww.push({value: numContact});
            console.log(numContact)
        }
        setContact(neww);
        console.log(neww)
    };

    useEffect(() => {
        
    }, [])

    return (
        <div className="">
            <h1 className="title">Crear nuevo cliente</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-cols-2 justify-evenly pt-10'>
                    <div className='docker border-x border-y w-11/12 '>
                        <div className='pl-10 pr-10 pt-6 pb-4'>
                            <h2 className='subtitle pb-10 text-left'>Informacion de cliente</h2>
                            <div className='flex flex-cols-2 justify-start'>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Nombre*</h3>
                                    <input 
                                        type='text' 
                                        className={`input-form ${errors?.bussiness_name ? 'error' : ''}`}
                                        placeholder='Escribe el nombre' 
                                        { ...register('bussiness_name') }
                                    />
                                    <Error error={errors?.bussiness_name} />
                                </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>RFC*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe el RFC' 
                                        className={`input-form ${errors?.rfc ? 'error' : ''}`}
                                        { ...register('rfc') }
                                    />
                                    <Error error={errors?.rfc} />
                                </div>
                            </div>
                            <div className='flex flex-cols-2 justify-start'>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Razon social*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe la razon social'
                                        className={`input-form ${errors?.reason_social ? 'error' : ''}`}
                                        { ...register('reason_social') }
                                    />
                                    <Error error={errors?.reason_social} />
                                </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Dirección*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe la dirección'
                                        className={`input-form ${errors?.address ? 'error' : ''}`}
                                        { ...register('address') }
                                    />
                                    <Error error={errors?.address} />
                                </div>
                            </div>
                        </div>
                        <div className='pl-10 pr-10 pt-4 pb-4'>
                            <div className='flex pb-5'>
                                <h2 className='subtitle text-left'>Informacion de contacto</h2>
                                <FaPlus className='border-x border-y' onClick={() => {
                                    val = val + 1;
                                    setNumContact(val - 1)
                                    newContact(val);
                                }}/>
                            </div>
                        {
                            contact?.map((v, i) => (
                                <div key={`index-${i}`}>
                                    <div className='flex flex-cols-2'>
                                        <div className='pr-4'>
                                            <h3 className='text-input pb-2'>{`Contacto ${i + 1}`}</h3>
                                        </div>
                                        <div className='pt-2'>
                                            <FaMinus onClick={() => {
                                                
                                            }}/>
                                        </div>
                                    </div>
                                    <div className='flex flex-cols-2 justify-start'>
                                        <div className='pb-10 w-2/4'>
                                            <h3 className='text-input'>Nombre*</h3>
                                            <input 
                                                type='text' 
                                                placeholder='Escribe el nombre' 
                                                className={`input-form ${errors?.name ? 'error' : ''}`}
                                                { ...register('name') }
                                            />
                                            <Error error={errors?.name} />
                                        </div>
                                        <div className='pb-10 w-2/4'>
                                            <h3 className='text-input'>Apellido*</h3>
                                            <input 
                                                placeholder='Escribe el apellido'
                                                className={`input-form ${errors?.last_name ? 'error' : ''}`}
                                                { ...register('last_name') }
                                            />
                                            <Error error={errors?.last_name} />
                                        </div>
                                    </div>
                                    <div className='flex flex-cols-2 justify-start'>
                                        <div className='pb-10 w-2/4'>
                                            <h3 className='text-input'>Correo electronico*</h3>
                                            <input
                                                placeholder='Escribe el correo electronico'
                                                className={`input-form ${errors?.email ? 'error' : ''}`}
                                                { ...register('email') }
                                            />
                                            <Error error={errors?.email} />
                                        </div>
                                        <div className='pb-10 w-2/4'>
                                            <h3 className='text-input'>Telefono*</h3>
                                            <input
                                                placeholder='Escribe el telefono'
                                                className={`input-form ${errors?.phone ? 'error' : ''}`}
                                                { ...register('phone') }
                                            />
                                            <Error error={errors?.phone} />
                                        </div>
                                    </div>
                                        <div className='pb-10 w-2/4'>
                                            <h3 className='text-input'>Area</h3>
                                            <input
                                                placeholder='Escribe el Area de trabajo'
                                                className={`input-form ${errors?.area ? 'error' : ''}`}
                                                { ...register('area') }
                                            />
                                            <Error error={errors?.area} />
                                        </div>
                                </div>
                                )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-10 pr-40 pb-6'>
                    <div className='pr-4'>
                        <button type='submit' className='btn-primary'>Crear cliente</button>
                    </div>
                    <Link to={'/clients'} className='btn-cancel'>Cancelar</Link>
                </div>
            </form>
        {
        showModal && (
            <Modal 
                isOpen={showModal}
                title={`Elige el contacto principal`}
                size=""
                description=""
            />
        )
        }
        </div>
        
    )
}