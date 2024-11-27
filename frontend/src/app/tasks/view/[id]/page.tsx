'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import {
    getTaskDetails,
    getPermissions,
    getSharedWithUsers,
    toggleTaskCompletion,
    shareTask
} from '@/services/task';

type Task = {
    id: number;
    name: string;
    description: string | null;
    status: boolean;
};

type Permission = {
    id: number;
    name: string;
};

type SharedWithUser = {
    id: number;
    invitee: {
        id: number;
        username: string;
    };
    permission: {
        id: number;
        name: string;
    };
};

type ShareFormValues = {
    username: string;
    permission: string;
};

const ViewTaskPage = () => {
    const { id: taskId } = useParams();

    const [task, setTask] = useState<Task | null>(null);
    const [shared, setShared] = useState(false);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [sharedWith, setSharedWith] = useState<SharedWithUser[]>([]);
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [toggleLoading, setToggleLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShareFormValues>();


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskDetails(taskId);
                setTask(response.data.task);
                setShared(response.data.shared);
            } catch (err: any) {
                setServerError('Failed to load task details. Please try again.');
            }
        };

        if (taskId) fetchTask();
    }, [taskId]);


    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await getPermissions();
                setPermissions(response.data.data);
            } catch (err: any) {
                setServerError('Failed to load permissions. Please try again.');
            }
        };

        fetchPermissions();
    }, []);


    useEffect(() => {
        const fetchSharedWith = async () => {
            try {
                const response = await getSharedWithUsers(taskId);
                setSharedWith(response.data.data);
            } catch (err: any) {
                setServerError('Failed to load shared users. Please try again.');
            }
        };

        if (taskId) fetchSharedWith();
    }, [taskId]);


    const toggleCompletion = async () => {
        if (!task) return;

        setToggleLoading(true);
        try {
            await toggleTaskCompletion(task.id);
            setTask({ ...task, status: !task.status });
        } catch (err: any) {
            setServerError('Failed to update task status. Please try again.');
        } finally {
            setToggleLoading(false);
        }
    };


    const onSubmit: SubmitHandler<ShareFormValues> = async (data) => {
        setServerError('');
        setLoading(true);

        try {
            const result = await shareTask(taskId, data);
            alert(result.data.message);
            reset();
            const response = await getSharedWithUsers(taskId);
            setSharedWith(response.data.data);
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Failed to share the task');
        } finally {
            setLoading(false);
        }
    };

    if (!task) {
        return (
            <Layout title="View Task">
                <div className="text-center py-10">Loading task details...</div>
            </Layout>
        );
    }

    return (
        <Layout title="View Task">

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-4">{task.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{task.description || 'No description provided.'}</p>
                <p className="text-sm text-gray-500 mb-6">
                    Status: {task.status ? 'Completed' : 'Not Completed'}
                </p>

                {!shared && (
                    <button
                        onClick={toggleCompletion}
                        disabled={toggleLoading}
                        className={`w-full py-2 px-4 rounded-md text-white ${
                            toggleLoading
                                ? 'bg-gray-400'
                                : task.status
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {toggleLoading ? 'Updating...' : task.status ? 'Mark as Not Completed' : 'Mark as Completed'}
                    </button>
                )}
            </div>


            {!shared && (
                <>

                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
                        <h3 className="text-xl font-bold mb-4">Share This Task</h3>
                        {serverError && <p className="text-red-500 text-center text-sm mb-4">{serverError}</p>}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormInput
                                label="Username"
                                id="username"
                                type="text"
                                register={register('username', { required: 'Username is required' })}
                                error={errors.username?.message}
                            />

                            <FormSelect
                                label="Permission"
                                id="permission"
                                register={register('permission', { required: 'Permission is required' })}
                                options={permissions.map((permission) => ({
                                    value: permission.id,
                                    label: permission.name,
                                }))}
                                error={errors.permission?.message}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-4 rounded-md text-white ${
                                    loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {loading ? 'Sharing...' : 'Share Task'}
                            </button>
                        </form>
                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
                        <h3 className="text-xl font-bold mb-4">Shared With</h3>
                        {sharedWith.length === 0 ? (
                            <p>No users have access to this task.</p>
                        ) : (
                            <ul className="space-y-4">
                                {sharedWith.map((user) => (
                                    <li key={user.id} className="border-b pb-2">
                                        <p>
                                            <span className="font-bold">{user.invitee.username}</span> -{' '}
                                            <span className="text-gray-500">{user.permission.name}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
};

export default ViewTaskPage;
