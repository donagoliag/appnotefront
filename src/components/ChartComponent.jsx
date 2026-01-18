import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const LineChartComponent = () => {
  const data = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [
      {
        label: 'Moyenne Générale',
        data: [12.8, 13.2, 13.6, 13.8],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#ffffff'
      },
      {
        label: 'Informatique',
        data: [13.5, 14.1, 14.3, 14.6],
        borderColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.6)'
      },
      {
        label: 'Mathématiques',
        data: [12.1, 12.5, 13.0, 13.2],
        borderColor: 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.4)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}/20`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 11,
        max: 16,
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { 
          color: 'rgba(255, 255, 255, 0.4)', 
          font: { size: 11 },
          callback: (value) => `${value}/20`
        }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { size: 11 } }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export const DoughnutChartComponent = () => {
  const data = {
    labels: ['Excellent (≥16)', 'Très Bien (14-16)', 'Bien (12-14)', 'Passable (10-12)', 'Insuffisant (<10)'],
    datasets: [{
      data: [15, 28, 35, 17, 5],
      backgroundColor: [
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.6)',
        'rgba(255, 255, 255, 0.4)',
        'rgba(255, 255, 255, 0.2)',
        'rgba(255, 255, 255, 0.1)'
      ],
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 0,
      spacing: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 11 },
          color: 'rgba(255, 255, 255, 0.6)',
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%`
        }
      }
    },
    cutout: '70%'
  };

  return <Doughnut data={data} options={options} />;
};