export type usuarioLogin = {
    correo: string
    clave: string
}

type TipoIdentificacion = 'C.C.'| 'T.I.'| 'C.E.'| 'Pasp.'
type Rol = 'administrador' | 'vendedor'

export type usuarioRegistro = {
    nombres: string
    apellidos: string
    tipo_identificacion: 'C.C.'| 'T.I.'| 'C.E.'| 'Pasp.'
    numero_identificacion: TipoIdentificacion
    correo: string
    celula: string
    fecha_nacimiento: string
    direccion: string
    clave: string
    rol: Rol
}