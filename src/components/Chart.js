import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Chart({dataArray, Title, labels, background, dataSet }) {
  const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: Title,
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  },
};


 const data = {
  labels,
  datasets: [
    {
      label: dataSet,
      data: dataArray,
      borderColor: background,
      backgroundColor: background,
      yAxisID: 'y',
    }
  ],
};

  return <Line options={options} data={data} />;
}
export default Chart;
