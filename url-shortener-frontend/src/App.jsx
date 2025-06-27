// src/App.jsx
import React from 'react';
import ShortenerForm from './components/ShortenerForm';

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <ShortenerForm />
    </div>
  );
};

export default App;
