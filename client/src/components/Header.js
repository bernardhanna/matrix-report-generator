/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:20:01
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-19 11:32:12
 */
import React, { useEffect, useState } from 'react';
import { ReactComponent as MatrixLogo } from '../matrix-logo.svg';
import moment from 'moment';
import axios from 'axios';

const Header = ({ websiteUrl }) => {
  const [clientLogo, setClientLogo] = useState('');
  const [contactName, setContactName] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [wpVersion, setWPVersion] = useState('6.0');

  useEffect(() => {
    (async () => {
      await fetchClientLogo();
    })();
    (async () => {
      await fetchContactName();
    })();
    generateDateRange();
  }, [websiteUrl]);

  const fetchClientLogo = async () => {
    try {
      const response = await axios.get(`${websiteUrl}/wp-json/matrix-update-helper/v1/client-logo`);
      setClientLogo(response.data);
    } catch (error) {
      console.error('Error fetching client logo:', error);
    }
  };

  const fetchContactName = async () => {
    try {
      const response = await axios.get(`${websiteUrl}/wp-json/matrix-update-helper/v1/contact-name`);
      setContactName(response.data);
    } catch (error) {
      console.error('Error fetching contact name:', error);
    }
  };

  const generateDateRange = () => {
    const startDate = moment().subtract(30, 'days').format('DD/MM/YY');
    const endDate = moment().format('DD/MM/YY');
    const range = `Dates ${startDate} - ${endDate}`;
    setDateRange(range);
  };

  const handleWPVersionChange = (event) => {
    setWPVersion(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '100%', textAlign: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '2em', flexDirection: 'row' }}>
        {clientLogo && <img src={clientLogo} alt="Client Logo" style={{ maxWidth: '200px', objectFit: 'contain' }} />}
        <MatrixLogo style={{ maxWidth: '200px', objectFit: 'contain' }} />
      </div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Hi {contactName}</h1>
        <h2 style={{ textAlign: 'center' }}>Here is your monthly update</h2>
      </div>

      <div style={{ maxWidth: '100%', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h4>{dateRange}</h4>
        <h4>
          WP Version
          <input
            style={{ border: 'none', textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}
            type="text"
            value={wpVersion}
            onChange={handleWPVersionChange}
          />
        </h4>
      </div>
    </div>
  );
};

export default Header;
