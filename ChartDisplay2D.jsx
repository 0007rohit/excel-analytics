
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement);

const ChartDisplay2D = ({ chartType, chartData }) => {
  const chartProps = {
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: `${chartType} Chart`,
          data: chartData.values,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 123, 255, 0.4)',
        },
      ],
    },
    options: { responsive: true },
  };

  switch (chartType) {
    case 'line': return <Line {...chartProps} />;
    case 'bar': return <Bar {...chartProps} />;
    case 'pie': return <Pie {...chartProps} />;
    default: return <p>Select a valid chart type</p>;
  }
};

export default ChartDisplay2D;
