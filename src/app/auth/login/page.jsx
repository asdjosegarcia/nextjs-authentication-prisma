"use client"
import React,{useState} from 'react'
import { useForm } from "react-hook-form";//para el manejo del formulario
import { signIn } from 'next-auth/react'; //para el envio del formulario a la DB
import { useRouter } from 'next/navigation'; //para la redirecciones


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()//register para el manejo de los inputs, errors para el manejo de los errores, handleSubmit
  const router = useRouter()//para las redirecciones
  const [error,setEerror]=useState(null)//para almacenar el errror

  const onSubmit = handleSubmit(async data => { //data es la informacion que tomamos del usuario
    const res = await signIn('credentials', {//signIn es una funcion de next-auth para el logueo, ya sea con google,facebook etc, por defecto nos redirecciona
      email: data.email,
      password: data.password,
      redirect: false,//para evitar el redireccionamiento al loguearse
    })
    if (res.error) {
      // alert(res.error);
      setEerror(res.error)
    } else {
      // console.log('enviando a /dashboard')
      router.push('/dashboard') //si la autenticacion sale bien redireccionamos a el usuario a dashboard

    }
    console.log('res', res)
  })


  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4'>{/* una vez completado el formulario ejecuta la funcion onSubmit, que ejecuta handle submit */}
        {error && (
          <p className='bg-red-500 text-xs'>{error}</p>
        )}
        <h1 className="text-slate-400 font-bold text-4xl mb-4">Login</h1>
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Email</label>{/* texto superior */}
        <input type="text" {...(register("email", { required: { value: true, message: 'Email is required' } }))} placeholder="yourUser123@email.com" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
        {
          errors.email && (//si error.email existe
            <span className="text-red-500">{errors.email.message}</span>//se crea este span
          )
        }
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Password</label>{/* texto superior */}
        <input type="password" {...(register("password", { required: { value: true, message: 'Password is required' } }))} placeholder="******" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
        {
          errors.password && (//si error.password existe
            <span className="text-red-500">{errors.password.message}</span>//se crea este span
          )
        }
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage