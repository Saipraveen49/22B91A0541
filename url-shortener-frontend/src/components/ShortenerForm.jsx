import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShortUrlDisplay from './ShortUrlDisplay';

// Styled Components
const StyledCard = styled(Card)(() => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '24px',
}));

const StyledCardContent = styled(CardContent)(() => ({
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '22px',
  margin: '2px',
  padding: '32px !important',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(248, 250, 252, 1)',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: '#64748b',
  },
}));

const StyledButton = styled(Button)(() => ({
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '16px',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
  },
}));

const ShortenerForm = () => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(60);
  const [shortcode, setShortcode] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortLink('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5050/shorturls', {
        url,
        validity,
        shortcode,
      });
      setShortLink(response.data.shortLink);
      setExpiry(response.data.expiry);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #fdf2f8 100%)',
        padding: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            URL Shortener
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Transform long URLs into short, shareable links
          </Typography>
        </Box>

        <StyledCard>
          <StyledCardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <StyledTextField
                  label="Original URL"
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  fullWidth
                />
                <StyledTextField
                  label="Validity (minutes)"
                  type="number"
                  variant="outlined"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  fullWidth
                />
                <StyledTextField
                  label="Custom Shortcode (optional)"
                  variant="outlined"
                  value={shortcode}
                  onChange={(e) => setShortcode(e.target.value)}
                  fullWidth
                />
                <StyledButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? 'Generating...' : 'Generate Short URL'}
                </StyledButton>
              </Box>
            </form>

            {error && (
              <Alert severity="error" sx={{ mt: 3, borderRadius: '16px' }}>
                {error}
              </Alert>
            )}

            {shortLink && <ShortUrlDisplay shortLink={shortLink} expiry={expiry} />}
          </StyledCardContent>
        </StyledCard>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Secure • Fast • Reliable
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShortenerForm;
