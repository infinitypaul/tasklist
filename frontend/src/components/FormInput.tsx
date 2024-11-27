import React from 'react';

type FormInputProps = {
    label: string;
    id: string;
    type?: 'text' | 'email' | 'password' | 'textarea';
    rows?: number;
    register: ReturnType<typeof import('react-hook-form').useForm>['register'];
    error?: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, id, type = 'text', rows, register, error }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    rows={rows}
                    {...register}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    {...register}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;
