import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api';

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStatistics(month);
      setStatistics(response.data);
    };
    fetchData();
  }, [month]);

  return (
    <div>
      <h3>Statistics for {month}</h3>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
