import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeHolder }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                {...register(name, { required: true })}
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                placeholder={placeHolder}
            />
        </div>
    );
};

export default InputField;
