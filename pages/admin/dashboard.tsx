import * as React from 'react';
import Layout from '../../components/admin/layout'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
// import Chart from 'react-apexcharts'

import { Box, LinearProgress, Card, CardContent, CardHeader, Divider, Typography, useTheme, Container, Grid, Avatar } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

const Budget = (props) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography color="textSecondary" variant="overline">BUDGET</Typography>
          <Typography color="textPrimary" variant="h4">$24k</Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);



export const TasksProgress = (props) => (
  <Card sx={{ height: '100%' }}    {...props}  >
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" variant="overline">TASKS PROGRESS</Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress value={75.5} variant="determinate" />
      </Box>
    </CardContent>
  </Card>
);

const AccessChart = () => {
  const series = [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]
  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  };
  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>

  );
}

const Languages = () => {
  const series = [44, 55, 41, 17, 15];
  const options = {
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  return <Chart options={options} series={series} type="donut" />
}

const Comments = () => {
  const comments = []
  return (
    <Typography variant="h4">Comments </Typography>
  )
}

export default function Dashboard() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}><Budget /></Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}><Budget /></Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}><TasksProgress /></Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}><TasksProgress /></Grid>

          <Grid item xl={6} lg={6} sm={6} xs={12}><AccessChart /></Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}><Languages /></Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}><TasksProgress /></Grid>

          <Grid item xl={6} lg={6} sm={6} xs={12}><Comments/></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

Dashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}
