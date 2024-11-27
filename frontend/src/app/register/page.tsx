'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { register as registerUser } from '@/services/auth';
import FormInput from '@/components/FormInput';
import {useAuth} from "@/app/hooks/useAuth";

type FormValues = {
    name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
};

const RegisterPage = () => {
    const router = useRouter();
    useAuth(true);
    const [serverError, setServerError] = useState('');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Full Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username cannot exceed 20 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'),
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
            await registerUser(data);
            router.push('/login');
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                {serverError && <p className="text-red-500 text-center text-sm mb-4">{serverError}</p>}
                <FormInput
                    label="Full Name"
                    id="name"
                    register={register('name')}
                    error={errors.name?.message}
                />
                <FormInput
                    label="Email"
                    id="email"
                    type="email"
                    register={register('email')}
                    error={errors.email?.message}
                />
                <FormInput
                    label="Username"
                    id="username"
                    register={register('username')}
                    error={errors.username?.message}
                />
                <FormInput
                    label="Password"
                    id="password"
                    type="password"
                    register={register('password')}
                    error={errors.password?.message}
                />
                <FormInput
                    label="Confirm Password"
                    id="password_confirmation"
                    type="password"
                    register={register('password_confirmation')}
                    error={errors.password_confirmation?.message}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white ${
                        isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
