import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SinglePost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`)
                const data = await res.json()
                setPost(data)
            } catch (err) {
                console.error("Error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [id])

    if (loading) return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-16">
            <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-stone-900 animate-spin" />
                <p className="text-stone-500 text-sm">Loading post...</p>
            </div>
        </div>
    )

    if (!post) return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-16">
            <div className="text-center">
                <p className="font-serif text-4xl text-stone-300 font-bold">404</p>
                <p className="text-stone-500 mt-2 text-sm">Post not found.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-all duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-stone-50 pt-16">
            <div className="max-w-2xl mx-auto px-6 py-16">

                {/* Back */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 text-sm font-medium transition-colors duration-200 mb-12 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                    Back to all posts
                </button>

                {/* Post header */}
                <div className="border-b border-stone-200 pb-8 mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                        {post.title}
                    </h1>
                    <div className="mt-5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white text-xs font-bold uppercase">
                            {post.author?.name?.[0] || "A"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-stone-700">{post.author?.name || "Anonymous"}</p>
                            <p className="text-xs text-stone-400">
                            <p className="text-xs text-stone-400">Author</p>
                                {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Post content */}
                <div className="prose prose-stone max-w-none">
                    <p className="text-stone-700 text-lg leading-relaxed font-light">
                        {post.content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SinglePost