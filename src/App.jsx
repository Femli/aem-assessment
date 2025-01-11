import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeSetter.jsx';
import Toggler from './components/Toggler.jsx';
import InputForm from './components/InputForm.jsx';

function AppContent() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const { darkMode } = useTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/romannumeral?query=${input}`);
            const data = await response.json();
            setResult(data.output || 'No result');
        } catch (error) {
            console.error('Error:', error);
            setResult('Error occurred');
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-12">
                <Toggler />
                <div className="flex justify-center items-center">
                    <InputForm
                        number={input}
                        setNumber={setInput}
                        result={result}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;