// App.jsx
import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 to-indigo-700 ">
      <header className="p-4 bg-blue-600 shadow-md">
        <h1 className="text-center text-2xl font-bold">Weather Dashboard</h1>
      </header>
      <main className="container mx-auto p-4">
        <WeatherDashboard />
      </main>
      <footer className="p-4 text-center bg-blue-600">
        <p>&copy; {new Date().getFullYear()} Weather Dashboard</p>
      </footer>
    </div>
  );
};

export default App;
