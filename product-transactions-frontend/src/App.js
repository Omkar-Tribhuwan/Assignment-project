import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';

const App = () => {
  const [month, setMonth] = useState('03');
  const [search, setSearch] = useState('');

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div>
      <h1>Product Transactions</h1>
      <label>
        Select Month:
        <select value={month} onChange={handleMonthChange}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>
      <TransactionsStatistics month={month} />
      <TransactionsTable month={month} search={search} />
      <TransactionsBarChart month={month} />
      <TransactionsPieChart month={month} />
    </div>
  );
};

export default App;
