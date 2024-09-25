import React from 'react';

const RoadmapDisplay = ({ roadmap }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Generated Roadmap</h2>
      <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded-md">
        {roadmap}
      </pre>
    </div>
  );
};

export default RoadmapDisplay;