// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [subsrptnData, setSubsrptnData] = useState([]);
  const [ocsStatusData, setOcsStatusData] = useState([]);
  const [nokiaNetworkData, setNokiaNetworkData] = useState([]);
  const [networkSwitchData, setNetworkSwitchData] = useState([]);
  const [postMigrationData, setPostMigrationData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [postMigrationStatusData, setPostMigrationStatusData] = useState([]);

  useEffect(() => {
    // Fetch subsrptn_id data from the API
    const fetchSubsrptnData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        const count = response.data[0].count;
        setSubsrptnData([{ name: 'Subsrptn ID Count', value: parseInt(count, 10) }]);
      } catch (error) {
        console.error('Error fetching subsrptn_id data:', error.message);
      }
    };

    // Fetch ocs_status data from the API
    const fetchOcsStatusData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ocs_status');
        const data = [
          { name: 'Failed', value: response.data.failed },
          { name: 'Passed', value: response.data.passed }
        ];
        setOcsStatusData(data);
      } catch (error) {
        console.error('Error fetching ocs_status data:', error.message);
      }
    };

    // Fetch nokia_network data from the API
    const fetchNokiaNetworkData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/nokia_network');
        const data = [
          { name: 'Failed', value: response.data.failed },
          { name: 'Passed', value: response.data.passed }
        ];
        setNokiaNetworkData(data);
      } catch (error) {
        console.error('Error fetching nokia_network data:', error.message);
      }
    };

    // Fetch network_switch data from the API
    const fetchNetworkSwitchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/network_switch');
        const data = [
          { name: 'Failed', value: response.data.failed },
          { name: 'Passed', value: response.data.passed }
        ];
        setNetworkSwitchData(data);
      } catch (error) {
        console.error('Error fetching network_switch data:', error.message);
      }
    };

    // Fetch post_migration data from the API
    const fetchPostMigrationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/post_migration');
        const data = [
          { name: 'Failed', value: response.data.failed },
          { name: 'Passed', value: response.data.passed }
        ];
        setPostMigrationData(data);
        setPostMigrationStatusData(data); // Set post migration status data
      } catch (error) {
        console.error('Error fetching post_migration data:', error.message);
      }
    };

    fetchSubsrptnData();
    fetchOcsStatusData();
    fetchNokiaNetworkData();
    fetchNetworkSwitchData();
    fetchPostMigrationData();
  }, []);

  useEffect(() => {
    const createComparisonData = () => {
      const subsrptnCount = subsrptnData.find(d => d.name === 'Subsrptn ID Count')?.value || 0;
      const postMigrationPassed = postMigrationData.find(d => d.name === 'Passed')?.value || 0;
      const postMigrationFailed = postMigrationData.find(d => d.name === 'Failed')?.value || 0;

      setComparisonData([
        { name: 'Subsrptn Passed', value: subsrptnCount },
        { name: 'Post Migration Passed', value: postMigrationPassed },
        { name: 'Post Migration Failed', value: postMigrationFailed }
      ]);
    };

    createComparisonData();
  }, [subsrptnData, postMigrationData]);

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="chart-container">
        <div className="chart-item">
          <h3>Bi feed Data</h3>
          {subsrptnData.length > 0 ? (
            <BarChart width={600} height={300} data={subsrptnData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          ) : (
            <p>Loading subsrptn ID data...</p>
          )}
        </div>

        <div className="chart-item">
          <h3>OCS Status Data</h3>
          {ocsStatusData.length > 0 ? (
            <BarChart width={600} height={300} data={ocsStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="OCS Status" fill="#82ca9d" />
            </BarChart>
          ) : (
            <p>Loading OCS status data...</p>
          )}
        </div>

        <div className="chart-item">
          <h3>Nokia Network Status</h3>
          {nokiaNetworkData.length > 0 ? (
            <BarChart width={600} height={300} data={nokiaNetworkData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Nokia Network Status" fill="#FF0000" />
            </BarChart>
          ) : (
            <p>Loading Nokia Network data...</p>
          )}
        </div>

        <div className="chart-item">
          <h3>Network Switch Status</h3>
          {networkSwitchData.length > 0 ? (
            <BarChart width={600} height={300} data={networkSwitchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Network Switch Status" fill="#FF4500" />
            </BarChart>
          ) : (
            <p>Loading Network Switch data...</p>
          )}
        </div>

        <div className="chart-item">
          <h3>Post Migration Status</h3>
          {postMigrationStatusData.length > 0 ? (
            <BarChart width={600} height={300} data={postMigrationStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Post Migration Status" fill="#4CAF50" />
            </BarChart>
          ) : (
            <p>Loading Post Migration data...</p>
          )}
        </div>

        <div className="chart-item">
          <h3>Comparison of Subsrptn ID and Post Migration Data</h3>
          {comparisonData.length > 0 ? (
            <BarChart width={600} height={300} data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Comparison Data" fill="#0377fc" /> {/* Updated color */}
            </BarChart>
          ) : (
            <p>Loading comparison data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


