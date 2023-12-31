//este código configura la autenticación usando NextAuth.js y el proveedor de credenciales. se puede configurarar dependiendo de las necesidades de autenticacion
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'; //proveedor de autenticación de credenciales, nos permite autenticar las credenciales 
import db from "@/libs/db";//importamos la base de datos    
import bcrypt from 'bcrypt'//encriptador y desencriptador   


const authOptions = {//objeto donde almacenamos la configuracion para enviarsela a la funcion NextAuth
    providers: [ //arreglo que especifica los proveedores de autenticacion
        CredentialsProvider({//se utiliza para la autenticacion basada en credenciales, nombre, usuario y contraseña
            name: "Credentials", //
            credentials: {//objeto que define los campos de credenciales requeridos para la autenticación, en este caso email, password, tambien podemos crear uno propio, pero de momento lo vamos a probar
                email: { label: "Email", type: "text", placeholder: "jsmith" }, //estas propiedades generan el input de un login hubicado en //http://localhost:3000/api/auth/signin
                password: { label: "Password", type: "password", placeholder: "*****" }
            },
            async authorize(credentials, req) {//funcion que que autoriza/verifica a el usuario, recive el contenido de lo que escribamos en el input, y la informacionde la peticion
                // console.log(credentials)
                const userFound =await db.user.findUnique({//almacena el usuario,await por por que sino nos manda cualquier cosa
                    where: {
                        email: credentials.email
                    }
                })
                if(!userFound) throw new Error('No user found') //si no se encuentra un usario como en ingresado en la db retorna null    

                // console.log('userFound',userFound)//mostramos el usuario que se encontro con el email
                const matchPassword= await bcrypt.compare(credentials.password,userFound.password) //esto nos da un true o false,true si coinciden las contraseñas encriptadas
                if(!matchPassword) throw new Error('Password wrong') //si no coincide retorna null(no hay usuario)

                return{//si toda la autorizacion paso correcta, se envia esta informacion como cookie
                    id:userFound.id,
                    name:userFound.username,
                    email:userFound.email,
                    //aca podriamos poner avatar,
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/login", //el midlleware nos mandaria aqui cuando no estemos logueados
      }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } //,para tener anbas funciones manejadas por el mismo manejador de funcion?
//cuando llegue una peticion get y post se va a usar handler para manejar esta peticion
//