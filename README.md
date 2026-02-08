# 🕯️ Samson Funeral & Cemetery Services Landing Page

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)

A modern, feature-rich landing page and content management system for Samson Funeral & Cemetery Services in the Philippines.

[Live Demo](#-deployment) • [Features](#-features) • [Installation](#-installation) • [Admin Dashboard](#-admin-dashboard)

</div>

---

## ✨ Features

### 🎯 **Public Facing**
- ✅ Stunning hero section with animated gradient backgrounds
- ✅ Services carousel with video demonstrations
- ✅ Announcements gallery
- ✅ Officers & Staff directory with profiles
- ✅ Affiliations & Partnerships showcase
- ✅ Interactive contact section with multiple channels:
  - 💬 **WhatsApp** (chat & voice calls)
  - 📘 **Facebook Messenger** (chat & calls)
  - 📧 Contact form with email integration
  - 💬 Live chat widget with AI assistant
- ✅ Privacy Policy & Cookies consent
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized

### 👨‍💼 **Admin Dashboard**
- ✅ Secure authentication with JWT tokens
- ✅ **General Content Management**
  - Hero section customization
  - About section with features and values
  - Mission, vision, legacy content
  - Contact information management
  
- ✅ **System Settings Tab**
  - SMTP configuration for email service
  - Facebook Messenger link setup
  - WhatsApp number configuration
  
- ✅ **Content Management Modules**
  - Announcements posting
  - Directory entries (funeral parlors, partners)
  - Officers & employees profiles
  - Services carousel management
  - Affiliations management
  
- ✅ **Advanced Features**
  - Visitor chat history tracking
  - Floating toast notifications for save feedback
  - Real-time form validation
  - Bulk operations support

---

## 🛠️ Tech Stack

### **Frontend**
```
Next.js 14.2.35 - React framework with App Router
React 18 - UI library
Tailwind CSS 3.4 - Utility-first CSS framework
Framer Motion - Animation library
Swiper - Touch slider carousel
React Icons - Icon library
```

### **Backend**
```
Express.js - Node.js web framework
Prisma ORM - Database ORM with type safety
SQLite - Development database
Node-cron - Job scheduling
Nodemailer - Email service
```

### **Authentication & Security**
```
JWT (JSON Web Tokens) - Stateless authentication
bcryptjs - Password hashing
CORS - Cross-Origin Resource Sharing
```

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Clone & Setup

```bash
# Clone repository
git clone https://github.com/jbsartedavid/Samson_Landing_Page.git
cd Samson_Landing_Page

# Install dependencies
npm install

# Setup environment variables
cp web/.env.local.example web/.env.local
cp server/.env.example server/.env

# Run database migrations
cd server
npx prisma migrate dev
npm run seed

# Start development servers (from root)
cd ..
npm run dev
```

The app will run on:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

---

## 🔐 Admin Access

1. Navigate to **http://localhost:3000/admin/login**
2. Default credentials (change in production):
   ```
   Email: admin@samson.com
   Password: admin123
   ```

3. Manage all content from the dashboard

---

## 📞 Contact Channels Integration

### **WhatsApp**
- Direct messaging and voice calls
- Configured via admin dashboard
- Click-to-chat link: `https://wa.me/{number}`
- Format: International with country code (e.g., +63)

### **Facebook Messenger**
- Direct messaging and voice calls
- Admin-configurable page link
- One-click access to Facebook messaging

### **Contact Form**
- Email-based inquiries
- SMTP configured for automatic responses
- Visitor information tracking

### **Live Chat Widget**
- AI-powered chat assistant
- Powered by integrated chat API
- Floating button with visual indicators

---

## 🚀 Development

### Project Structure
```
Samson_Landing_Page/
├── web/                      # Next.js frontend
│   ├── app/
│   │   ├── page.jsx         # Home page
│   │   ├── contact/         # Contact page
│   │   ├── admin/           # Admin dashboard
│   │   ├── components/      # Reusable components
│   │   └── api/             # API routes
│   └── public/              # Static assets
├── server/                   # Express backend
│   ├── src/
│   │   ├── index.js         # Server entry
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utility functions
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── seeds/               # Database seeders
└── package.json             # Root scripts
```

### Available Scripts

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Build frontend for production
npm run build

# Production mode
npm start

# Backend only
cd server && npm run dev

# Frontend only
cd web && npm run dev

# Database seed
cd server && npm run seed

# Database migrations
cd server && npx prisma migrate dev
```

---

## 🎨 Design Highlights

- **Color Palette**: Gold (#b8892e), Espresso (#3f2b17), Cream, White
- **Animations**: Scroll-triggered reveals, hover effects, smooth transitions
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Static generation, image optimization, code splitting

---

## 📈 Performance Metrics

- ✅ **Fast Build**: Production build completes in ~30 seconds
- ✅ **Optimized Bundle**: ~167 KB First Load JS on home page
- ✅ **SEO Ready**: Server-side rendering with Next.js
- ✅ **Mobile Friendly**: 100% responsive design

---

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend** (`.env`):
```
DATABASE_URL="file:./dev.db"
PORT=3001
JWT_SECRET=your_secret_key_here

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=noreply@samson.com
CONTACT_FORM_EMAIL=info@samson.com
```

---

## 🚀 Deployment

### **GitHub Pages (Frontend Only)**

1. **Configure for GitHub Pages:**
   ```bash
   cd web
   npm install next-export-optimize-images --save-dev
   ```

2. **Update `next.config.js`:**
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/Samson_Landing_Page',
     assetPrefix: '/Samson_Landing_Page/',
   };
   ```

3. **Add GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy Frontend to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: cd web && npm install && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./web/out
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Save

### **Backend Deployment (Alternative Platforms)**

Choose one for production backend:
- **Render**: Free tier available
- **Railway**: Pay-as-you-go
- **Vercel**: Serverless functions
- **Traditional VPS**: AWS, DigitalOcean, Linode

---

## 📝 License

This project is proprietary to Samson Funeral & Cemetery Services. All rights reserved.

---

## 👥 Support & Contact

For inquiries or support:
- 📧 Email: info@samsongroup.com
- 💬 WhatsApp: [Configured in Admin Dashboard]
- 📘 Facebook: [Configured in Admin Dashboard]
- 🌐 Website: [Your live domain]

---

## 🙏 Credits

- **Built with**: Next.js, React, Tailwind CSS, Framer Motion
- **Icons**: React Icons
- **UI Components**: Custom + Tailwind
- **Database**: Prisma ORM with SQLite

---

<div align="center">

**Made with ❤️ for Samson Funeral & Cemetery Services**

[⬆ back to top](#-samson-funeral--cemetery-services-landing-page)

</div>
