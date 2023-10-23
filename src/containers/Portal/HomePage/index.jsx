import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { useStore } from '@store'

export default function HomePage() {
    const store = useStore();
    const navigate = useNavigate()
    const { user } = store;

    return (
        <div>
            <div className="w-full bg-slate-200 shadow-md h-80">
                
            </div>
            <h1 className="text-xl py-5 text-center">¿Que tipo de problema reportar?</h1>
            <div className="flex flex-cols-3 justify-evenly">
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