'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profile } from '@/services/auth';

export const useAuth = (redirectAuthenticated = false) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await profile();
                setAuthenticated(true);


                if (redirectAuthenticated) {
                    router.push('/tasks');
                }
            } catch {
                setAuthenticated(false);


                if (!redirectAuthenticated) {
                    router.push('/login');
                }
            }
        };

        checkAuthentication();
    }, [redirectAuthenticated, router]);

    return authenticated;
};
