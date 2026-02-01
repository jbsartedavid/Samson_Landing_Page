# Installation & Setup Guide

Complete step-by-step instructions for getting your Samson Landing Page running.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

## Installation Steps

### 1. Navigate to the project

```bash
cd C:\Users\jbsar\Desktop\SAMSONLANDINGPAGE\Samson_Landing_Page
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

Expected output should show packages like express, @prisma/client, cors, dotenv being installed.

### 3. Setup the Database

```bash
# While still in server/
npx prisma migrate dev --name init
```

This command:
- Creates the SQLite database (dev.db)
- Runs migrations to set up tables
- Generates Prisma client

Then seed the database with initial data:

```bash
npm run seed
```

You should see content being inserted for Samson Group information.

### 4. Install Frontend Dependencies

Open a new terminal and navigate to:

```bash
cd C:\Users\jbsar\Desktop\SAMSONLANDINGPAGE\Samson_Landing_Page\client
npm install
```

## Running the Application

### Terminal 1: Start the Backend API

```bash
cd server
npm run dev
```

Expected output:
```
Samson API running on port 3001
```

### Terminal 2: Start the Frontend

```bash
cd client
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
```

### 3. Open in Browser

Click the link or visit: **http://localhost:5173**

You should see the landing page with:
- Beautiful hero section
- Navigation menu
- Company history and branches
- AI chat widget
- Contact form
- Content editor panel

## First-Time Usage

### 1. Explore the landing page
- Scroll through all sections
- Click "Chat with Support" to test the AI assistant
- Try the contact form
- Edit some content using the Content Editor section

### 2. Test Content Updates
Scroll to the "Content Studio" section and:
- Click on any field
- Make changes
- Click outside the field (blur)
- Changes should save automatically

### 3. View the Database
```bash
cd server
npx prisma studio
```

Opens a visual database explorer at http://localhost:5555

## Troubleshooting

### Port Already in Use

If you get "port 3001 already in use":
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Database Errors

Reset the database:
```bash
cd server
rm dev.db
npx prisma migrate dev --name init
npm run seed
```

### Dependencies Not Installing

Clear cache and reinstall:
```bash
rm -r node_modules package-lock.json
npm install
```

### API Not Connecting

Make sure:
1. Backend is running on port 3001
2. Frontend proxy is configured in vite.config.js
3. Both are running in separate terminals

## Project Organization

### Server Structure
```
server/
├── src/index.js          # All API routes
├── prisma/
│   ├── schema.prisma     # Data models
│   └── seed.js           # Initial data
└── .env                  # Configuration
```

### Client Structure
```
client/
├── src/
│   ├── App.jsx          # Main React component
│   ├── styles.css       # All styling
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Build config
└── public/              # Static assets
```

## API Endpoints Reference

### Content Management
```
GET    /api/content              → Get all content
GET    /api/content/:key         → Get specific item
PUT    /api/content/:key         → Update item
```

### Lead Capture
```
POST   /api/lead                 → Submit contact form
```

### Chat Support
```
POST   /api/chat                 → Send chat message
```

## Development Tips

### Edit Content Programmatically
```javascript
// From browser console
fetch('/api/content/heroTitle', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ value: 'New Title Here' })
})
.then(r => r.json())
.then(data => console.log('Updated:', data))
```

### Check Database Content
```bash
cd server
npx prisma studio
```

### Build for Production
```bash
# Frontend
cd client
npm run build
# Output in client/dist/

# Backend - just push to hosting
```

## Next Steps

1. **Customize colors** - Edit `client/src/styles.css` :root section
2. **Update content** - Use the Content Editor section on the landing page
3. **Add email notifications** - Integrate Sendgrid, Mailgun, or nodemailer
4. **Connect real AI** - Replace buildAssistantReply() with OpenAI/Claude API
5. **Deploy** - Push to Vercel (frontend) and Railway/Render (backend)

## Support

See README.md for detailed documentation and deployment instructions.

---

**Questions?** Check that all services are running in separate terminals and ports are correct.
