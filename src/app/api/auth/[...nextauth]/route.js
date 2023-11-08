//este código configura la autenticación usando NextAuth.js y el proveedor de credenciales. se puede configurarar dependiendo de las necesidades de autenticacion
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'; //proveedor de autenticación de credenciales, nos permite autenticar las credenciales 
import db from "@/libs/db";
import bcrypt from 'bcrypt'


const authOptions = {//objeto donde almacenamos la configuracion para enviarsela a la funcion NextAuth
    providers: [ //arreglo que especifica los proveedores de autenticacion
        CredentialsProvider({//se utiliza para la autenticacion basada en credenciales, nombre, usuario y contraseña
            name: "Credentials", //
            credentials: {//objeto que define los campos de credenciales requeridos para la autenticación, en este caso email, password
                email: { label: "Email", type: "text", placeholder: "jsmith" }, //estas propiedades generan el input de un login hubicado en //http://localhost:3000/api/auth/signin
                password: { label: "Password", type: "password", placeholder: "*****" }
            },
            async authorize(credentials, req) {//funcion que que autoriza/verifica a el usuario, recive el contenido de lo que escribamos en el input
                console.log(credentials)
                const userFound =await db.user.findUnique({//almacena el usuario,await por por que sino nos manda cualquier cosa
                    where: {
                        email: credentials.email
                    }
                })
                if(!userFound)return null //si no se encuentra un usario como en ingresado en la db retorna null    
                console.log('userFound',userFound)//mostramos el usuario que se encontro con el email
                const matchPassword= await bcrypt.compare(credentials.password,userFound.password) //esto nos da un true o false,true si coinciden las contraseñas
                if(!matchPassword) return null //si no coincide retorna null

                return{//si toda la autorizacion paso correcta
                    id:userFound.id,
                    name:userFound.username,
                    email:userFound.email,
                    //aca podriamos poner avatar,
                };
            }
        })
    ]
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } //para tener anbas funciones manejadas por el mismo manejador de funcion?
//exporta la variable handler 2 veces, 1 con GET y otra con POST
//