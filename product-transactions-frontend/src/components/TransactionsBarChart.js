import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../api';

const TransactionsBarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchBarChart(month);
      setBarData(response.data);
    };
    fetchData();
  }, [month]);

  const data = {
    labels: barData.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  return (
    <div>
      <h3>Bar Chart for {month}</h3>
      <Bar data={data} />
    </div>
  );
};

export default TransactionsBarChart;
