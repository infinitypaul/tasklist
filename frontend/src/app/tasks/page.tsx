'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { getTasks, getSharedTasks } from '@/services/task';
import { profile } from '@/services/auth';

type Task = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    created_at: string;
};

type SharedTask = {
    id: number;
    task: Task;
    permission: {
        id: number;
        name: 'view' | 'edit';
    };
};

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sharedTasks, setSharedTasks] = useState<SharedTask[]>([]);
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [ownTasksResponse, sharedTasksResponse] = await Promise.all([
                    getTasks(),
                    getSharedTasks(),
                ]);

                setTasks(ownTasksResponse.data.tasks);
                setSharedTasks(sharedTasksResponse.data.data);
            } catch (err: any) {
                setError('Failed to load tasks. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Layout title="Tasks">
                <div className="text-center mt-10">Loading tasks...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title="Tasks">
                <div className="text-center text-red-500 mt-10">{error}</div>
            </Layout>
        );
    }

    return (
        <Layout title="Tasks">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold ">Hello! My Lord, Shall We</h1>
                <a
                    href="/tasks/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    + Create Task
                </a>
            </div>


            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white p-4 shadow rounded">
                                <h3 className="text-lg font-bold mb-2">{task.name}</h3>
                                <p className="text-sm text-gray-600">{task.description || 'No description provided'}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <a
                                        href={`/tasks/view/${task.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View
                                    </a>
                                    <a
                                        href={`/tasks/edit/${task.id}`}
                                        className="text-yellow-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            <section>
                <h2 className="text-2xl font-semibold mb-4">Tasks Shared with You</h2>
                {sharedTasks.length === 0 ? (
                    <p>No tasks shared with you.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sharedTasks.map((sharedTask) => (
                            <div key={sharedTask.id} className="bg-white p-4 shadow rounded">
                                <h3 className="text-lg font-bold mb-2">{sharedTask.task.name}</h3>
                                <p className="text-sm text-gray-600">{sharedTask.task.description || 'No description provided'}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Permission:{' '}
                                    <span className="font-medium">{sharedTask.permission.name}</span>
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                    <a
                                        href={`/tasks/view/${sharedTask.task.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View
                                    </a>
                                    {sharedTask.permission.name === 'edit' && (
                                        <a
                                            href={`/tasks/edit/${sharedTask.task.id}`}
                                            className="text-yellow-500 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default TasksPage;
