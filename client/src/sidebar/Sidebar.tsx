// Sidebar.tsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const user: any = localStorage.getItem('user');
    const userData = JSON.parse(user);


    const handleLogout = () => {
        // Remove token and user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login or home page
        navigate('/login'); // Change this to the appropriate route for your application
    };

    useEffect(() => {
        // Get user and token from localStorage
        const token = localStorage.getItem('token');

        // Check if user or token doesn't exist
        if (!user || !token) {
            navigate('/login');  // Redirect to /login if not found
        } else {
            navigate('/');  // Redirect to home if user and token exist
        }
    }, []);

    return (
        <aside className="w-64 h-screen bg-gray-50" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                    <li>
                        <Link to="/profile" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                            <span className="ml-3">Profile</span>
                        </Link>
                    </li>
                    {userData?.role == 'admin' && <li>
                        <Link to="/users" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                            <span className="ml-3">Users</span>
                        </Link>
                    </li>}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 w-full"
                        >
                            <span className="ml-3">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
