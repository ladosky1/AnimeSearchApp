import { useState, useEffect, createContext, useContext } from "react";
import { getCurrentUser, logoutUser } from "../api/backend";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const data = await getCurrentUser();
            setUser(data?.user || null);
            setLoading(false);
        }
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <AuthContext.Provider value={{ user, setUser, loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}