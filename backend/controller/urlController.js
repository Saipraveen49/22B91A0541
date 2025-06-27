import ShortUrl from '../models/ShortUrl.js';
import generateShortCode from '../utils/generateShortCode.js';
import geoip from 'geoip-lite';

const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
      console.log("Hit createShortUrl ✅", req.body);
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const code = shortcode || generateShortCode();
  const expiry = new Date(Date.now() + validity * 60000);

  const existing = await ShortUrl.findOne({ shortcode: code });
  if (existing) return res.status(400).json({ error: 'Shortcode already taken' });

  const newUrl = await ShortUrl.create({
    originalUrl: url,
    shortcode: code,
    expiry,
  });

  res.status(201).json({
    shortLink: `http://${req.hostname}:${process.env.PORT}/${code}`,
    expiry: expiry.toISOString(),
  });
};

const redirectShortUrl = async (req, res) => {
  const { code } = req.params;
  const urlDoc = await ShortUrl.findOne({ shortcode: code });

  if (!urlDoc) return res.status(404).send('Short URL not found');
  if (new Date() > urlDoc.expiry) return res.status(410).send('Link expired');

  const location = geoip.lookup(req.ip)?.city || 'Unknown';
  const referrer = req.get('Referrer') || 'Direct';

  urlDoc.clicks.push({ timestamp: new Date(), referrer, location });
  urlDoc.clickCount += 1;
  await urlDoc.save();

  res.redirect(urlDoc.originalUrl);
};

const getShortUrlStats = async (req, res) => {
  const { code } = req.params;
  const urlDoc = await ShortUrl.findOne({ shortcode: code });

  if (!urlDoc) return res.status(404).json({ error: 'Shortcode not found' });

  res.json({
    originalUrl: urlDoc.originalUrl,
    shortcode: urlDoc.shortcode,
    createdAt: urlDoc.createdAt,
    expiry: urlDoc.expiry,
    totalClicks: urlDoc.clickCount,
    clickData: urlDoc.clicks,
  });
};


export {createShortUrl, redirectShortUrl, getShortUrlStats};