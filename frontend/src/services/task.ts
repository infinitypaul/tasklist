import api from './api';


export const getTasks = () => {
    return api.get('/tasks');
};


export const getSharedTasks = () => {
    return api.get('/tasks/shared');
};


export const getTaskDetails = (taskId: string | number) => {
    return api.get(`/tasks/${taskId}`);
};


export const getSharedWithUsers = (taskId: string | number) => {
    return api.get(`/tasks/${taskId}/shared`);
};


export const getPermissions = () => {
    return api.get('/permissions');
};


export const toggleTaskCompletion = (taskId: string | number) => {
    return api.post(`/tasks/mark/${taskId}`);
};


export const shareTask = (taskId: string | number, data: { username: string; permission: string }) => {
    return api.post(`/tasks/share/${taskId}`, data);
};

export const updateTask = (taskId: string | number, data: { name: string; description: string }) => {
    return api.put(`/tasks/${taskId}`, data);
};

export const createTask = (data: { name: string; description: string }) => {
    return api.post('/tasks', data);
};
