import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const Income = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [expenses, setExpenses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/income');
        if (!response.ok) throw new Error('Failed to fetch income');
        const data = await response.json();
        setMonthlyIncome(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIncome();
  }, []);

  const handleSaveExpenses = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expenses })
      });
      if (!response.ok) throw new Error('Failed to save expenses');
      alert('Expenses saved successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => setExpenses({});

  const totalIncome = monthlyIncome.reduce((sum, entry) => sum + entry.totalIncome, 0);
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const netIncome = totalIncome - totalExpenses;

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem 2rem' }}>
        <h3>Monthly Income Statement</h3>
        <ul>
          {monthlyIncome.map((entry) => (
            <li key={entry._id} style={{ marginBottom: '1rem' }}>
              {entry._id}: ${entry.totalIncome.toFixed(2)}
              <label style={{ marginLeft: '1rem' }}>
                Expense: $
                <input
                  type="number"
                  value={expenses[entry._id] || ''}
                  onChange={(e) =>
                    setExpenses((prev) => ({
                      ...prev,
                      [entry._id]: parseFloat(e.target.value) || 0,
                    }))
                  }
                  style={{ width: '100px', marginLeft: '0.5rem' }}
                />
              </label>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSaveExpenses} disabled={saving} style={{ marginRight: '1rem' }}>
            {saving ? 'Saving...' : 'Save Expenses'}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h4>Total Income: ${totalIncome.toFixed(2)}</h4>
          <h4>Total Expenses: ${totalExpenses.toFixed(2)}</h4>
          <h3 style={{ color: netIncome >= 0 ? 'green' : 'red' }}>
            Net Income: ${netIncome.toFixed(2)}
          </h3>
        </div>
      </div>

      <div style={{ padding: '2rem' }}>
        <h3>Monthly Income (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyIncome}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
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
              fill="#82ca9d"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Income;
