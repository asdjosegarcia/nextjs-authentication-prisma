// import React from 'react'
"use client" //para que funcione de lado cliente
import { useForm } from "react-hook-form";//hook que instalamos por aparte para que getione las consulltas de formularios


const RegisterPage = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()// descomponemos el objeto devuelto por useForm() 
    //register para poder acceder a las funcionalidades de useForm
    //handlesubmit que cancela el comportamiento por defecto
    //formState objeto que tiene informacion del formulario, si se envio, si tiene algun error,
    //objeto que alamcena los datos que extrae formState

    const onSubmit = handleSubmit(async(data) => {//esta funcion ccancela el comportamiento por defecto del formulario(recarga de la pag), y entrega los datos del formulario
        // console.log(data)//datos del formulario
        if(data.password !== data.confirmPassword){//comprobamos que contraseña y confirmar contraseña coincidan
            alert("password do not match")
        }

        const res=await fetch('/api/auth/register',{
            method:'POST', //metodo con el que se envia
            body: JSON.stringify({
                username:data.username, //enviamos los datos que tiene data por separado
                email:data.email,
                password:data.password,
            }),//datos que le enviamos
            headers:{
                'Content-Type':'application/json'
            }
        })
        const resJSON=await res.json()//recivimos la respuesta de la consulta
        console.log(resJSON)//mostramos la respuesta por consola
    })

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-400 font-bold text-4xl mb-4">Register</h1>
                <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">Username</label>{/* texto superior */}
                <input type="text" {...(register("username", { required: { value: true, message: 'Username is required' } }))} placeholder="yourUser123" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.username && (//si error.username existe
                        <span className="text-red-500">{errors.username.message}</span>//se crea este span
                    )
                }

                <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Email</label>
                <input type="email" {...(register("email", {required: { value: true, message: 'Email is required' }  }))} placeholder="user@email.com" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.email && (//si error.email existe
                        <span className="text-red-500">{errors.email.message}</span>//se crea este span
                    )
                }

                <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">password</label>
                <input type="password" {...(register("password", {required: { value: true, message: 'Password is required' }  }))} placeholder="******" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.password && (//si error.password existe
                        <span className="text-red-500">{errors.password.message}</span>//se crea este span
                    )
                }

                <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">Confirm Password</label>
                <input type="password" {...(register("confirmPassword", {required: { value: true, message: 'Confirm Password is required' }}))} placeholder="******" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.confirmPassword && (//si error.confirmPassword existe
                        <span className="text-red-500">{errors.confirmPassword.message}</span>//se crea este span
                    )
                }

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage