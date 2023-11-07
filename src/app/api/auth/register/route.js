const { NextResponse } = require("next/server")
import bcrypt from 'bcrypt'
import db from '@/libs/db' //importamos y renombramos la funcion del archivo db.js

export async function POST(request) { //funcion que recive un dato, export para indicarle a next que esta funcion va a manejar los datos 
    try {
        const data = await request.json()//datos que recivimos y transformamos a js

        const userFound = await db.user.findUnique({//findUnique busca un registro unico de la base de datos, 
            where: {//se utiliza para buscar en la base de datos
                email: data.email //aqui le decimos que busque en la db algo que conincida con el data.email en la talba user.email
            }
        })
        if (userFound) {//
            return NextResponse.json({//si el email existe, terminamos la consulta con un mensaje y error
                message: "email already exists",
            }, {
                status: 400
            })
        }

        const usernameFound = await db.user.findUnique({//findUnique busca un registro unico de la base de datos, 
            where: {//se utiliza para buscar en la base de datos
                email: data.username //aqui le decimos que busque en la db algo que conincida con el data.usernameen la talba user.email
            }
        })
        if (usernameFound) {//
            return NextResponse.json({//si el email existe, terminamos la consulta con un mensaje y error
                message: "username already exists",
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)//se encripta data.password como hash, 10 10 veces, 
        const newUser = await db.user.create({//creamos un usario 
            data: {//enviamos los datos 
                username: data.username,
                email: data.email,
                password: hashedPassword//contraseña cifrada
            }
        }) //user por que asi definimos la tabla en eschema.prsima solo que en minuscula,
        const { password: _, ...user } = newUser//copia todo el contenido del user menos el password
        return NextResponse.json(user)//retornamos user sin password como respuesta
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500,
        }
        )
    }
}
