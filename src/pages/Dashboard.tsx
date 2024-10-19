import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { formatCurrency } from '../utils/formatCurrency';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard: React.FC = () => {
  const { transactions } = useTransactions();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const doughnutData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [1200000, 1900000, 1500000, 2000000, 1800000, 2200000],
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">MoneyBuddy🤑</h1>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">{currentMonth}</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Total expense</p>
          <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total income</p>
          <p className="text-xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Expenses by Category</h3>
        <Doughnut data={doughnutData} />
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Expenses over time</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Dashboard;