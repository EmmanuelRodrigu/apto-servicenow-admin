import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import * as yup from 'yup';
import Error from '@components/Error'
import { Link } from "react-router-dom";
import notify from "@utils/notify";
import { http } from '@providers/http';
import { useNavigate, useParams } from 'react-router-dom';

export default function Support() {
    const [options, setOptions] = useState([{ value: '1231ASD', label: 'JCorona' }, { value: '1231ADDGA', label: 'EmmanuelRodriguez' }]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { clientId } = useParams()

    const schema = yup.object({
        title: yup.string().required('El campo titulo de requerido'),
        description: yup.string().required('El campo descripcion es requerido'),
        file: yup.mixed(),
        assign_to: yup.string().required('Se debe seleccionar una opcion'),
    }).required();

    const {
        setValue,
        register,
        clearErrors,
        handleSubmit,
        formState: { errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            file: undefined,
            assign_to: ''
        },
    });

    const onSubmit = async (values) => {
        setLoading(true);
        await http.post(`api/requests/create/${clientId}`, values)
            .then((response) => {
                if(response.status < 400) {
                    notify('Error al crear solicitud', 'error')
                } else {
                    notify('Solicitud creada exitosamente', 'success');
                    navigate(`/${clientId}/home`)
                }
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    return (
        <div className="p-20">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pl-40 pr-40 pb-10 rounded-3xl shadow-xl shadow-gray-400 section-form">
                    <h1 className="text-2xl pt-10 pb-10">Soporte Tecnico</h1>
                    <div className="pt-2 grid">
                        <label className="text-lg">Titulo*</label>
                        <div className="shadow-sm shadow-violet-400 rounded-lg">
                            <input
                                type="text"
                                className={`input-form ${errors.title ? 'error' : ''}`}
                                { ...register('title') }
                            />
                        </div>
                        <Error error={errors?.title} />
                    </div>
                    <div className="pt-2 grid">
                        <label className="text-lg">Descripcion*</label>
                        <div className="shadow-sm shadow-violet-400 rounded-lg">
                            <textarea
                                className={`input-form ${errors.description ? 'error' : ''}`}
                                rows={8}
                                { ...register('description') }
                            />
                        </div>
                        <Error error={errors?.description} />
                    </div>
                    <div className="col-span-full pt-2">
                        <label htmlFor="cover-photo" className="text-lg">Cargar archivo</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Cargar archivo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                    </label>
                                    <p className="pl-1">o arrastra y suelta aqui tu contenido</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG y JPG</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <label className="text-lg">Asignar a</label>
                        <Select
                            placeholder="Selecciona una opcion"
                            className="block w-1/2 select"
                            options={options}
                            isClearable={true}
                            styles={{ 
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: 'inherit',
                                })
                            }}
                            onChange={(option) => {
                                if(option !== null) {
                                    setValue('assign_to', option.value)
                                    clearErrors('assign_to')
                                }else {
                                    setValue('assign_to', '')
                                }
                            }}
                        />
                        <Error error={errors?.assign_to} />
                    </div>
                    <div className="flex pt-10">
                        <div className="pr-4">
                            <button type="submit" className="btn-primary">Crear</button>
                        </div>
                        <Link to={`/${clientId}/home`} className="btn-cancel">Regresar</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
