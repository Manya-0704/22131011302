import React, { useState } from 'react';
import { Container, Typography, Box, Snackbar, Alert, Button } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import logger from '../middleware/logger';
import { getUrls } from '../utils/storage';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleShorten = (newUrls) => {
    setResults(newUrls);
    logger.info('Shortened URLs created', { count: newUrls.length });
  };

  const handleError = (msg) => {
    setError(msg);
    logger.error('Shortener error', { msg });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Typography variant="body1" gutterBottom>
        Shorten up to 5 URLs at once. Optionally set validity (minutes) and custom shortcode.
      </Typography>
      <Box my={3}>
        <UrlShortenerForm onShorten={handleShorten} onError={handleError} />
      </Box>
      {results.length > 0 && (
        <Box my={3}>
          <Typography variant="h6">Shortened URLs</Typography>
          {results.map((r, i) => (
            <Box key={i} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
              <Typography><b>Original:</b> {r.longUrl}</Typography>
              <Typography><b>Short URL:</b> <a href={`/${r.shortcode}`}>{window.location.origin}/{r.shortcode}</a></Typography>
              <Typography><b>Expires At:</b> {new Date(r.expiresAt).toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
      <Box mt={4}>
        <Button variant="outlined" href="/stats">View Statistics</Button>
      </Box>
    </Container>
  );
};

export default HomePage;
