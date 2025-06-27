import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { logAction } from '../middleware/logger';

const StatsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortUrls') || '[]');
    setUrls(data);
    logAction('stats_loaded', { totalShortened: data.length });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        urls.map((url) => (
          <Card key={url.shortcode} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
                <a href={`http://localhost:3000/${url.shortcode}`} target="_blank" rel="noopener noreferrer">
                  http://localhost:3000/{url.shortcode}
                </a>
              </Typography>
              <Typography variant="body2">Original URL: {url.longUrl}</Typography>
              <Typography variant="body2">
                Created At: {new Date(url.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Expires At: {new Date(url.expiresAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Total Clicks: {url.clickCount || 0}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Click Logs:</Typography>

              {url.clickLogs && url.clickLogs.length > 0 ? (
                <List dense>
                  {url.clickLogs.map((click, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemText
                        primary={`Time: ${new Date(click.timestamp).toLocaleString()}`}
                        secondary={`Referrer: ${click.referrer} | Location: ${click.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No clicks recorded.</Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default StatsPage;
