# Samson Landing Page - Quick Start Guide

## Project Overview

Your Samson Group of Companies landing page has been built with a modern tech stack featuring:
- **Frontend**: React with Vite for lightning-fast development
- **Backend**: Node.js + Express for API management
- **Database**: SQLite with Prisma ORM for easy data management
- **Features**: Content management, AI chat support (CRM), and social media integration

## What's Included

### 1. Content Management System
- Update hero section, descriptions, and all copy without touching code
- Dashboard within the landing page to edit content in real-time
- Changes are persisted to the SQLite database

### 2. AI Chat Support (CRM)
- Interactive chat widget on the landing page
- Automatic inquiry logging and conversation history
- Smart responses based on customer inquiries
- Sessionization for continuous conversations

### 3. Lead Capture
- Contact form capturing name, email, phone, and message
- Leads stored in database for follow-up
- Ready to integrate with email notification services

### 4. Modern UI
- Responsive design that works on all devices
- Beautiful gradient backgrounds and smooth animations
- Professional card-based layout
- Dark and light modes via CSS variables

### 5. Social Media Integration
- Pre-configured links for Facebook, Instagram, LinkedIn, YouTube
- Easy to update URLs from content editor

## File Structure

```
server/
├── src/index.js            # Express API with all endpoints
├── prisma/
│   ├── schema.prisma      # Database schema (Content, Lead, ChatSession, ChatMessage)
│   └── seed.js            # Initial data with Samson Group information
├── .env                   # Environment configuration
└── package.json

client/
├── src/
│   ├── App.jsx           # Single-page component with all sections
│   ├── styles.css        # Global styles (1000+ lines of modern CSS)
│   └── main.jsx          # React entry point
├── index.html            # HTML shell
├── vite.config.js        # Vite configuration
└── package.json
```

## Getting Started (5 minutes)

### Step 1: Install dependencies
```bash
# Backend
cd server
npm install

# Frontend (in new terminal)
cd client
npm install
```

### Step 2: Set up database
```bash
cd server
npx prisma migrate dev --name init
npm run seed
```

### Step 3: Start development servers
```bash
# Terminal 1 - Backend (from server/)
npm run dev

# Terminal 2 - Frontend (from client/)
npm run dev
```

### Step 4: Visit the site
Open http://localhost:5173 in your browser

## Key Endpoints

### Content Management
- `GET /api/content` - Get all content
- `PUT /api/content/heroTitle` - Update any content item

### Lead Capture
- `POST /api/lead` - Submit contact form

### Chat
- `POST /api/chat` - Send chat message, get AI response

## Customization Guide

### Change Colors
Edit `client/src/styles.css` lines 1-6:
```css
:root {
  --accent: #7c5cff;      /* Purple - change to your brand color */
  --accent-2: #00c2ff;    /* Cyan */
}
```

### Update Company Information
Edit `server/prisma/seed.js` to change initial content, then:
```bash
npm run seed
```

### Add Real AI Chat
Modify `buildAssistantReply()` in `server/src/index.js` to call OpenAI, Anthropic, or other APIs.

### Connect Email
Add nodemailer to `server/package.json` and update lead submission to send emails.

## Database Schema

### Content Table
Stores all website copy. Access via `/api/content` endpoint.

### Lead Table
Captures contact form submissions with timestamp.

### ChatSession Table
Groups messages by conversation session.

### ChatMessage Table
Individual messages with role (user/assistant) and content.

## Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend (Railway, Render, etc.)
```bash
# Set environment: DATABASE_URL, NODE_ENV=production
npm run build
npm start
```

## What's Working

✅ Beautiful, responsive landing page
✅ All sections with Samson Group information
✅ Interactive content editor
✅ AI chat widget with conversation logging
✅ Lead capture form
✅ Social media links
✅ Company history timeline
✅ Branch directory
✅ Statistics display
✅ Modern, professional design

## Next Steps

1. **Customize colors** - Match Samson Group branding
2. **Integrate email** - Add email notifications for leads
3. **Add real AI** - Connect to OpenAI or Claude API
4. **Analytics** - Track visitor behavior
5. **SEO** - Add meta tags and structured data
6. **Testing** - Set up unit and integration tests
7. **Deploy** - Push to production servers

## Contact Information

The site includes:
- Email: bahay_ugnayan@hotmail.com
- Phone: (046) 471-2675
- Address: 145 Bayan Luma I Imus, Cavite

All editable from the content management panel.

---

**Questions?** Refer to README.md for detailed documentation.
