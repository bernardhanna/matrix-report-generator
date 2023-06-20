/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:21:01
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-15 14:23:56
 */
import React from 'react';
import Divider from '@mui/material/Divider';

const PluginUpdates = ({ pluginUpdates }) => {
  return (
    <div className="plugin-updates" style={{ marginTop: '4em', marginBottom: '4em' }}>
      <h2>Plugin Updates</h2>
      <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
      {pluginUpdates.length > 0 ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div style={{ fontWeight: 'bold' }}>Name</div>
            <div style={{ fontWeight: 'bold' }}>Previous Version</div>
            <div style={{ fontWeight: 'bold' }}>Latest Version</div>
            {pluginUpdates.map((plugin) => (
              <React.Fragment key={plugin.slug}>
                <div style={{ marginTop: '1em', marginBottom: '1em' }}>{plugin.name}</div>
                <div style={{ marginTop: '1em', marginBottom: '1em' }}>{plugin.current_version}</div>
                <div style={{ marginTop: '1em', marginBottom: '1em' }}>{plugin.latest_version}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <p>No plugin updates available.</p>
      )}
    </div>
  );
};

export default PluginUpdates;
