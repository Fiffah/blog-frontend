import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div>
            <h1>Blog Platform</h1>
            <p>Welcome to the blog platform!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
