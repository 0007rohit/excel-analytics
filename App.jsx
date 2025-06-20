
import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ChartDisplay2D from './components/ChartDisplay2D';

const App = () => {
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [chartType, setChartType] = useState('line');

  const handleParsedData = (data, cols) => {
    setExcelData(data);
    setColumns(cols);
  };

  const generateChartData = () => {
    if (!xKey || !yKey) return null;
    const labels = excelData.map(row => row[xKey]);
    const values = excelData.map(row => row[yKey]);
    return { labels, values };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Excel Data Visualizer</h1>
      <UploadForm onDataParsed={handleParsedData} />

      {columns.length > 0 && (
        <div>
          <select onChange={(e) => setXKey(e.target.value)} value={xKey}>
            <option>Select X-Axis</option>
            {columns.map(col => <option key={col}>{col}</option>)}
          </select>
          <select onChange={(e) => setYKey(e.target.value)} value={yKey}>
            <option>Select Y-Axis</option>
            {columns.map(col => <option key={col}>{col}</option>)}
          </select>
          <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
        </div>
      )}

      {xKey && yKey && (
        <ChartDisplay2D chartType={chartType} chartData={generateChartData()} />
      )}
    </div>
  );
};

export default App;
