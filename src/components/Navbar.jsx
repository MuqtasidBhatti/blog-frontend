import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const token = localStorage.getItem('token')

    // Reusable Nav Button
    const navBtn = (path, label) => (
        <button
            onClick={() => { navigate(path); setMenuOpen(false) }}
            className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
            ${location.pathname === path
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
        >
            {label}
        </button>
    )

    const handleLogout = () => {
        localStorage.removeItem('token')
        setMenuOpen(false)
        navigate('/login')
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Brand */}
                <span
                    onClick={() => navigate('/')}
                    className="font-serif text-xl font-bold text-stone-900 cursor-pointer tracking-tight hover:text-amber-700 transition-colors duration-200"
                >
                    The Blog
                </span>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors duration-200 cursor-pointer"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-1">

                    {navBtn('/', 'Home')}
                    {navBtn('/dashboard', 'Dashboard')}

                    {/* Write Post (special button) */}
                    <button
                        onClick={() => navigate('/create')}
                        className="px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-700 rounded-lg transition-all duration-200 ml-2 cursor-pointer whitespace-nowrap"
                    >
                        Write Post
                    </button>

                    {/* Logout */}
                    {token && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden border-t border-stone-200 bg-white px-6 py-4 flex flex-col gap-2">
                    {navBtn('/', 'Home')}
                    {navBtn('/dashboard', 'Dashboard')}
                    <button
                        onClick={() => { navigate('/create'); setMenuOpen(false) }}
                        className="px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-700 rounded-lg transition-all duration-200 cursor-pointer text-left"
                    >
                        Write Post
                    </button>
                    {token && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer text-left"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar