/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:20:23
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-15 12:44:53
 */
import React, { useRef, useEffect } from 'react';
import Divider from '@mui/material/Divider';

const Summary = ({ summaryText, setSummaryText }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [summaryText]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSummaryTextChange = (event) => {
    setSummaryText(event.target.value);
  };

  return (
    <div className="summary">
      <h2>Summary</h2>
      <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
      <textarea
        ref={textareaRef}
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          marginBottom: '2em',
          resize: 'none',
          overflow: 'hidden',
          minHeight: '15em',
        }}
        value={summaryText}
        onChange={handleSummaryTextChange}
        onInput={adjustTextareaHeight}
      />
    </div>
  );
};

export default Summary;
