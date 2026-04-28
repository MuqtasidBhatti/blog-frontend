import { Navigate } from 'react-router-dom'

const isTokenValid = () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.exp * 1000 > Date.now()
    } catch {
        return false
    }

}

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute