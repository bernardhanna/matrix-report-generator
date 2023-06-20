/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-12 15:10:14
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-20 13:05:45
 */
import React, { useEffect, useState, useRef } from 'react';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { onAuthStateChanged, setPersistence, signInWithPopup, browserLocalPersistence, signOut } from 'firebase/auth';
import { auth } from './firebase'; // import auth object from firebase.js
import axios from 'axios';
import moment from 'moment';
import monitorMap from './monitorMap';
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from './components/Header';
import Summary from './components/Summary';
import Information from './components/Information';
import PluginUpdates from './components/PluginUpdates';
import MonthlySupportQA from './components/MonthlySupportQA';
import { Grid, Paper, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import PerformanceGrades from './components/PerformanceGrades';
import SummaryReport from './components/SummaryReport';
import PerformanceReport from './components/PerformanceReport';
import CurrentStatus from './components/CurrentStatus';

const provider = new GoogleAuthProvider();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const componentRef = useRef();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [monitor, setMonitor] = useState('');
  const [newMonitorId, setNewMonitorId] = useState('');
  const [wpVersion, setWPVersion] = useState(''); // State for the WP version
  const [summaryText, setSummaryText] = useState(`As part of our Support SLA, your website has been successfully updated and secured this month.\n\nUpdates and patches to the Core Software pack have been identified, applied and debugged. The core WordPress system has been updated and the practical and functionality of the website and all the plugins have been verified.\n\nThe website has been fully scanned for malware and the result is clean, the website is healthy.\n\nThe website is monitored by tracking the response time and performance from more than 50 locations globally. You will find below the performance report giving you details about the average response time, overall availability, and number of downtimes.\n\nThe count of hours for this update is 6h`);
  const startDate = moment().subtract(30, 'days').format('DD/MM/YY');
  const currentDate = moment().format('DD/MM/YYYY');
  const endDate = moment().format('DD/MM/YY');
  const dateRange = `Dates ${startDate} - ${endDate}`;
  const [contactName, setContactName] = useState('');
  const [pluginUpdates, setPluginUpdates] = useState([]);
  const [pagesCheckedOnDesktop, setPagesCheckedOnDesktop] = useState('Yes');
  const [pagesCheckedOnMobile, setPagesCheckedOnMobile] = useState('Yes');
  const [pagesCheckedOnCommerce, setPagesCheckedOnCommerce] = useState('Yes');
  const [searchFunctionWorks, setSearchFunctionWorks] = useState('Yes');
  const [malwareFunctionWorks, setMalwareFunctionWorks] = useState('No');
  const [blacklistFunctionWorks, setBlacklistFunctionWorks] = useState('No');
  const [uptimeFunctionWorks, setUptimeFunctionWorks] = useState('No');
  const [spamFunctionWorks, setSpamFunctionWorks] = useState('No');
  const [defaceFunctionWorks, setDefaceFunctionWorks] = useState('No');
  const [serverErrorFunctionWorks, setServerErrorFunctionWorks] = useState('No');
  const [overallFunctionWorks, setOverallFunctionWorks] = useState('No');
  const [ecommerce, setEcommerce] = useState('no'); // New state variable for eCommerce selection
  const [performanceData, setPerformanceData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [availabilitySummaryData, setAvailabilitySummaryData] = useState(null);
  const [healthTrendData, setHealthTrendData] = useState(null);
  const [currentStatusData, setCurrentStatusData] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const auth = getAuth(); // Move the `auth` declaration here
    const setUserAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        onAuthStateChanged(auth, (user) => {
          setUser(user); // set user state here
          setLoading(false); // authentication state resolved, stop showing loading indicator
        });
      } catch (error) {
        console.log(error);
      }
    };

    setUserAuth();
  }, []); // <-- Dependencies array is empty

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  useEffect(() => {
    // Whenever the user changes, save it to local storage
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (monitor) {
      fetchSummaryData();
      fetchPerformanceData();
      fetchAvailabilitySummaryData();
      fetchHealthTrendData();
      fetchCurrentStatusData();
    }
  }, [monitor]);

  useEffect(() => {
    if (websiteUrl) {
      fetchPluginUpdates();
    }
  }, [websiteUrl]);


  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Check if the user's email contains "@matrixinternet.ie"
      if (result.user.email.includes("@matrixinternet.ie")) {
        setUser(result.user);
      } else {
        // If it doesn't, sign them out
        await signOut(auth);
        alert("Only @matrixinternet.ie email addresses are allowed.");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Check if the user's email contains "@matrixinternet.ie"
      if (result.user.email.includes("@matrixinternet.ie")) {
        setUser(result.user);
      } else {
        // If it doesn't, sign them out
        await auth.signOut();
        alert("Only @matrixinternet.ie email addresses are allowed.");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);


  function handleWebsiteUrlChange(event) {
    const newWebsiteUrl = event.target.value;
    setWebsiteUrl(newWebsiteUrl);

    // Look up the monitor ID in the map and update the state
    const newMonitorId = monitorMap[newWebsiteUrl];

    if (newMonitorId) {
      console.log(`Setting monitor ID to ${newMonitorId} for URL ${newWebsiteUrl}`);
      setMonitor(newMonitorId);
    } else {
      // Handle the case where the URL isn't found in the map
      console.warn(`No monitor ID found for URL: ${newWebsiteUrl}`);
      setMonitor('');  // or some default value, or leave it as the previous monitor ID
    }
  }
  const handleMonitorChange = (event) => {
    setMonitor(event.target.value);
  };

  const handlePagesCheckedOnDesktopChange = (event) => {
    setPagesCheckedOnDesktop(event.target.value);
  };

  const handlePagesCheckedOnMobileChange = (event) => {
    setPagesCheckedOnMobile(event.target.value);
  };

  const handlePagesCheckedOnCommerceChange = (event) => {
    setPagesCheckedOnCommerce(event.target.value);
  };

  const handleSearchFunctionWorksChange = (event) => {
    setSearchFunctionWorks(event.target.value);
  };

  const handleMalwareFunctionWorksChange = (event) => {
    setMalwareFunctionWorks(event.target.value);
  };

  const handleBlacklistFunctionWorksChange = (event) => {
    setBlacklistFunctionWorks(event.target.value);
  };

  const handleSpamFunctionWorksChange = (event) => {
    setSpamFunctionWorks(event.target.value);
  };

  const handleDefaceFunctionWorksChange = (event) => {
    setDefaceFunctionWorks(event.target.value);
  };

  const handleServerErrorFunctionWorksChange = (event) => {
    setServerErrorFunctionWorks(event.target.value);
  };

  const handleOverallFunctionWorksChange = (event) => {
    setOverallFunctionWorks(event.target.value);
  };

  const handleEcommerceChange = (event) => {
    setEcommerce(event.target.value);
  };

  const fetchPluginUpdates = async () => {
    try {
      const response = await axios.get(`${websiteUrl}/wp-json/matrix-update-helper/v1/plugin-updates`);
      setPluginUpdates(response.data);
    } catch (error) {
      console.error('Error fetching plugin updates:', error);
    }
  };

  const fetchSummaryData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/summary/${monitor}`);
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      console.error('Error fetching summary data:', error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/performance/${monitor}`);
      const data = await response.json();
      setPerformanceData(data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const fetchAvailabilitySummaryData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/availability_summary/${monitor}`);
      const data = await response.json();
      setAvailabilitySummaryData(data);
    } catch (error) {
      console.error('Error fetching availabilitySummary data:', error);
    }
  };

  const fetchHealthTrendData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/trend/${monitor}`);
      const data = await response.json();
      setHealthTrendData(data);
    } catch (error) {
      console.error('Error fetching healthTrend data:', error);
    }
  };

  const fetchCurrentStatusData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/current_status/${monitor}`);
      const data = await response.json();
      setCurrentStatusData(data);
    } catch (error) {
      console.error('Error fetching global data:', error);
    }
  };

  const handleExportPDF = () => {
    const input = componentRef.current;

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        const websiteUrlWithoutProtocol = websiteUrl.replace(/(^\w+:|^)\/\//, ''); // Remove protocol from websiteUrl
        const websiteName = websiteUrlWithoutProtocol;

        const month = new Date().toLocaleString('default', { month: 'long' }); // Get current month

        const filename = `${websiteName}-${month}-report.pdf`; // Construct the file name

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
      });
    }
  };

  if (initializing) {
    return <div>Loading...</div>; // Show a loading indicator while authentication state is being initialized
  }

  if (!user) {
    return (
      <div className="App" style={{ maxWidth: '100%', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Matrix Report Generator</h1>
          <h2>Sign in to view reports</h2>
          <Button variant="contained" onClick={signIn}>Sign in with Google</Button>
        </div>
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9} id="clientReport">
        {websiteUrl ? (
          <Paper>
            <div style={{ width: '100%', maxWidth: '80%', margin: 'auto', paddingTop: '5em', paddingBottom: '5em' }} ref={componentRef}>
              <Header websiteUrl={websiteUrl} />
              <Summary summaryText={summaryText} setSummaryText={setSummaryText} />
              <Information websiteUrl={websiteUrl} currentDate={currentDate} wpVersion={wpVersion} />
              <PluginUpdates pluginUpdates={pluginUpdates} />
              <MonthlySupportQA
                ecommerce={ecommerce}
                handlePagesCheckedOnDesktopChange={handlePagesCheckedOnDesktopChange}
                handlePagesCheckedOnMobileChange={handlePagesCheckedOnMobileChange}
                handlePagesCheckedOnCommerceChange={handlePagesCheckedOnCommerceChange}
                handleSearchFunctionWorksChange={handleSearchFunctionWorksChange}
                handleMalwareFunctionWorksChange={handleMalwareFunctionWorksChange}
                handleBlacklistFunctionWorksChange={handleBlacklistFunctionWorksChange}
                handleSpamFunctionWorksChange={handleSpamFunctionWorksChange}
                handleDefaceFunctionWorksChange={handleDefaceFunctionWorksChange}
                handleServerErrorFunctionWorksChange={handleServerErrorFunctionWorksChange}
                handleOverallFunctionWorksChange={handleOverallFunctionWorksChange}
                pagesCheckedOnDesktop={pagesCheckedOnDesktop}
                pagesCheckedOnMobile={pagesCheckedOnMobile}
                pagesCheckedOnCommerce={pagesCheckedOnCommerce}
                searchFunctionWorks={searchFunctionWorks}
                malwareFunctionWorks={malwareFunctionWorks}
                blacklistFunctionWorks={blacklistFunctionWorks}
                spamFunctionWorks={spamFunctionWorks}
                defaceFunctionWorks={defaceFunctionWorks}
                serverErrorFunctionWorks={serverErrorFunctionWorks}
                overallFunctionWorks={overallFunctionWorks}
              />
              <SummaryReport summaryData={summaryData} />
              <PerformanceReport performanceData={performanceData} />
              <CurrentStatus currentStatusData={currentStatusData} />
              <PerformanceGrades url={websiteUrl} />
              <pre>{/*JSON.stringify(performanceData, null, 2)*/}</pre>
            </div>
          </Paper>
        ) : (
          <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2>Please enter a website URL to view the client report.</h2>
          </div>
        )}
      </Grid>
      <Grid item xs={3} id="controlPanel">
        <div style={{ padding: '1em' }}>
          {user ? (
            <div>
              <p>Welcome, {user.displayName}</p>
              <Button variant="contained" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div>
              <p>Not signed in</p>
              <Button variant="contained" onClick={handleSignIn}>
                Sign In
              </Button>
            </div>
          )}
          <div style={{ marginTop: '2em' }}>
            <h4>Enter Website URL:</h4>
            <TextField
              style={{ width: '90%' }}
              type="text"
              value={websiteUrl}
              onChange={handleWebsiteUrlChange}
            />
          </div>

          <div style={{ display: 'none' }}>
            <h4>Enter Monitor ID:</h4>
            <TextField
              style={{ width: '90%' }}
              type="text"
              value={monitor}
              onChange={handleMonitorChange}
            />
          </div>

          <div>
            <h4>Is this an eCommerce website?</h4>
            <Switch
              checked={ecommerce === 'yes'}
              onChange={(event) => setEcommerce(event.target.checked ? 'yes' : 'no')}
              color="primary"
            />
          </div>
          <div style={{ marginTop: '2em' }}>
            <Button variant="contained" onClick={handleExportPDF}>
              Export as PDF
            </Button>
          </div>
          <div style={{ marginTop: '2em' }}>
            <ReactToPrint
              trigger={() => (
                <Button variant="contained">
                  Print Report
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
          <p>Below buttons not implemented</p>
          <div style={{ marginTop: '2em' }}>
            <Button variant="contained">
              Send to Client
            </Button>
          </div>
          <div style={{ marginTop: '2em' }}>
            <Button variant="contained">
              Save to Google Drive
            </Button>
          </div>
        </div>
      </Grid>
    </Grid >
  );
}

export default App;