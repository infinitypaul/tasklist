'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { getTaskDetails, updateTask } from '@/services/task';
import FormInput from '@/components/FormInput';

type FormValues = {
    name: string;
    description: string;
};

const EditTaskPage = () => {
    const router = useRouter();
    const { id: taskId } = useParams();

    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [taskLoading, setTaskLoading] = useState(true);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Task name is required'),
        description: Yup.string().required('Task description is required'),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskDetails(taskId);
                const task = response.data.task;

                setValue('name', task.name);
                setValue('description', task.description);
                setTaskLoading(false);
            } catch (err: any) {
                setServerError('Failed to load task details. Please try again.');
                setTaskLoading(false);
            }
        };

        if (taskId) fetchTask();
    }, [taskId, setValue]);

    // Form Submission
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setServerError('');
        setLoading(true);

        try {
            await updateTask(taskId, data);
            router.push('/tasks');
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    if (taskLoading) {
        return (
            <Layout title="Edit Task">
                <div className="text-center py-10">Loading task details...</div>
            </Layout>
        );
    }

    return (
        <Layout title="Edit Task">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Edit Task</h2>

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
                    {loading ? 'Updating...' : 'Update Task'}
                </button>
            </form>
        </Layout>
    );
};

export default EditTaskPage;
