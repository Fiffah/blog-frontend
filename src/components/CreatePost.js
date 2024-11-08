import React, { useState } from 'react';
import { createPost } from '../api';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("Token sebelum membuat post:", token);

        if (!token) {
            setError("Anda tidak terautentikasi. Silakan login kembali.");
            return;
        }

        try {
            await createPost(title, content);
            alert('Post created successfully');
            setTitle('');
            setContent('');
            setError('');
        } catch (err) {
            console.error("Error creating post:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to create post');
        }
    };

    return (
        <div className="p-8">
            <h2>Create a New Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="block w-full p-2 mb-4 border"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="block w-full p-2 mb-4 border"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
