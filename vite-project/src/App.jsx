import React, { useState } from 'react';
import RoadmapDisplay from './components/RoadmapDisplay';
import { generateRoadmap } from './api/roadmap';

const App = () => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('linear');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generatedRoadmap = await generateRoadmap(topic, style);
      setRoadmap(generatedRoadmap);
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Roadmap Generator</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Roadmap Topic
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="style" className="block text-sm font-medium text-gray-700">
            Roadmap Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="linear">Linear</option>
            <option value="tree">Tree</option>
            <option value="flowchart">Flowchart</option>
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate Roadmap
        </button>
      </form>
      {loading && <p className="text-center">Generating roadmap...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {roadmap && <RoadmapDisplay roadmap={roadmap} />}
    </div>
  );
};

export default App;