import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, error, setError } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logout()
        } catch (err) {
            console.error(err)
        } finally {
            setUser(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setLoading(false)
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            const savedUser = localStorage.getItem("user")
            const savedToken = localStorage.getItem("token")

            if (savedUser && savedToken) {
                setUser(JSON.parse(savedUser))
                setLoading(false)
                try {
                    const data = await getMe()
                    setUser(data.user)
                    localStorage.setItem("user", JSON.stringify(data.user))
                } catch (err) {
                    setUser(null)
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }
            } else {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    return { user, loading, error, setError, handleRegister, handleLogin, handleLogout }
}