import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import { Typography, Paper } from '@mui/material';
import axios from 'axios';

const PieChartComponent = () => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    // Fetch expense data from your API
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getExpenseDataMonthwise'); 
        setExpenseData(response.data);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchExpenseData();
  }, []);

  const getChartData = () => {
    return [
      {
        data: expenseData.map((expense, index) => ({
          id: index,
          value: expense.totalAmount,
          label: expense._id,
        })),
      },
    ];
  };

  return (
    <Paper style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6">Expenses by Category</Typography>
      {expenseData && expenseData.length > 0 && (
        <PieChart series={getChartData()}    width={400}
        height={200}/>
      )}
      {(!expenseData || expenseData.length === 0) && (
        <Typography>No expense data available</Typography>
      )}
    </Paper>
  );
};

export default PieChartComponent;
