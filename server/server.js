import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import expertRoutes from './routes/expertRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const rawClientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const allowedOrigins = rawClientUrl
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    const normalized = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }
    if (process.env.VERCEL && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalized)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/experts', expertRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

export default app;
