
# TaskBoard Pro - Real-Time Collaborative Task Management

A modern, real-time collaborative task management application built with React and Node.js. Features drag-and-drop functionality, live updates, smart task assignment, and conflict resolution.

## Features

- **Real-time Collaboration**: See changes instantly as team members update tasks
- **Drag & Drop Interface**: Intuitive Kanban-style board with three columns (Todo, In Progress, Done)
- **Smart Assignment**: Automatically assigns tasks to team members with the least workload
- **Conflict Resolution**: Handles simultaneous edits with user-friendly conflict resolution
- **Activity Logging**: Track all task changes with detailed activity logs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Custom Animations**: Smooth transitions and engaging user interactions

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Custom drag-and-drop implementation
- Responsive design with mobile-first approach

**Backend:** (To be implemented)
- Node.js with Express
- MongoDB for database
- Socket.IO for real-time updates
- JWT authentication

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskboard-pro.git
cd taskboard-pro
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

### Authentication
- Register a new account or login with existing credentials
- Demo credentials: email: `demo@example.com`, password: `demo123`

### Managing Tasks
- Click "Add Task" to create new tasks
- Drag tasks between columns to update their status
- Use the edit button to modify task details
- Click the Smart Assign button to automatically assign tasks

### Real-time Features
- All changes are reflected immediately across all connected users
- Activity log shows the last 20 actions in real-time
- Conflict resolution modal appears when multiple users edit the same task

## Architecture

### Smart Assignment Logic
The Smart Assign feature automatically assigns tasks to the user with the fewest active tasks:
1. Counts current tasks for each user
2. Identifies the user with minimum task count
3. Assigns the selected task to that user
4. Updates the task immediately with real-time sync

### Conflict Handling
When two users edit the same task simultaneously:
1. The system detects the conflict
2. Shows both versions to the users
3. Allows users to choose which version to keep
4. Applies the selected changes across all clients

### Validation Rules
- Task titles must be unique within the board
- Task titles cannot match column names (Todo, In Progress, Done)
- All fields are validated before saving

## Development

### Project Structure
```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── board/         # Kanban board components
│   ├── layout/        # Layout components
│   └── activity/      # Activity log components
├── pages/             # Main pages
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables if needed

### Backend Deployment (Coming Soon)
Instructions for deploying the Node.js backend will be added once implemented.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/taskboard-pro
# ToDo-Board
