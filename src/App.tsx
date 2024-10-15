import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState('');

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-80 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
        <Timer className="mr-2" /> Task Timer
      </h1>
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="text-4xl font-mono text-center mb-4">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleStartStop}
          className={`px-4 py-2 rounded ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  );
}

export default App;