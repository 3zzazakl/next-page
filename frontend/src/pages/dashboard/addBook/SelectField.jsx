import React from 'react';

const SelectField = ({ label, name, options, register }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <select
                {...register(name)}
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField; 
