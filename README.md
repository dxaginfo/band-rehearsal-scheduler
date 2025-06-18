# Band Rehearsal Scheduler

A full-stack web application designed to help bands and music groups efficiently schedule rehearsals, track attendance, manage setlists, and coordinate resources.

## 🎵 Features

- **User Authentication & Band Management**
  - Create and manage band profiles
  - Invite members with role-based permissions
  - Join multiple bands with one account

- **Smart Scheduling**
  - Create rehearsal events with availability polling
  - Suggest optimal rehearsal times based on member availability
  - Integrate with popular calendar services

- **Attendance Tracking**
  - Track attendance for each rehearsal
  - Generate attendance statistics and insights
  - Send automated reminders

- **Setlist Management**
  - Create and assign setlists to rehearsals
  - Track song progress over time
  - Organize songs with drag-and-drop interface

- **Resource Coordination**
  - Manage equipment and venue details
  - Track who's bringing what instruments
  - Ensure all necessary resources are available

- **Notifications & Communication**
  - Send rehearsal reminders and updates
  - Customizable notification preferences
  - In-app messaging for band communication

## 🚀 Technology Stack

### Frontend
- React.js with TypeScript
- Redux for state management
- Material UI components
- FullCalendar.js for calendar views
- Responsive design for all devices

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication
- WebSockets for real-time updates

### Database
- PostgreSQL with Prisma ORM
- Redis for caching and real-time features

### DevOps
- Docker containerization
- CI/CD with GitHub Actions
- AWS deployment (EC2/ECS)
- CloudWatch monitoring

## 📊 System Architecture

The application follows a microservices architecture with the following components:

1. Authentication Service
2. Scheduling Service
3. Notification Service
4. Resource Management Service
5. Analytics Service
6. API Gateway

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL (v13+)
- Redis

### Local Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler.git
   cd band-rehearsal-scheduler
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `server` and `client` directories
   - Configure your database connection, API keys, etc.

4. Run database migrations:
   ```
   cd server
   npm run db:migrate
   ```

5. Start the development servers:
   ```
   # Start backend server
   cd server
   npm run dev

   # In another terminal, start frontend server
   cd client
   npm start
   ```

6. Access the application at `http://localhost:3000`

### Docker Setup

1. Make sure Docker and Docker Compose are installed

2. Build and start the containers:
   ```
   docker-compose up -d
   ```

3. Access the application at `http://localhost:3000`

## 📝 API Documentation

API documentation is available at `/api/docs` when running the server locally.

## 🔒 Security Considerations

- HTTPS enforced for all connections
- JWT with short expiration times
- Passwords stored with bcrypt hashing
- CSRF protection
- Input validation and sanitization
- Rate limiting on sensitive endpoints

## 📱 Mobile Responsiveness

The application is designed to be fully responsive on all devices:
- Adaptive layouts for different screen sizes
- Touch-friendly UI elements
- Offline capabilities for essential features

## 🔄 Integration Capabilities

- Google Calendar API
- Apple Calendar API
- Spotify/Apple Music integration for setlists
- Email and SMS notifications

## 💡 Future Enhancements

- Native mobile apps
- Advanced analytics and reporting
- AI-powered scheduling suggestions
- Sheet music and audio sharing
- Virtual rehearsal rooms with video conferencing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Project Link: [https://github.com/dxaginfo/band-rehearsal-scheduler](https://github.com/dxaginfo/band-rehearsal-scheduler)