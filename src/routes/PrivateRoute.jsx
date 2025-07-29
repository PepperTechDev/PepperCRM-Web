import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {getToken, verifyToken} from "../features/auth/services/authService";

const isAuthenticated = async () => {
    const token = getToken();
    if (!token) return false;

    try {
        // Verifica el token con el backend
        await verifyToken(token);
        return true; // El token es válido
    } catch (error) {
        console.error("Invalid token:", error);
        return false; // El token no es válido
    }
};

// Componente PrivateRoute
const PrivateRoute = ({children}) => {
    const [isAuth, setIsAuth] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuthenticated();
            setIsAuth(auth);
        };
        checkAuth();
    }, []);

    // Mientras se verifica la autenticación, muestra un loader o nada
    if (isAuth === null) return <div>Loading...</div>;

    // Si no está autenticado, redirige al login
    if (!isAuth) return <Navigate to="/login" replace/>;

    // Si está autenticado, renderiza el contenido
    return children ? children : <Outlet/>;
};

export default PrivateRoute;
