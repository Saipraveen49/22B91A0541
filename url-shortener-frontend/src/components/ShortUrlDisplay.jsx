import React, { useState } from 'react';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ShortUrlDisplay = ({ shortLink, expiry }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <Box p={2} border="1px solid #e5e7eb" borderRadius="16px" bgcolor="#f0f4ff">
      <Typography variant="h6" gutterBottom>
        Your Short URL is Ready 🎉
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={2} flexWrap="wrap">
        <a href={shortLink} target="_blank" rel="noreferrer">
          <Button endIcon={<OpenInNewIcon />} variant="outlined">
            {shortLink}
          </Button>
        </a>

        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
          <Button onClick={copyToClipboard} variant="contained" color="secondary">
            <ContentCopyIcon />
          </Button>
        </Tooltip>
      </Box>

      <Typography variant="body2" color="textSecondary">
        Expires at: {new Date(expiry).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ShortUrlDisplay;
