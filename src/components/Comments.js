import React, { useEffect, useState } from 'react';
import { getComments, createComment, deleteComment, getUser } from '../api';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            setUser(userData);
        };

        fetchUser();
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        const fetchedComments = await getComments(postId);
        setComments(fetchedComments);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            await createComment(postId, newComment);
            setNewComment('');
            fetchComments();
        } catch (err) {
            console.error('Error creating comment:', err.response?.data?.message || err.message);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteComment(commentId);
                fetchComments();
            } catch (err) {
                console.error('Error deleting comment:', err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Comments</h3>
            {comments.map(comment => (
                <div key={comment.id} className="bg-gray-200 p-2 mb-2 rounded">
                    <p className="text-gray-800">{comment.content}</p>
                    <small>By: {comment.user ? comment.user.name : 'Anonymous'}</small>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-500 ml-4"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}

            {user?.role === 'admin' && (
                <form onSubmit={handleAddComment} className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        className="block w-full p-2 border"
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">
                        Add Comment
                    </button>
                </form>
            )}
        </div>
    );
};

export default Comments;
