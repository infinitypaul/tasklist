'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { createTask } from '@/services/task';
import FormInput from '@/components/FormInput';

type FormValues = {
    name: string;
    description: string;
};

const CreateTaskPage = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Task name is required'),
        description: Yup.string().required('Task description is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setServerError('');
        setLoading(true);

        try {
            await createTask(data);
            router.push('/tasks');
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Create Task">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Create a New Task</h2>

                {serverError && (
                    <p className="text-red-500 text-center text-sm mb-4">{serverError}</p>
                )}

                <FormInput
                    label="Task Name"
                    id="name"
                    type="text"
                    register={register('name')}
                    error={errors.name?.message}
                />

                <FormInput
                    label="Task Description"
                    id="description"
                    type="textarea"
                    rows={4}
                    register={register('description')}
                    error={errors.description?.message}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white ${
                        loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {loading ? 'Creating...' : 'Create Task'}
                </button>
            </form>
        </Layout>
    );
};

export default CreateTaskPage;
