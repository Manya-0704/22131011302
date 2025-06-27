import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { logAction } from '../middleware/logger';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const UrlShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 7); // 5-char random
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!isValidUrl(longUrl)) {
      setError('Invalid URL format');
      logAction('validation_error', { longUrl });
      return;
    }

    const code = shortcode.trim() !== '' ? shortcode.trim() : generateCode();
    const stored = JSON.parse(localStorage.getItem('shortUrls') || '[]');

    if (stored.some((entry) => entry.shortcode === code)) {
      setError('Shortcode already exists');
      logAction('shortcode_collision', { shortcode: code });
      return;
    }

    const now = new Date();
    const validMinutes = validity.trim() !== '' ? parseInt(validity) : 30;
    const expiresAt = new Date(now.getTime() + validMinutes * 60000);

    const newEntry = {
      longUrl,
      shortcode: code,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      clickCount: 0,
      clickLogs: [],
    };

    stored.push(newEntry);
    localStorage.setItem('shortUrls', JSON.stringify(stored));

    const finalShortUrl = `http://localhost:3000/${code}`;
    setShortUrl(finalShortUrl);
    logAction('url_shortened', newEntry);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        fullWidth
        label="Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Custom Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Validity (minutes, optional)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        type="number"
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Shorten URL
      </Button>

      {shortUrl && (
        <Box mt={3}>
          <Typography variant="h6">Shortened URL:</Typography>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </Box>
      )}
    </Box>
  );
};

export default UrlShortenerForm;
