import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from '@store';
import { http } from "@providers/http";

export default function HomePage() {
    const store = useStore();
    const navigate = useNavigate()
    const { user } = store;
    const [data, setData] = useState([]);

    const getData = async () => {
        http.get('api/newsletter/view')
            .then((response) => {
                setData(response)
            })
            .catch((error) => {
                notify(error, 'error')
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="space-y-6">
            <div className="w-full bg-slate-200 shadow-md h-min-screen h-screen">
                <img className="h-screen w-screen" src={`${data.url}`} ></img>
            </div>
            <h1 className="text-2xl rounded-full text-center bg-gray-600 p-2 text-white">¿Que tipo de problema reportar?</h1>
            <div className="flex flex-cols-3 h-1/2 py-10 justify-evenly">
                <div className="flex p-4">
                    <div className="w-1/3 p-4 hover:py-1">
                        <div className="card-f text-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2">Nueva Funcionalidad</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="pt-4 text-center">
                                <button onClick={() => { navigate(`/${user.payload.id}/nueva-funcionalidad`) }} className="btn-card w-full">Crear</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 p-4 hover:py-1">
                        <div className="card-b text-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2">Reportar Bug</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="pt-4 text-center">
                                <button onClick={() => { navigate(`/${user.payload.id}/reportar-bug`) }} className="relative btn-card w-full">Crear</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 p-4 hover:py-1">
                        <div className="card-s text-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2">Soporte tecnico</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="pt-4 text-center">
                                <button onClick={() => { navigate(`/${user.payload.id}/soporte-tecnico`) }} className="relative btn-card w-full">Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}