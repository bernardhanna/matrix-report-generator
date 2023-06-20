/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-12 15:11:17
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-20 12:14:14
 */
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const psi = require('psi');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

let accessToken = fs.readFileSync('token.txt', 'utf8');

function saveAccessToken(accessToken) {
  fs.writeFile('token.txt', accessToken, (err) => {
    if (err) {
      console.error('Error writing access token to file:', err);
    } else {
      console.log('Access token saved successfully');
    }
  });
}

async function refreshAccessToken() {
  try {
    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        refresh_token: process.env.REFRESH_TOKEN,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });

    if (response.data.access_token) {
      accessToken = response.data.access_token;
      console.log('Access token refreshed successfully');
      saveAccessToken(accessToken);
    } else {
      throw new Error('Access token not found in response');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

// Refresh the access token immediately, then every 30 minutes
refreshAccessToken();
setInterval(refreshAccessToken, 30 * 60 * 1000);

async function handleApiRequest(url, res) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json; version=2.0',
        'Authorization': `Zoho-oauthtoken ${accessToken}`
      }
    });

    if (response.data.error_code === 1001) {
      await refreshAccessToken();
      return handleApiRequest(url, res);
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}

app.post('/api/generate-pdf', (req, res) => {
  const doc = new PDFDocument();

  // Set appropriate headers for the response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

  // Pipe the PDF document directly to the response
  doc.pipe(res);

  // Generate the PDF content
  doc.text('Hello, world!');

  // Finalize the PDF and end the response
  doc.end();
});

app.get('/api/psi', async (req, res) => {
  const url = req.query.url;
  const strategy = req.query.strategy;

  const options = {
    strategy: strategy === 'desktop' ? 'desktop' : 'mobile',
  };

  const { data } = await psi(url, options);

  if (!data || !data.lighthouseResult || !data.lighthouseResult.categories) {
    return res.status(500).json({ error: 'Unexpected response structure' });
  }

  const performanceScore = data.lighthouseResult.categories.performance
    ? data.lighthouseResult.categories.performance.score * 100
    : null;

  res.json({ performanceScore });
});
// Define API routes

app.get('/api/reports/performance/:id', (req, res) => {
  const url = `https://www.site24x7.com/api/reports/performance/${req.params.id}?period=4`;
  handleApiRequest(url, res);
});


app.get('/api/reports/summary/:id', (req, res) => {
  const url = `https://www.site24x7.com/api/reports/summary/${req.params.id}?period=4`;
  handleApiRequest(url, res);
});

app.get('/api/reports/availability_summary/:id', (req, res) => {
  const url = `https://www.site24x7.com/api/reports/availability_summary/${req.params.id}?period=4`;
  handleApiRequest(url, res);
});

app.get('/api/reports/trend/:id', (req, res) => {
  const url = `https://www.site24x7.com/api/reports/trend/${req.params.id}`;
  handleApiRequest(url, res);
});

app.get('/api/reports/outage/:id', (req, res) => {
  const url = `https://www.site24x7.com/api/reports/outage/${req.params.id}`;
  handleApiRequest(url, res);
});

app.get('/api/reports/current_status/:id', (req, res) => {
  const url = `https://www.site24x7.com/api/current_status/${req.params.id}`;
  handleApiRequest(url, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});