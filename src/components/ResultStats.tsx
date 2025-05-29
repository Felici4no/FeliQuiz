import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Result } from '../types';

interface ResultStatsProps {
  result: Result;
  totalResponses: number;
  resultPercentages: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#3b5998', '#8b9dc3', '#dfe3ee', '#f7f7f7'];

const ResultStats: React.FC<ResultStatsProps> = ({ result, totalResponses, resultPercentages }) => {
  const yourResultPercentage = resultPercentages.find(r => r.name === result.character)?.value || 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-bold mb-4">Result Statistics</h3>
      
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-fb-blue">{yourResultPercentage.toFixed(1)}%</p>
        <p className="text-gray-600">of users got the same result as you</p>
        <p className="text-sm text-gray-500 mt-1">Based on {totalResponses.toLocaleString()} responses</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resultPercentages}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {resultPercentages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultStats;