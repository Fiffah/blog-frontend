import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout, getPosts, deletePost } from '../api';
import CreatePost from './CreatePost';
import Comment from './Comments';

const Home = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                navigate('/login');
            }
        };

        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchUser();
        fetchPosts();
    }, [navigate]);

    const handleLogout = () => {
        logout(navigate);
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handleDeletePost = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePost(id);
                setPosts(posts.filter(post => post.id !== id));
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
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
                {user ? (
                    <>
                        <p className="text-3xl font-medium">Hello, {user.name}</p>
                        <p className="text-xl mt-2">Welcome to the Blog Platform!</p>
                        <p className="text-lg mt-4">
                            Your Role: <span className="font-bold text-blue-600">{user.role}</span>
                        </p>
                    </>
                ) : (
                    <p className="text-xl">Loading...</p>
                )}

                {user?.role === 'admin' && <CreatePost onPostCreated={handlePostCreated} />}

                <div className="grid grid-cols-3 gap-6 mt-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-lg p-4 relative">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p className="text-gray-600 mt-2">{post.content}</p>
                            <Comment postId={post.id} />
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                {user && user.role === 'admin' && (
                                    <button onClick={() => handleEditPost(post)} className="bg-yellow-500 text-white py-1 px-3 rounded">
                                        Edit
                                    </button>
                                )}
                                {user && user.role === 'admin' && (
                                    <button onClick={() => handleDeletePost(post.id)} className="bg-red-500 text-white py-1 px-3 rounded">
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Home;
