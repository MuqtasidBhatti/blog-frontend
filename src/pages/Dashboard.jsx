import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const getCurrentUserId = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.id
    } catch {
        return null
    }
}

const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const currentUserId = getCurrentUserId()

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/posts/my-posts', {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                const data = await res.json()
                setPosts(data)
            } catch (err) {
                console.error("Error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchMyPosts()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (res.ok) {
                setPosts(posts.filter(post => post._id !== id))
            }
        } catch (err) {
            console.error("Error:", err)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-16">
            <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-stone-900 animate-spin" />
                <p className="text-stone-500 text-sm">Loading your posts...</p>
            </div>
        </div>
    )

    return (


        <div className="min-h-screen bg-stone-50 pt-16" >
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="flex items-end justify-between border-b border-stone-200 pb-8 mb-12">
                    <div>
                        <span className="text-amber-700 text-xs font-semibold uppercase tracking-widest">Your Space</span>
                        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900 tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-stone-500 text-sm">
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/create')}
                        className="px-5 py-2.5 bg-stone-900 hover:bg-stone-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                    >
                        <span>+</span> New Post
                    </button>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-stone-300 rounded-2xl">
                        <p className="text-stone-400 text-base">No posts yet.</p>
                        <button
                            onClick={() => navigate('/create')}
                            className="mt-4 px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-all duration-200 cursor-pointer"
                        >
                            Write your first post
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white border border-stone-200 rounded-2xl p-6 hover:border-stone-300 transition-all duration-200 group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug truncate">
                                            {post.title}
                                        </h3>
                                        <p className="mt-2 text-stone-500 text-sm leading-relaxed line-clamp-2">
                                            {post.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 pt-1">
                                        <button
                                            onClick={() => navigate(`/edit/${post._id}`)}
                                            className="px-3.5 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-all duration-200 cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="px-3.5 py-2 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    )
}

export default Dashboard