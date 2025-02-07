import React from 'react';

const SelectField = ({ 
  label, 
  name, 
  options, 
  register, 
  required = true, 
  className = '', 
  ...rest 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        {...register(name, { required })}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 ${className}`}
        {...rest}
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
