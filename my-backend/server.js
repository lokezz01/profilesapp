const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'Mito',
  host: 'mito-acc-dev-database-1.cluster-cnois2a80ypk.us-east-1.rds.amazonaws.com',
  database: 'Mito',
  password: 'rcNciG2KcHkT2RBv6Plb',
  port: 5432,
});

// Basic route for subsrptn_id data
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT count(*) FROM circle.dailyfeed');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Server Error');
    }
});

// Route for ocs_status data
app.get('/api/ocs_status', async (req, res) => {
  try {
      const failedResult = await pool.query("SELECT count(ocs_status) as failed_count FROM circle.ocs_details WHERE ocs_status = 'Failed';");
      const passedResult = await pool.query("SELECT count(ocs_status) as passed_count FROM circle.ocs_details WHERE ocs_status = 'Passed';");

      const result = {
          failed: failedResult.rows[0].failed_count,
          passed: passedResult.rows[0].passed_count
      };

      res.json(result);
  } catch (error) {
      console.error('Error executing query:', error.message);
      res.status(500).send('Server Error');
  }
});

// Route for nokia_network data
app.get('/api/nokia_network', async (req, res) => {
  try {
      const passedResult = await pool.query("SELECT count(nokia_status) as passed_count FROM circle.nokia_network WHERE nokia_status = 'Passed';");
      const failedResult = await pool.query("SELECT count(nokia_status) as failed_count FROM circle.nokia_network WHERE nokia_status = 'Failed';");

      const result = {
          passed: passedResult.rows[0].passed_count,
          failed: failedResult.rows[0].failed_count
      };

      res.json(result);
  } catch (error) {
      console.error('Error executing query:', error.message);
      res.status(500).send('Server Error');
  }
});

// Route for network_switch status
app.get('/api/network_switch', async (req, res) => {
  try {
      const passedResult = await pool.query("SELECT count(*) as passed_count FROM circle.nokia_switch WHERE nokia_switch_status = 'Passed';");
      const failedResult = await pool.query("SELECT count(*) as failed_count FROM circle.nokia_switch WHERE nokia_switch_status = 'Failed';");

      const result = {
          passed: passedResult.rows[0].passed_count,
          failed: failedResult.rows[0].failed_count
      };

      res.json(result);
  } catch (error) {
      console.error('Error executing query:', error.message);
      res.status(500).send('Server Error');
  }
});

// New route for post_migration status
app.get('/api/post_migration', async (req, res) => {
  try {
      const passedResult = await pool.query("SELECT count(*) as passed_count FROM circle.post_migration WHERE post_migration_status = 'Passed';");
      const failedResult = await pool.query("SELECT count(*) as failed_count FROM circle.post_migration WHERE post_migration_status = 'Failed';");

      const result = {
          passed: passedResult.rows[0].passed_count,
          failed: failedResult.rows[0].failed_count
      };

      res.json(result);
  } catch (error) {
      console.error('Error executing query:', error.message);
      res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
