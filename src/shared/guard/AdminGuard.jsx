import React from 'react'
import { Navigate, replace } from 'react-router-dom'

export default function AdminGuard( {children}) {
    const users = JSON.parse(localStorage.getItem('user'))

    return users?.role === 'admin' ? children : <Navigate to="/" replace />
}
