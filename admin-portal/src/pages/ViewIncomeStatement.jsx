import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d'];

const ViewIncomeStatement = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [incomeRes, expenseRes] = await Promise.all([
        fetch('https://iwb-cloud-app.onrender.com/api/income', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://iwb-cloud-app.onrender.com/api/expenses', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!incomeRes.ok || !expenseRes.ok) {
        throw new Error('Unauthorized or failed to fetch data');
      }

      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();

      setMonthlyIncome(incomeData);
      setExpenses(expenseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalIncome = monthlyIncome.reduce((sum, entry) => sum + entry.totalIncome, 0);
  const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem 2rem' }}>
        <h2>Income Statement</h2>
        <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
        <p><strong>Net Income:</strong> ${netIncome.toFixed(2)}</p>

        <h3>Monthly Income</h3>
        <ul>
          {monthlyIncome.map((entry) => (
            <li key={entry._id}>
              {entry._id}: ${entry.totalIncome.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '2rem' }}>
        <h3>Monthly Income (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyIncome}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="totalIncome" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ padding: '2rem' }}>
        <h3>Income vs. Expenses (Pie Chart)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViewIncomeStatement;
