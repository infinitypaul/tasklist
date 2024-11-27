'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormInput from '@/components/FormInput';
import { login } from '@/services/auth';
import {useAuth} from "@/app/hooks/useAuth";

type FormValues = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const router = useRouter();
    useAuth(true);
    const [serverError, setServerError] = useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setServerError('');
        try {
            const response = await login(data);
            localStorage.setItem('token', response.data.data.token);
            router.push('/tasks');
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {serverError && (
                    <p className="text-red-500 text-center text-sm mb-4">{serverError}</p>
                )}
                <FormInput
                    label="Email"
                    id="email"
                    register={register('email')}
                    error={errors.email?.message}
                />
                <FormInput
                    label="Password"
                    id="password"
                    type="password"
                    register={register('password')}
                    error={errors.password?.message}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white ${
                        isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
                <p className="text-center text-sm mt-4">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
