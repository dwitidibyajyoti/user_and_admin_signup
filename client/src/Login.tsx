import { useNavigate, useLocation } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Determine if the login is for an admin or user based on the URL
    const isAdminLogin = location.pathname.includes('/admin/login');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        const apiUrl = isAdminLogin ? '/api/admin/login' : '/api/users/login'; // Set API endpoint based on login type

        try {
            const response = await axios.post(apiUrl, { email, password });
            console.log('User logged in:', response.data);

            // Store JWT token and user data in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data)); // Adjust based on your API response

            alert('Login successful!');
            navigate('/'); // Redirect to the desired route after login
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
            console.error('Error:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                    >
                        {isAdminLogin ? 'Login as Admin' : 'Login as User'}
                    </button>
                </form>

                {/* Additional Buttons */}
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

export default Login;
