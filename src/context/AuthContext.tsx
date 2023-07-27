import { FC, createContext, ReactNode, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import { usuarioLogin } from "../api/auth.d";
import Cookies from 'js-cookie';
import { set } from "react-hook-form";

interface AuthContextType {
    usuario: any; // Cambiar 'any' por el tipo de dato que representa al usuario
    isAuthenticated: boolean;
    iniciarSesion: (usuario: usuarioLogin) => Promise<void>;
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
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const iniciarSesion = async (usuario: usuarioLogin) => {
        try {
            const res = await loginRequest(usuario)
            setUsuario(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (cookies.token) {
                try {
                    const res = await verifyTokenRequest()
                    if (!res.data) setIsAuthenticated(false)

                    setIsAuthenticated(true)
                    setUsuario(res.data)
                    console.log(cookies.token)
                } catch (error) {
                    setIsAuthenticated(false)
                    setUsuario(null)
                }
            }
        }

        checkLogin()
    }, [])



    return (
        <AuthContext.Provider value={{ usuario: usuario, isAuthenticated, iniciarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
