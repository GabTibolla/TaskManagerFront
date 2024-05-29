import React, { createContext, useState, useEffect } from 'react';

interface AuthContextProps {
    idTask: number | null
    setIdTask: (idTask: number | null) => void

    id: number | null
    setId: (id: number | null) => void
    isAuthenticated: boolean
    setIsAuthenticated: (isAuth: boolean) => void
    token: string | null
    setToken: (token: string | null) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
    idTask: null,
    setIdTask: () => { },
    id: null,
    setId: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    token: null,
    setToken: () => { },
    logout: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [idTask, setIdTask] = useState<number | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken')
        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }

        const storedId = localStorage.getItem('id')

        if (storedId) {
            setId(parseInt(storedId));
        }

        const storedIdTask = localStorage.getItem('idTask')

        if (storedIdTask) {
            setIdTask(parseInt(storedIdTask));
        }

    }, [])

    const logout = () => {
        localStorage.removeItem('jwtToken')
        setIsAuthenticated(false)
        setToken(null)
        setId(null)
    }

    return (
        <AuthContext.Provider
            value={{ idTask, setIdTask, id, setId, isAuthenticated, setIsAuthenticated, token, setToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
