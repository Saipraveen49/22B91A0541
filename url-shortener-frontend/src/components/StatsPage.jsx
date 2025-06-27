import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';

const StatsPage = () => {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setError('');
    setStats(null);
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5050/shorturls/${code}`);
      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: '16px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          📊 URL Stats
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Enter Shortcode"
            variant="outlined"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={loading || !code}
            onClick={fetchStats}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Get Stats'}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {stats && (
          <>
            <Typography><strong>Original URL:</strong> {stats.originalUrl}</Typography>
            <Typography><strong>Shortcode:</strong> {stats.shortcode}</Typography>
            <Typography><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Expires At:</strong> {new Date(stats.expiry).toLocaleString()}</Typography>
            <Typography><strong>Total Clicks:</strong> {stats.totalClicks}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Click Log:</Typography>
            {stats.clickData.length === 0 ? (
              <Typography>No clicks recorded yet.</Typography>
            ) : (
              stats.clickData.map((click, idx) => (
                <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                  • {new Date(click.timestamp).toLocaleString()} — {click.referrer} from {click.location}
                </Typography>
              ))
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default StatsPage;
