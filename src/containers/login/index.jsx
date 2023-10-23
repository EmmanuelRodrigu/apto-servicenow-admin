import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { http } from "@providers/http"
import Error from '@components/Error';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import notify from "@utils/notify";
import bgImg from '@assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { gapi } from 'gapi-script';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { getDriverStorage, userFormatShort, setRol } from "../../utils";
import { VITE_CLIENT_ID } from '@utils/constants';

export default function Login() {
    const store = useStore();
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const clientId = VITE_CLIENT_ID;
    const handleClick = () => setShow(!show);

    const schema = yup.object({
        email: yup.string().email('Debe ser un correo electronico valido').required('El correo electronico es requerido'),
        password: yup.string().required('La constraseña es requerida').min(8, 'Minimo 8 caracteres')
    }).required();

    const {register, handleSubmit, formState: {errors}, } = useForm({ resolver: yupResolver(schema), defaultValues: {email: '', password: '',} })

    const saveToken = (access_token) => {
        getDriverStorage().setItem('tokenApto', access_token);
        store.saveJwt(access_token)
    }

    const saveUser = (user, type) => {
        getDriverStorage().setItem(
            'currentUser',
            JSON.stringify(userFormatShort(user))
        );
        store.saveUser(userFormatShort(user, type));
        store.saveRole(setRol(user.rol, store))
    };

    const onSubmit = async (values) => {
        await http.post('auth/login', values)
            .then((response) => {
                if (response.status > 400) {
                    notify(response.message, 'error');
                    navigate('/');
                } else {
                    if(response.user.rol === 'Client') {
                        store.setSession(true);
                        saveToken(response.access_token)
                        store.setModulePermissions(response.modulesPermissions)
                        console.log(response.user)
                        saveUser(response.user ,'client')
                        navigate(`/${response.user.id}/home`);

                    } else {
                        store.setSession(true);
                        saveToken(response.access_token)
                        store.setModulePermissions(response.modulesPermissions)
                        saveUser(response.user)
                        navigate('/dashboard');
                    }
                };
            }).catch((error) => {
                notify(error, 'error')
            })
    };

    const onSuccess = async (responseGoogle) => {
        console.log(responseGoogle)
        document.getElementsByClassName('btn').hidden = true;
        store.setSession(true);
        saveToken(responseGoogle?.credential)
        saveUser(responseGoogle?.profileObj)
        navigate('/dashboard');
    };

    const onError = () => {
        notify('Selecciona una cuenta de Google para iniciar sesión', 'info');
        navigate('/');
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId
            })
        }
        gapi.load('client:auth2', start)
    }, [])

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
            <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                    <h1 className='text-5xl font-semibold'>Iniciar sesión</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'>ServiceNow</p>
                    <div className='mt-8 mb-2'>
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium'>Correo electrónico</label>
                                <input 
                                    className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent ${errors?.email ? 'error' : ''}`}
                                    placeholder="example@example.com"
                                    {...register('email')}
                                />
                                <Error error={errors?.email} />
                            </div>
                            <div className='flex flex-col mt-4 relative'>
                                <label className='text-lg font-medium'>Contraseña</label>
                                <input
                                    className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent pr-12 ${errors?.password ? 'error' : ''}`}
                                    placeholder="Ingresa tu contraseña"
                                    {...register('password')}
                                    type={`${show ? 'text': 'password'}`}
                                />
                                <button 
                                    type="button"
                                    onClick={handleClick}
                                    className="absolute top-3 right-4"
                                >
                                    {show ? (
                                        <FaEyeSlash/>
                                    ) : (
                                        <FaEye/>
                                    )}
                                </button>
                                <Error error={errors?.password} />
                            </div>
                            <div className='mt-8 flex justify-between items-center'>
                                <button className='font-medium text-base text-fuchsia-900'>Recuperar contraseña</button>
                            </div>
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <button
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-black rounded-xl text-white font-bold text-lg'>Iniciar sesión
                                </button>
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        onSuccess={onSuccess}
                                        onError={onError}
                                        useOneTap
                                    />
                                </GoogleOAuthProvider>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="login relative w-1/2 h-full lg:flex items-center justify-center">
                <div className="w-80 h-80 bg-no-repeat bg-cover bg-center hidden sm:block bg-no-repeat" style={{backgroundImage: `url(${bgImg})`}}/>
            </div>
    </div>
  );
}