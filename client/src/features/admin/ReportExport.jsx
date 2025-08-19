import React, { useState } from 'react';
import axios from 'axios';

const ReportExport = () => {
  const [reportType, setReportType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    if (!reportType) {
      setError('Please select a report type.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/admin/reports/${reportType}`, {
        responseType: 'blob', // Important for downloading files
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}-report.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export report. Please try again.');
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Export Reports</h2>
      <div className="mb-4">
        <label htmlFor="reportType" className="block text-gray-700 text-sm font-bold mb-2">
          Select Report Type:
        </label>
        <select
          id="reportType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="users">Users Report</option>
          <option value="courses">Courses Report</option>
          <option value="enrollments">Enrollments Report</option>
          {/* Add more report types as needed */}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        onClick={handleExport}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Exporting...' : 'Export CSV'}
      </button>
    </div>
  );
};

export default ReportExport;
