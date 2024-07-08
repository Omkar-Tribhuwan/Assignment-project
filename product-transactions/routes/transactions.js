const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/transactions', async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;

  const query = {
    dateOfSale: { $regex: `-${month.padStart(2, '0')}-` },
    $or: [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: new RegExp(search, 'i') }
    ]
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

router.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const regex = new RegExp(`-${month.padStart(2, '0')}-`);

  try {
    const totalSale = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: regex } } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    const soldItems = await Transaction.countDocuments({ dateOfSale: { $regex: regex }, sold: true });
    const notSoldItems = await Transaction.countDocuments({ dateOfSale: { $regex: regex }, sold: false });

    res.status(200).json({
      totalSaleAmount: totalSale[0]?.total || 0,
      totalSoldItems: soldItems,
      totalNotSoldItems: notSoldItems
    });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
});

router.get('/bar-chart', async (req, res) => {
  const { month } = req.query;
  const regex = new RegExp(`-${month.padStart(2, '0')}-`);

  const ranges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity }
  ];

  try {
    const barChart = await Promise.all(ranges.map(async range => {
      const count = await Transaction.countDocuments({
        dateOfSale: { $regex: regex },
        price: { $gte: range.min, $lt: range.max }
      });
      return { range: range.range, count };
    }));

    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).send('Error fetching bar chart data');
  }
});

router.get('/pie-chart', async (req, res) => {
  const { month } = req.query;
  const regex = new RegExp(`-${month.padStart(2, '0')}-`);

  try {
    const pieChart = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: regex } } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json(pieChart);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
});

router.get('/combined', async (req, res) => {
  const { month } = req.query;

  try {
    const [statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:3000/api/statistics?month=${month}`),
      axios.get(`http://localhost:3000/api/bar-chart?month=${month}`),
      axios.get(`http://localhost:3000/api/pie-chart?month=${month}`)
    ]);

    res.status(200).json({
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    });
  } catch (error) {
    res.status(500).send('Error fetching combined data');
  }
});

module.exports = router;
