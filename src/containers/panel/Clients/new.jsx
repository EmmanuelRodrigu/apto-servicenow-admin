import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { http } from '@providers/http';
import * as yup from 'yup';
import Error from '@components/Error';
import notify from "@utils/notify";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@components/Modal';
import Select from 'react-select'; 

export default function NewClient() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [validSecondContact, setValidSecondContact] = useState(false);
    const options = [
        {value: 'fisica', label: 'Fisica'},
        {value: 'moral', label: 'Moral'},
    ]

    const schema = yup.object({
        person: yup.string(),
        rfc: yup.string().required('El campo RFC es requerido'),
        bussiness_name: yup.string().required('El campo nombre es requerido'),
        reason_social: yup.string().required('El campo rason social es requerido'),
        street: yup.string().required('El campo direccion es requerido'),
        cp: yup.string().required('El campo codigo postal es requerido'),
        municipality: yup.string().required('El campo municipio es requerido'),
        estate: yup.string().required('El campo estado es requerido'),
        name_contact: yup.string().required('El campo nombre es requerido'),
        last_name_contact: yup.string().required('El campo apellido es requerido'),
        email_contact: yup.string().email('El correo electronico debe ser un correo valido').required('El correo electronico es requerido'),
        phone_contact: yup.string().required('El campo telefono es requerido'),
        area_contact: yup.string(),
        name_scontact: validSecondContact ? yup.string().required('El campo nombre es requerido') : yup.string(),
        last_name_scontact: validSecondContact ? yup.string().required('El campo apellido es requerido') : yup.string(),
        email_scontact: validSecondContact ? yup.string().required('El campo correo es requerido') : yup.string(),
        phone_scontact: validSecondContact ? yup.string().required('El campo telefono es requerido') : yup.string(),
        area_scontact: yup.string(),
    }).required();

    const {
        setValue,
        register,
        handleSubmit,
        formState: {errors}, 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            person: '',
            rfc: '',
            bussiness_name: '',
            reason_social: '',
            street: '',
            cp: '',
            municipality: '',
            estate: '',
            name_contact: '',
            last_name_contact: '',
            email_contact: '',
            phone_contact: '',
            area_contact: '',
            name_scontact: '',
            last_name_scontact: '',
            email_scontact: '',
            phone_scontact: '',
            area_scontact: '',
        }
    });

    const onSubmit = async (values) => {
        const send = {
            person: values.person,
            rfc: values.rfc,
            bussiness_name: values.bussiness_name,
            reason_social: values.reason_social,
            street: values.street,
            cp: values.cp,
            municipality: values.municipality,
            estate: values.estate,
            name_contact: values.name_contact,
            last_name_contact: values.last_name_contact,
            email_contact: values.email_contact,
            phone_contact: values.phone_contact,
            area_contact: values.area_contact,
            secondary_contact: {
                name_scontact: values.name_scontact,
                last_name_scontact: values.last_name_scontact,
                email_scontact: values.email_scontact,
                phone_scontact: values.phone_scontact,
                area_scontact: values.area_scontact,
            }
        }
        setLoading(true);
        await http.post('api/clients/create', send)
            .then((response) => {
                if(response.status > 400) {
                    notify(response.message, 'error');
                    setLoading(false);
                } else {
                    notify('Cliente creado exitosamente', 'success');
                    navigate('/clientes')
                }
            })
            .catch((error) => {
                notify(error, 'error');
                setLoading(false);
            });
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
                            <div className='flex flex-cols-3 justify-start'>
                                <div className='pb-10 w-1/5'>
                                    <h3 className='text-input'>Persona</h3>
                                    <Select 
                                        options={options}
                                        className={`w-max w-4/5 text-sm pt-2`}
                                        placeholder="persona"
                                        onChange={(option) => {
                                            setValue('person', option.value)
                                        }}
                                    />
                                    <Error error={errors?.person} />
                                </div>
                                <div className='pb-10 w-2/5'>
                                    <h3 className='text-input'>RFC*</h3>
                                    <input
                                        type='text' 
                                        placeholder='Escribe el RFC' 
                                        className={`input-form ${errors?.rfc ? 'error' : ''}`}
                                        { ...register('rfc') }
                                    />
                                    <Error error={errors?.rfc} />
                                </div>
                                <div className='pb-10 w-2/5'>
                                    <h3 className='text-input'>Nombre*</h3>
                                    <input 
                                        type='text' 
                                        className={`input-form w-full ${errors?.bussiness_name ? 'error' : ''}`}
                                        placeholder='Escribe el nombre' 
                                        { ...register('bussiness_name') }
                                    />
                                    <Error error={errors?.bussiness_name} />
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
                            </div>
                            <div className='flex flex-cols-2 justify-start'>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Domicilio*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe la dirección'
                                        className={`input-form ${errors?.street ? 'error' : ''}`}
                                        { ...register('street') }
                                    />
                                    <Error error={errors?.street} />
                                </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Código postal*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe el código postal'
                                        className={`input-form ${errors?.cp ? 'error' : ''}`}
                                        { ...register('cp') }
                                    />
                                    <Error error={errors?.cp} />
                                </div>
                            </div>
                            <div className='flex flex-cols-2 justify-start'>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Municipio*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe el municipio'
                                        className={`input-form ${errors?.municipality ? 'error' : ''}`}
                                        { ...register('municipality') }
                                    />
                                    <Error error={errors?.municipality} />
                                </div>
                                <div className='pb-10 w-2/4'>
                                    <h3 className='text-input'>Estado*</h3>
                                    <input 
                                        type='text' 
                                        placeholder='Escribe el estado'
                                        className={`input-form ${errors?.estate ? 'error' : ''}`}
                                        { ...register('estate') }
                                    />
                                    <Error error={errors?.estate} />
                                </div>

                            </div>
                        </div>
                        <div className='pl-10 pr-10 pt-4 pb-4'>
                            <div className='flex pb-5'>
                                <h2 className='subtitle text-left'>Informacion de contacto principal</h2>
                            </div>
                            <div>
                                <div className='flex flex-cols-2 justify-start'>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Nombre*</h3>
                                        <input 
                                            type='text' 
                                            placeholder='Escribe el nombre' 
                                            className={`input-form ${errors?.name_contact ? 'error' : ''}`}
                                            { ...register('name_contact') }
                                        />
                                        <Error error={errors?.name_contact} />
                                    </div>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Apellido*</h3>
                                        <input 
                                            placeholder='Escribe el apellido'
                                            className={`input-form ${errors?.last_name_contact ? 'error' : ''}`}
                                            { ...register('last_name_contact') }
                                        />
                                        <Error error={errors?.last_name_contact} />
                                    </div>
                                </div>
                                <div className='flex flex-cols-2 justify-start'>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Correo electronico*</h3>
                                        <input
                                            placeholder='Escribe el correo electronico'
                                            className={`input-form ${errors?.email_contact ? 'error' : ''}`}
                                            { ...register('email_contact') }
                                        />
                                        <Error error={errors?.email_contact} />
                                    </div>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Telefono*</h3>
                                        <input
                                            placeholder='Escribe el telefono'
                                            className={`input-form ${errors?.phone_contact ? 'error' : ''}`}
                                            { ...register('phone_contact') }
                                        />
                                        <Error error={errors?.phone_contact} />
                                    </div>
                                </div>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Area</h3>
                                        <input
                                            placeholder='Escribe el Area de trabajo'
                                            className={`input-form ${errors?.area_contact ? 'error' : ''}`}
                                            { ...register('area_contact') }
                                        />
                                        <Error error={errors?.area_contact} />
                                    </div>
                            </div>
                        </div>
                        <div className='pl-10 pr-10 pt-4 pb-4'>
                            <div className='flex pb-5'>
                                <h2 className='subtitle text-left'>Informacion de contacto secundario</h2>
                            </div>
                            <div>
                                <div className='flex flex-cols-2 justify-start'>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Nombre*</h3>
                                        <input 
                                            type='text' 
                                            placeholder='Escribe el nombre' 
                                            className={`input-form ${errors?.name_scontact ? 'error' : ''}`}
                                            { ...register('name_scontact') }
                                            onChange={(type) => {
                                                const text = type.nativeEvent.data
                                                text === null ? setValidSecondContact(false): setValidSecondContact(true);
                                            }}
                                        />
                                        <Error error={errors?.name_scontact} />
                                    </div>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Apellido*</h3>
                                        <input 
                                            placeholder='Escribe el apellido'
                                            className={`input-form ${errors?.last_name_scontact ? 'error' : ''}`}
                                            { ...register('last_name_scontact') }
                                            onChange={(type) => {
                                                const text = type.nativeEvent.data
                                                text === null ? setValidSecondContact(false): setValidSecondContact(true);
                                            }}
                                        />
                                        <Error error={errors?.last_name_scontact} />
                                    </div>
                                </div>
                                <div className='flex flex-cols-2 justify-start'>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Correo electronico*</h3>
                                        <input
                                            placeholder='Escribe el correo electronico'
                                            className={`input-form ${errors?.email_scontact ? 'error' : ''}`}
                                            { ...register('email_scontact') }
                                            onChange={(type) => {
                                                const text = type.nativeEvent.data
                                                text === null ? setValidSecondContact(false): setValidSecondContact(true);
                                            }}
                                        />
                                        <Error error={errors?.email_scontact} />
                                    </div>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Telefono*</h3>
                                        <input
                                            placeholder='Escribe el telefono'
                                            className={`input-form ${errors?.phone_scontact ? 'error' : ''}`}
                                            { ...register('phone_scontact') }
                                            onChange={(type) => {
                                                const text = type.nativeEvent.data
                                                text === null ? setValidSecondContact(false): setValidSecondContact(true);
                                            }}
                                        />
                                        <Error error={errors?.phone_scontact} />
                                    </div>
                                </div>
                                    <div className='pb-10 w-2/4'>
                                        <h3 className='text-input'>Area</h3>
                                        <input
                                            placeholder='Escribe el Area de trabajo'
                                            className={`input-form ${errors?.area_scontact ? 'error' : ''}`}
                                            { ...register('area_scontact') }
                                            onChange={(type) => {
                                                const text = type.nativeEvent.data
                                                text === null ? setValidSecondContact(false): setValidSecondContact(true);
                                            }}
                                        />
                                        <Error error={errors?.area_scontact} />
                                    </div>
                            </div>
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
        </div>
        
    )
}