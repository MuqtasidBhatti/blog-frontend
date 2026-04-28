import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast' 

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", content: "" })
    const navigate = useNavigate()

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:5000/api/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(post)
            })
            const data = await res.json()
            if (res.ok) {
                toast.success("Post created successfully!")
                setPost({ title: "", content: "" })
                navigate('/dashboard')
            } else {
                toast.error(data.message || "Failed to create post")
            }
        } catch (err) {
            console.error("Error:", err)
        }
    }

    const isReady = post.title.trim() && post.content.trim()

    return (
        <div className="min-h-screen bg-stone-50 pt-16">
            <div className="max-w-2xl mx-auto px-6 py-16">

                {/* Header */}
                <div className="mb-12 border-b border-stone-200 pb-8">
                    <span className="text-amber-700 text-xs font-semibold uppercase tracking-widest">
                        New Post
                    </span>
                    <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900 tracking-tight">
                        Write Something
                    </h1>
                    <p className="mt-2 text-stone-500 text-sm">Share your thoughts with the world.</p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                            Title
                        </label>
                        <input
                            placeholder="Your post title..."
                            value={post.title}
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                            Content
                        </label>
                        <textarea
                            placeholder="Write your story here..."
                            value={post.content}
                            rows={12}
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200 resize-none"
                        />
                        <p className="text-right text-xs text-stone-400 mt-1.5">
                            {post.content.length} characters
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={!isReady}
                            className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]
                                ${isReady
                                    ? 'bg-stone-900 text-white hover:bg-stone-700 cursor-pointer'
                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                }`}
                        >
                            Publish Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost