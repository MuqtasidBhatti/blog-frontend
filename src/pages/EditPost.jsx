import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({ title: "", content: "" })
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`)
        if (!res.ok) throw new Error(`Server error ${res.status}`)
        const data = await res.json()
        setPost({ title: data.title, content: data.content })
      } catch (err) {
        console.error("Error:", err)
        toast.error("Failed to load post")
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(post)
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Post updated!")
        navigate('/dashboard')
      } else {
        toast.error(data.message || "Update failed")
      }
    } catch (err) {
      console.error("Error:", err)
      toast.error("Something went wrong")
    }
  }

  const isReady = post.title.trim() && post.content.trim()

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-16">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-stone-900 animate-spin" />
        <p className="text-stone-500 text-sm">Loading post...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12 border-b border-stone-200 pb-8">
          <span className="text-amber-700 text-xs font-semibold uppercase tracking-widest">Editing</span>
          <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900 tracking-tight">Edit Post</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Title</label>
            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Content</label>
            <textarea
              value={post.content}
              rows={12}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={!isReady}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]
                ${isReady
                  ? 'bg-stone-900 text-white hover:bg-stone-700 cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost