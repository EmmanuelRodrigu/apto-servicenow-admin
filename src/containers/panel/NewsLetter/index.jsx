import React, { useEffect, useState, useRef } from "react";
import { useForm, useWatch, Controller, set } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Error from '@components/Error';
import { http } from '@providers/http';
import notify from '@utils/notify';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import imgLoading from "@assets/loading.gif";
import Modal from '@components/Modal';

export default function NewsLetter() {
    const inputFileRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [status, setStatus] = useState(null);
    const allowedFiles = ['.png', '.jpg', '.jpeg', '.pdf', '.xls', '.xlsx', '.doc', '.docx'];
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const [showModal, setShowModal] = useState(false);
    const [deleteNew, setDeleteNew] = useState(null);

    const schema = yup.object({
        files: yup.mixed().required('Debe adjuntar almenos 1 archivo'),
        title: yup.string().required('El campo titulo es requerido'),
        description: yup.string(),
    }).required();

    const {
        register,
        setValue,
        handleSubmit,
        control,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            files: [],
            title: '',
            description: '',
        },
    });

    const files = useWatch({
        control,
        name: 'files',
    });

    const modalHandler = () => {
        setShowModal(!showModal);
    };

    const isFileAllowed = (fileName) => {
        let isFileAllowed = false;
        const regex = /(?:\.([^.]+))?$/;
        const extension = regex.exec(fileName);
        if (extension !== undefined && extension !== null) {
          for (const ext of allowedFiles) {
            if (ext === extension[0]) {
              isFileAllowed = true;
            }
          }
        }
        return isFileAllowed;
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
    };
    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };
    const handleDrop = (event) => {
        event.preventDefault();
        let filesInDrop = [...event.dataTransfer.files];
        let filesAccept = [];
        filesInDrop.forEach((element) => {
          if (isFileAllowed(element.name) == true) {
            filesAccept.push(element);
          }
        });
        setValue('files', [...files, ...filesAccept]);
        clearErrors('files');
    };

    function niceBytes(x) {
        let l = 0,
          n = parseInt(x, 10) || 0;
    
        while (n >= 1024 && ++l) {
          n = n / 1024;
        }
    
        return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const dataFormFile = new FormData();
        if(data.files[0]) {
            dataFormFile.append('file', data.files[0])
        }
        dataFormFile.append('title', data.title)
        dataFormFile.append('description', data.description)
        http.postFile(`api/newsletter/create`, dataFormFile)
            .then((response) => {
                if(response.status) {
                    notify(response.message, 'success');
                    getData();
                } else {
                    notify('error al crear noticia', 'error');
                };
            })
            .catch((error) => {
                notify(error, 'error')
            });
        setLoading(false);
    };

    const getData = async () => {
        http.get(`api/newsletter`)
            .then((response) => {
                setList(response);
            })
            .catch((error) => {
                notify(error, 'error');
            })
    };

    const changeStatus = async (id) => {
        http.put(`api/newsletter/change-status/${id}`)
            .then((response) => {
                if(response.status) {
                    notify(response.message, 'success');
                    getData();
                } else {
                    notify('Error al cambiar estatus', 'error')
                }
            })
            .catch((error) => {
                notify(error, 'error');
            })
    };

    const deleteNews = async () => {
        http.delete(`api/newsletter/${deleteNew}/delete`)
            .then((response) => {
                if(response.status) {
                    notify(response.message, 'success');
                    getData();
                    modalHandler();
                } else {
                    notify('Error al eliminar noticia', 'error');
                };
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="p-6 space-y-4">
            <h1 className="title">NewsLetter</h1>
            <div 
                className="content-uploads cursor-pointer align-items-center flex justify-center"
                onDragOver={(event) => handleDragOver(event)}
                onDragEnter={(event) => handleDragEnter(event)}
                onDrop={(event) => handleDrop(event)}
                onClick={() => {
                  inputFileRef.current.click();
                }}
            >
                <p className="pt-16 text-lg">Agregar archivos</p>
            </div>
            {files.map((item, index) => (
                <div
                    className="form-titles mb-2 fs-14"
                    key={`doc-${item.name}-${index}`}
                    >
                    {item.name} - {niceBytes(item.size)}{' '}
                    <Button
                        variant="outline-danger"
                        className="me-3"
                        size="sm"
                        onClick={() => {
                        const list = files;
                        delete list[index];
                        setValue('files', list.filter(Boolean));
                        }}
                    >
                        <svg
                            width="14"
                            height="18"
                            viewBox="0 0 14 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V6C13 4.9 12.1 4 11 4H3C1.9 4 1 4.9 1 6V16ZM13 1H10.5L9.79 0.29C9.61 0.11 9.35 0 9.09 0H4.91C4.65 0 4.39 0.11 4.21 0.29L3.5 1H1C0.45 1 0 1.45 0 2C0 2.55 0.45 3 1 3H13C13.55 3 14 2.55 14 2C14 1.45 13.55 1 13 1Z"
                                fill="#000000"
                            />
                        </svg>
                    </Button>
                </div>
            ))}
            <Controller
                name="files"
                control={control}
                render={() => (
                    <input
                        name="files"
                        multiple
                        type="file"
                        accept={allowedFiles.join()}
                        className="d-none"
                        ref={inputFileRef}
                        onChange={(evt) => {
                            const f = evt.target.files;
                            setValue('files', [...files, ...f]);
                            clearErrors('files');
                        }}
                    />
                )}
            />
            <Error error={errors?.files}></Error>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-cols-2 justify-between">
                    <div className="w-1/2 p-1">
                        <label>Titulo*</label>
                        <input
                            type="text"
                            className={`input-form ${errors.title ? 'error' : ''}`}
                            { ...register('title') } 
                        />
                        <Error error={errors?.title} />
                    </div>
                    <div className="w-1/2 p-1">
                        <label>Descripcion</label>
                        <input 
                            type="text"
                            className={`input-form ${errors.description ? 'error' : ''}`}
                            { ...register('description') } 
                        />
                        <Error error={errors?.description} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            { loading ? (<img src={imgLoading} />) : "Crear" }
                        </button>
                    </div>
                </div>
            </form>
            <div>
                {
                    !list ? '' : 
                    <>
                        <div className="text-center table-responsive table-border table-border-inside">
                            <table className="bg-slate-100">
                                <thead className="font-bold text-lg">
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Titulo</th>
                                        <th className="text-center">Estatus</th>
                                        <th >Ver</th>
                                        <th >Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map((v, i) => (
                                        <tr key={`index-${i}`}>
                                            <td>{v.id}</td>
                                            <td> {v.title} </td>
                                            <td>
                                                <label className="switch">
                                                    <input 
                                                        type="checkbox"
                                                        defaultChecked={v.isView}
                                                        onChange={(e) => {
                                                            setStatus(e.target.checked)
                                                            changeStatus(v.id)
                                                        }}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </td>
                                            <td >
                                                 <a href={`${v.url}`} target="_blank">
                                                <FaEye 

                                                />

                                                </a>
                                                
                                            </td>
                                            <td>
                                               
                                                <FaTrash 
                                                    onClick={() => { 
                                                        setShowModal(true);
                                                        setDeleteNew(v.id)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </div>
            <Modal
                isOpen={showModal}
                actionOpenOrClose={() => {
                    modalHandler();
                }}
                title={`¿Estás seguro de eliminar la noticia?`}
                size=""
                description="Al aceptar se eliminara la noticia y no se podra recuperar."
            >
                <div className='flex justify-center gap-3'>
                    <button className="w-full" onClick={deleteNews}>Aceptar</button>
                    <button className="w-full" onClick={modalHandler}>Cancelar</button>
                </div>
            </Modal>
        </div>
    )
}