import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
            <div className="text-center">
                <p className="font-serif text-8xl font-bold text-stone-200">404</p>
                <h1 className="mt-4 font-serif text-2xl font-bold text-stone-900">Page not found</h1>
                <p className="mt-2 text-stone-500 text-sm">The page you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 px-6 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-all duration-200 cursor-pointer"
                >
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default NotFound