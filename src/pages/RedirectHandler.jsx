import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { logAction } from '../middleware/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem('shortUrls') || '[]');
    const entry = allData.find(e => e.shortcode === shortcode);

    if (entry) {
      // Log the click
      const click = {
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'Direct',
        location: 'India', // mock location
      };

      entry.clickLogs = entry.clickLogs || [];
      entry.clickLogs.push(click);
      entry.clickCount = (entry.clickCount || 0) + 1;

      // Save back
      localStorage.setItem('shortUrls', JSON.stringify(allData));

      // Log action
      logAction('url_clicked', { shortcode, ...click });

      // Redirect
      window.location.href = entry.longUrl;
    } else {
      alert('Short URL not found or expired.');
      logAction('redirect_failed', { shortcode });
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
