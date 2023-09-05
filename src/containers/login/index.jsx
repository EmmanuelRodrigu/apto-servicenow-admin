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
import GoogleLogin from 'react-google-login';
import { getDriverStorage, userFormatShort } from "../../utils";

export default function Login() {
    const store = useStore();
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const clientId = '231847360650-7mq15l3tmpgreoprlr8qparcn0oubfso.apps.googleusercontent.com';
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

    const saveUser = (user) => {
        getDriverStorage().setItem(
            'currentUser',
            JSON.stringify(userFormatShort(user))
        );
        store.saveUser(userFormatShort(user));
    };

    const onSubmit = async (values) => {
        await http.post('auth/login', values)
            .then((response) => {
                if (response.status > 400) {
                    notify(response.message, 'error');
                    navigate('/');
                } else {
                    store.setSession(true);
                    saveToken(response.access_token)
                    saveUser(response.user)
                    navigate('/dashboard');
                };
            }).catch((error) => {
                notify(error, 'error')
            })
    };
    
    const onSuccess = async (responseGoogle) => {
        document.getElementsByClassName('btn').hidden = true;
        await http.post('auth/google', {email: responseGoogle.profileObj.email})
            .then((response) => {
                if (response.status > 400) {
                    notify(response.message, 'error');
                    navigate('/');
                } else {
                    store.setSession(true);
                    saveToken(responseGoogle.accessToken)
                    saveUser(responseGoogle.profileObj)
                    navigate('/dashboard');
                };
            })
            .catch((error) => {
                notify(error, 'error')
            })
        
    };

    const onFailure = () => {
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
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-black rounded-xl text-white font-bold text-lg'>Iniciar sesión</button>
                                <GoogleLogin
                                    className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 '
                                    clientId={clientId}
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    buttonText="Continuar con Google"
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-fuchsia-900">
                <div className="w-80 h-80 bg-no-repeat bg-cover bg-center hidden sm:block bg-no-repeat" style={{backgroundImage: `url(${bgImg})`}}/>
            </div>
    </div>
  );
}