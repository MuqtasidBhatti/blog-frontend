import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/posts')
                if (!res.ok) throw new Error(`Server Error ${res.status}`)
                const data = await res.json()
                setPosts(data)
            } catch (err) {
                console.error("Error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    if (loading) return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-16">
            <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-stone-900 animate-spin" />
                <p className="text-stone-500 text-sm">Loading posts...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-stone-50 pt-16">
            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* Hero */}
                <div className="mb-16 border-b border-stone-200 pb-12">
                    <span className="text-amber-700 text-xs font-semibold uppercase tracking-widest">
                        The Blog
                    </span>
                    <h1 className="mt-3 font-serif text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                        All Stories
                    </h1>
                    <p className="mt-4 text-stone-500 text-base leading-relaxed max-w-lg">
                        Thoughts, ideas, and perspectives from our community of writers.
                    </p>
                </div>

                {/* Posts */}
                {posts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-stone-300 rounded-2xl">
                        <p className="text-stone-400 text-base">No posts yet.</p>
                        <p className="text-stone-400 text-sm mt-1">Be the first to write one!</p>
                    </div>
                ) : (
                    <div className="space-y-0 divide-y divide-stone-200">
                        {posts.map((post, index) => (
                            <article
                                key={post._id}
                                onClick={() => navigate(`/post/${post._id}`)}
                                className="group py-8 cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                                            #{String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="mt-1 font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors duration-200 leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-stone-500">
                                            By <span className="font-medium text-stone-700">{post.author?.name}</span>
                                            <span className="mx-2 text-stone-300">·</span>
                                            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                        </p>
                                    </div>
                                    <div className="shrink-0 mt-1">
                                        <span className="text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all duration-200 text-lg inline-block">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home