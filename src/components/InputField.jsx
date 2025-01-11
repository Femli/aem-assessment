import React from 'react';

function InputField({ value, onChange }) {
    return (
        <input
            type="number"
            value={value}
            onChange={onChange}
            placeholder="Enter a number (1-3999)"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
            min="1"
            max="3999"
        />
    );
}

export default InputField;