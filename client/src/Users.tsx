// Users.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    _id: string; // Assuming the id is a string based on the delete API you provided
    name: string;
    email: string;
    age: number; // Assuming age is a number
    address: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // TypeScript typing for users array
    const [error, setError] = useState<string | null>(null); // State for handling errors

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/all-users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add JWT token
                    },
                });
                setUsers(response.data.data); // Assuming response.data is an array of users
            } catch (err) {
                setError('Failed to fetch users.'); // Handle errors
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/admin/delete-user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add JWT token
                },
            });
            setUsers(users.filter(user => user._id !== id)); // Update the users state
            alert('User deleted successfully!');
        } catch (err) {
            setError('Failed to delete user.'); // Handle errors
            console.error('Error deleting user:', err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Users List</h2>
            {error && <div className="text-red-500">{error}</div>} {/* Error message */}
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map(user => (
                    <li key={user._id} className="py-2 flex justify-between items-center">
                        <div>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>Age: {user.age}</p>
                            <p>Address: {user.address}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="ml-4 py-1 px-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
