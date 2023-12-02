import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PieChart from './PieChart';
import Barchart from './Barchart';
import DonutChart from './DonutChart';
import axios from 'axios';

const Dashboard = () => {
  const [currentMonthCost, setCurrentMonthCost] = useState(null);
  const [lastMonthCost, setLastMonthCost] = useState(null);

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const currentMonthResponse = await axios.get('http://localhost:8000/currentMonthCosts');
        setCurrentMonthCost(currentMonthResponse.data.totalCosts);

        const lastMonthResponse = await axios.get('http://localhost:8000/lastMonthCosts');
        setLastMonthCost(lastMonthResponse.data.totalCosts);
      } catch (error) {
        console.error('Error fetching cost data:', error);
      }
    };

    fetchCostData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">Expenses This Month</Typography>
        <Typography>{currentMonthCost ? `${currentMonthCost}` : '0'}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">Expenses Last Month</Typography>
        <Typography>{lastMonthCost ? `${lastMonthCost}` : '0'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <PieChart />
      </Grid>
      <Grid item xs={12}>
        <Barchart />
      </Grid>
      <Grid item xs={12}>
        <DonutChart />
      </Grid>
    </Grid>
  );
};

export default Dashboard;