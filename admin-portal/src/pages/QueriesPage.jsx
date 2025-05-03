import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from '../components/Navbar';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from 'recharts';


const QueriesPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const queriesPerPage = 5;
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/queries');
        const data = await response.json();
        setQueries(data);
      } catch (error) {
        console.error('Error fetching queries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayQueries = queries.slice(
    currentPage * queriesPerPage,
    (currentPage + 1) * queriesPerPage
  );

  const handleMarkAsResolved = async (query) => {
    try {
      await fetch(`http://localhost:5000/api/queries/${query._id}`, {
        method: 'PUT',
        body: JSON.stringify({ response }),
        headers: { 'Content-Type': 'application/json' },
      });

      const updatedQueries = queries.map((q) =>
        q._id === query._id ? { ...q, status: 'resolved', response } : q
      );
      setQueries(updatedQueries);
      setResponse('');

      // Send email after marking as resolved
      await fetch(`http://localhost:5000/api/queries/send-response/${query._id}`, {
        method: 'POST',
        body: JSON.stringify({
          email: query.email,
          name: query.name,
          response: response
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Query resolved and email sent!');
    } catch (error) {
      console.error('Error processing query:', error);
    }
  };

  const handleAutoResolve = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/queries/auto-resolve/${query._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      const updatedQueries = queries.map((q) =>
        q._id === query._id ? { ...q, status: 'auto-resolved', response: data.response } : q
      );
      setQueries(updatedQueries);

      alert('Query auto-resolved and email sent!');
    } catch (error) {
      console.error('Error auto-resolving query:', error);
    }
  };

  const handleDeleteQuery = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/queries/${id}`, { method: 'DELETE' });
      setQueries(queries.filter(query => query._id !== id));
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div><Navbar />
      <div style={{ padding: '20px', marginLeft: '240px' }}>
        <h2>Submitted Queries</h2>

        {queries.length === 0 ? (
          <p>No queries found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Message</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Response</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayQueries.map((query) => (
                <tr key={query._id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{query.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{query.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{query.message}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {query.status === 'resolved'
                    ? 'Resolved'
                    : query.status === 'auto-resolved'
                    ? 'Auto-Resolved'
                    : 'Pending'}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {query.status === 'resolved' ? (
                      <div>{query.response}</div>
                    ) : (
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Write your response here"
                      />
                    )}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {query.status?.toLowerCase() === 'pending' && (
                      <>
                        <button onClick={() => handleMarkAsResolved(query)}>
                          Mark as Resolved
                        </button>
                        <button onClick={() => handleAutoResolve(query)}>
                          Auto-Resolve
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDeleteQuery(query._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

<div style={{ marginBottom: '2rem' }}>
  <h3>Query Statistics</h3>
  <p>Total Queries: {queries.length}</p>
  <p>Resolved: {queries.filter(q => q.status === 'resolved').length}</p>
  <p>Pending: {queries.filter(q => q.status !== 'resolved').length}</p>
  <p>Auto-Resolved: {queries.filter(q => q.status === 'auto-resolved').length}</p>
  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
    {/* Pie Chart: Resolved vs Pending */}
    <div style={{ width: '300px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: 'Resolved', value: queries.filter(q => q.status === 'resolved').length },
              { name: 'Auto-Resolved', value: queries.filter(q => q.status === 'auto-resolved').length },
              { name: 'Pending', value: queries.filter(q => q.status !== 'resolved').length }
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            <Cell fill="#82ca9d" />
            <Cell fill="#f39c12" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Bar Chart: Auto vs Manual Resolved */}
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            {
              name: 'Auto-Resolved',
              count: queries.filter(q => q.status === 'auto-resolved' && q.response?.toLowerCase().includes('automated')).length
            },
            {
              name: 'Manually Resolved',
              count: queries.filter(q => q.status === 'resolved' && !q.response?.toLowerCase().includes('automated')).length
            }
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3498db" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default QueriesPage;
