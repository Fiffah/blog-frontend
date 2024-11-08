import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            await register(name, email, password, passwordConfirmation, navigate);
        } catch (err) {
            // Tangani error registrasi
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                        Register
                    </button>
                </form>

                <p className="text-center mt-4">
                    Anda sudah punya akun?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Klik disini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
