import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    age: number | string;
    address: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: ''  // Added confirmPassword
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
            newErrors.age = 'Age must be a valid number between 1 and 120.';
        }
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';  // Validation for confirmPassword
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const path = window.location.pathname;
        const isAdminSignup = path.includes('/admin/signup');
        const apiUrl = isAdminSignup ? '/api/admin/register' : '/api/users/register';

        const { name, age, address, email, password } = formData;


        try {
            const response = await axios.post(apiUrl, { name, age, address, email, password });

            console.log('User registered:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data));

            alert('Registration successful!');
            navigate('/');
        } catch (error: any) {
            console.error('Error:', error);

            if (error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred while registering the user.');
            }

        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your name"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your age"
                            required
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your address"
                            required
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="you@example.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Confirm password"
                            required
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Additional navigation buttons */}
                <div className="mt-6 flex space-x-2">
                    <button
                        className="py-1 px-3 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700"
                        onClick={() => navigate('/login')}
                    >
                        User Login
                    </button>
                    <button
                        className="py-1 px-3 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700"
                        onClick={() => navigate('/admin/login')}
                    >
                        Admin Login
                    </button>
                    <button
                        className="py-1 px-3 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-700"
                        onClick={() => navigate('/signup')}
                    >
                        User Signup
                    </button>
                    <button
                        className="py-1 px-3 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-700"
                        onClick={() => navigate('/admin/signup')}
                    >
                        Admin Signup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
