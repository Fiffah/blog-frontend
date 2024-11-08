import React, { useEffect, useState } from 'react';
import { createPost, updatePost } from '../api';

const CreatePost = ({ onPostCreated, editingPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setContent(editingPost.content);
            setIsModalOpen(true);
        }
    }, [editingPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!localStorage.getItem("token")) {
            setError("Anda tidak terautentikasi. Silakan login kembali.");
            return;
        }

        try {
            if (editingPost) {
                await updatePost(editingPost.id, { title, content });
                alert('Post updated successfully');
            } else {
                const newPost = await createPost(title, content);
                onPostCreated(newPost);
                alert('Post created successfully');
            }
            setTitle('');
            setContent('');
            setError('');
            setIsModalOpen(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create/update post');
        }
    };

    return (
        <div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Create Post
            </button>

            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative">
                            <h2 className="text-2xl mb-4">{editingPost ? "Edit Post" : "Create a New Post"}</h2>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
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
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="mr-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        {editingPost ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreatePost;
