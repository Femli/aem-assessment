import React from 'react';
import InputField from './InputField.jsx';

function InputForm({ number, setNumber, result, handleSubmit }) {
    return (
        <div className="max-w-md w-full space-y-6">
            <h1 className="text-3xl font-bold text-center dark:text-white">
                Roman numeral converter
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                        Enter a number
                    </label>
                    <InputField
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Convert to roman numeral
                </button>
            </form>

            {result && (
                <div className="text-center">
                    <p className="text-lg font-medium dark:text-white">
                        Roman numeral: {result}
                    </p>
                </div>
            )}
        </div>
    );
}

export default InputForm;