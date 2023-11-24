import { FC, createContext, ReactNode, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import { usuarioLogin } from "../api/auth.d";
import Cookies from 'js-cookie';
import { PlanillajeTypes } from "../api/planillaje";
import { EmpresaTypes } from "../api/empresa";

interface AuthContextType {
    usuario: any; // Cambiar 'any' por el tipo de dato que representa al usuario
    isAuthenticated: boolean;
    iniciarSesion: (usuario: usuarioLogin) => Promise<void>;
    loading: boolean;
    errors: boolean;
    planilla: PlanillajeTypes;
    asignarPlanilla: (planillaActual: PlanillajeTypes) => void;
    empresa: EmpresaTypes;
    asignarEmpresa: (empresaActual: EmpresaTypes) => void;
    cerrarSesion: () => Promise<void>;
    
}



export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}



export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [usuario, setUsuario] = useState(null)
    const [planilla, setPlanilla] = useState<PlanillajeTypes>({
        id_planilla: 0,
        inicio_ruta: 'N/A',
        fin_ruta: 'N/A',
        nombre_conductor: 'N/A',
        apellido_conductor: 'N/A',
        nombre_vendedor: 'N/A',
        apellido_vendedor: 'N/A',
        numero_placa_vehiculo: 'N/A',
        codigo_interno_vehiculo: 'N/A',
        nombre_agencia: 'N/A',
        hora_salida: null,
        cantidad_puestos_vehiculo: 0,
        precio_ruta: 0,
        viaje_completado: false,
        acronimo_inicio: 'N/A',
        acronimo_fin: 'N/A'
    })

    const [empresa, setEmpresa] = useState<EmpresaTypes>({
        nit: 'N/A',
        razon_social: 'N/A',
        direccion: 'N/A',
        telefono: 'N/A',
        ciudad: 'N/A',
    });

    const asignarEmpresa =  (empresaActual: EmpresaTypes):void =>{
        setEmpresa(empresaActual);
      }

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [errors, setErrors] = useState(false);

    const iniciarSesion = async (usuario: usuarioLogin) => {
        try {
            const res = await loginRequest(usuario)
            setUsuario(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (error instanceof Error){
                setErrors(true);
            }
            
        }
    }

    const cerrarSesion = async ():Promise<void> =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUsuario(null);
      }

       
      const asignarPlanilla =  (planillaActual: PlanillajeTypes):void =>{
        setPlanilla(planillaActual);
      }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUsuario(null)
            }

            try {
                const res = await verifyTokenRequest()
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUsuario(res.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUsuario(null)
                setLoading(false)

            }
        }

        checkLogin()
    }, [])


    useEffect(() => {
        if (errors) {
          const timer = setTimeout(() => {
            setErrors(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [errors]);

    return (
        <AuthContext.Provider value={{ usuario: usuario, isAuthenticated, iniciarSesion, loading, errors, cerrarSesion, planilla, asignarPlanilla, asignarEmpresa, empresa }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
