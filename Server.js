/* eslint-env node */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-interview';
const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';
process.env.JWT_SECRET = jwtSecret;

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const authRoutes = require('./authRoutes');
app.use('/api/auth', authRoutes);

const interviewRoutes = require('./interviewRoutes');
app.use('/api/interview', interviewRoutes);

const resumeRoutes = require('./resumeRoutes');
app.use('/api/resume', resumeRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Interview Platform API is Running! 🚀',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      interviewHistory: 'GET /api/interview/history',
      resumeUpload: 'POST /api/resume/upload' 
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});