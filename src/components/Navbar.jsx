import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next' //para mostrar solo las paginas a las que puede acceder el usuario loggeado
import { AuthOptions } from 'next-auth' //traemos la configuracion del next-auth,

const Navbar = async () => {
    const session=await getServerSession(AuthOptions) //esto nos deja ver el usuario logueado
    console.log(session)
    return (
        <nav className='flex justify-between bg-gray-950 text-white px-24 py-3'>
            <h1 className='text-xl font-bold'>NextAuth</h1>
        {
            !session?.user?( //si el usuario NO existe
                <ul className='flex gap-x-2'>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/auth/login"}>Login</Link>
                </li>
                <li>
                    <Link href={"/auth/register"}>Register</Link>
                </li>
            </ul>
            ):( //si el usuario existe
                <ul className='flex gap-x-2'>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                    <Link href={"/api/auth/signout"}>Signout</Link>{/* pagina de deslogueo que ya viene con next */}
                </li>
            </ul>
            )
        }
        </nav>
    )
}

export default Navbar