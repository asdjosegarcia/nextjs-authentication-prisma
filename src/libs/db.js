

//en nextjs cuando hacemos un refresh o cambio, nextjs vuelve a vargar el servidor volviendo a el estado inicial volviendo a pedir una conexion
//minetras mas modificaciones mas conexiones con la DB, eso puede generar problemas al desarrollar, para evitar esto se utiliza un bloque de codigo
//para manejar esas situaciones 

//este codigo lo encontramos en //https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
//este ya se transformo de codigo ts a js
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => { //cuando cargamos el modulo se eejecuta esta funcion
  return new PrismaClient()
}

const globalForPrisma = globalThis 

const prisma = globalForPrisma.prisma ?? prismaClientSingleton() //si existe lo toma, de lo contrario genera uno nuevo

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
