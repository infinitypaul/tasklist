import React from 'react';

type Props = {
    label: string;
    id: string;
    options: { value: string | number; label: string }[];
    register: any;
    error?: string;
};

const FormSelect: React.FC<Props> = ({ label, id, options, register, error }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <select
            id={id}
            {...register}
            className={`mt-1 block w-full px-3 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        >
            <option value="">Select an option</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default FormSelect;
