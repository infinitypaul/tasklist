'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout, profile } from '@/services/auth';

interface LayoutProps {
    title: string;
    children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profile();
                setUsername(response.data.data.username);
            } catch (err: any) {
                console.error('Failed to fetch profile:', err.response?.data?.message || err.message);
                router.push('/login');
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            router.push('/login');
        } catch (err: any) {
            console.error('Failed to logout:', err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="dark:bg-gray-700 min-h-screen bg-gray-100">

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center">

                    <h1
                        className="text-3xl font-bold leading-tight text-gray-900 cursor-pointer"
                        onClick={() => router.push('/tasks')}
                    >
                        TaskList
                    </h1>


                    <div className="flex items-center gap-4">
                        {username && (
                            <span className="text-gray-700 text-sm">
                                Welcome, <strong>{username}</strong>
                            </span>
                        )}

                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>


            <main className="mt-6 max-w-7xl mx-auto p-6">{children}</main>
        </div>
    );
};

export default Layout;
