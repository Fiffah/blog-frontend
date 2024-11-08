import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };
    
    const handleCreatePost = () => {
        navigate('/CreatePost');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Blogging Platform</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                    Logout
                </button>
            </nav>

            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">Welcome to the Blog Platform!</h2>
                <button 
                        onClick={handleCreatePost}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-4 mb-5"
                    >
                        Create Post
                    </button>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold">Blog Post Title 1</h3>
                        <p className="text-gray-600 mt-2">This is a short description of the blog post content.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold">Blog Post Title 2</h3>
                        <p className="text-gray-600 mt-2">This is another short description of a different blog post.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold">Blog Post Title 3</h3>
                        <p className="text-gray-600 mt-2">Another blog post description here for display.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
