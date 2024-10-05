import React, { useEffect, useState } from 'react';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(null);

    useEffect(() => {
        // Retrieve user data from local storage
        const storedUserData = localStorage.getItem('user');

        // Parse the user data from JSON
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    console.log(`userData`, userData);

    return (
        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Profile</h2>
            <div className="space-y-2">
                {userData ? (
                    <>
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Role:</strong> {userData.role}</p>
                    </>
                ) : (
                    <p>No user data found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
