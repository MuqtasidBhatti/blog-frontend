import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast' 

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('token', data.token)
                toast.success("Login successful!")
                navigate('/')
            } else {
                toast.error(data.message || "Login failed")
            }
        } catch (err) {
            console.error("Error:", err)
        }
    }

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-10 text-center">
                    <span className="text-amber-700 text-xs font-semibold uppercase tracking-widest">Welcome back</span>
                    <h2 className="mt-2 font-serif text-4xl font-bold text-stone-900 tracking-tight">
                        Sign In
                    </h2>
                    <p className="mt-2 text-stone-500 text-sm">Continue where you left off.</p>
                </div>

                {/* Card */}
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                placeholder="jane@example.com"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full py-3 bg-stone-900 hover:bg-stone-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] mt-2"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm text-stone-500 mt-6">
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-stone-900 font-semibold cursor-pointer hover:text-amber-700 underline underline-offset-2 transition-colors duration-200"
                    >
                        Create one
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login