// src/components/RevenueChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
    const revenueData = [
        500, 700, 800, 600, 500, 400, 300, 200, 100, 500, 1100, 1200];;
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue (USD)',
                data: revenueData,
                backgroundColor: '#4c51bf',
                borderColor: '#4c51bf',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return (
        <div className="w-full h-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
            <div className= 'hidden md:block'>
            <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default RevenueChart;
