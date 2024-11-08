import React, { useState } from 'react';
import { createPost } from '../api';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost(title, content);
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;
