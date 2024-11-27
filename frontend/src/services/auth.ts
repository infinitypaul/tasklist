import api from './api';

// Response Types
type ProfileResponse = {
    data: {
        id: number;
        username: string;
        name: string;
        email: string;
    };
};

type RegisterResponse = {
    data: {
        id: number;
        username: string;
        name: string;
        email: string;
        token: string;
    };
};


type RegisterRequest = {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type LoginRequest = {
    email: string;
    password: string;
};


export const login = (data: LoginRequest): Promise<{ token: string }> => {
    return api.post('/login', data);
};

export const register = (data: RegisterRequest): Promise<RegisterResponse> => {
    return api.post('/register', data);
};

export const logout = (): Promise<{ message: string }> => {
    return api.post('/logout');
};

export const profile = (): Promise<ProfileResponse> => {
    return api.get('/me');
};
