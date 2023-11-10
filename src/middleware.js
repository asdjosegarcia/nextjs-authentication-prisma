/* export { default } from "next-auth/middleware"

export const config = { 
    matcher: ["/dashboard"] indicamos que vamos a proteger la ruta dashboard
} */
// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/dashboard"] }

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*", "/cursos/:path*"] } //protege dashboard, y cursos(auqnue cursos no exista)
//:path*  me resolvio el bug, su funcion es permitir que se le agregue cualquier cosa adelante ya sea un "" o un "gato/pato"