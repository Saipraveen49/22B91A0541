import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import router from './routes/urlRoutes.js';
import customLogger from './middlewares/customLogger.js'; 

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(customLogger);
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});
connectDB();
app.post('/ping', (req, res) => {
  console.log('✅ Ping hit');
  res.send('pong');
});

app.get("/", (req, res) => {
  res.send("Welcome to URL Shortener API");
}); 

app.use('/', router);



app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
