import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({ children }) => {
    const { loading, user } = useAuth()


    if (loading) {
        return (
            <div className='loading-screen'>
                <div className='spinner'></div>
                <h1>Authenticating...</h1>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected