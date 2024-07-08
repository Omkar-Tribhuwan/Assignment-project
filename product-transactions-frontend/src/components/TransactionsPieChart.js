import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChart } from '../api';

const TransactionsPieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPieChart(month);
      setPieData(response.data);
    };
    fetchData();
  }, [month]);

  const data = {
    labels: pieData.map(item => item._id),
    datasets: [
      {
        data: pieData.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  return (
    <div>
      <h3>Pie Chart for {month}</h3>
      <Pie data={data} />
    </div>
  );
};

export default TransactionsPieChart;
