import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import bandRoutes from './routes/band.routes';
import rehearsalRoutes from './routes/rehearsal.routes';
import setlistRoutes from './routes/setlist.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Redis Client
const redisClient = createClient({
  url: process.env.REDIS_URL
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Make Prisma and Redis available in request
app.use((req: any, res, next) => {
  req.prisma = prisma;
  req.redis = redisClient;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/rehearsals', rehearsalRoutes);
app.use('/api/setlists', setlistRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Socket.IO middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  // Verify token logic would go here
  next();
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join band room
  socket.on('join-band', (bandId) => {
    socket.join(`band-${bandId}`);
    console.log(`Socket ${socket.id} joined band-${bandId}`);
  });

  // Leave band room
  socket.on('leave-band', (bandId) => {
    socket.leave(`band-${bandId}`);
    console.log(`Socket ${socket.id} left band-${bandId}`);
  });

  // Join rehearsal room
  socket.on('join-rehearsal', (rehearsalId) => {
    socket.join(`rehearsal-${rehearsalId}`);
    console.log(`Socket ${socket.id} joined rehearsal-${rehearsalId}`);
  });

  // Leave rehearsal room
  socket.on('leave-rehearsal', (rehearsalId) => {
    socket.leave(`rehearsal-${rehearsalId}`);
    console.log(`Socket ${socket.id} left rehearsal-${rehearsalId}`);
  });

  // Handle availability update
  socket.on('update-availability', (data) => {
    io.to(`rehearsal-${data.rehearsalId}`).emit('availability-updated', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Don't crash the server on unhandled rejections
});

// Close Prisma and Redis on exit
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  await redisClient.disconnect();
  process.exit(0);
});

export default server;