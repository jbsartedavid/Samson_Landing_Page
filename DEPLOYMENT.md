# 🚀 Deployment Guide

Complete instructions for deploying your Samson Landing Page to production.

## Overview

The application has two separate components:
- **Frontend** (React) - Can be deployed to Vercel, Netlify, AWS S3, etc.
- **Backend** (Node.js) - Can be deployed to Railway, Render, Heroku, AWS EC2, etc.

## Frontend Deployment

### Option 1: Vercel (Recommended - Easiest)

**Prerequisites:**
- Vercel account (free at https://vercel.com)
- GitHub account with repository

**Steps:**

1. **Push to GitHub:**
```bash
cd Samson_Landing_Page
git remote add origin https://github.com/YOUR_USERNAME/Samson_Landing_Page.git
git add .
git commit -m "Initial commit: Samson landing page"
git push -u origin main
```

2. **Connect to Vercel:**
- Go to https://vercel.com/new
- Click "Import Git Repository"
- Select your repository
- Select "Next.js" or "Other" framework
- Click "Deploy"

3. **Configure Environment:**
- In Vercel Dashboard → Settings → Environment Variables
- Add: `VITE_API_URL=https://your-backend-url.com`

**Build Settings:**
- Framework: Vite
- Build Command: `cd client && npm run build`
- Output Directory: `client/dist`

### Option 2: Netlify

**Steps:**

1. **Build locally first:**
```bash
cd client
npm run build
```

2. **Deploy via Netlify:**
- Go to https://app.netlify.com
- Drag and drop the `client/dist` folder

3. **Configure domain:**
- Add your custom domain in Netlify settings

4. **Set environment variable:**
- Site Settings → Build & Deploy → Environment
- `VITE_API_URL=https://your-backend-url.com`

### Option 3: AWS S3 + CloudFront

**Prerequisites:**
- AWS account

**Steps:**

1. **Build:**
```bash
cd client
npm run build
```

2. **Create S3 bucket:**
- AWS Console → S3
- Create bucket with your domain name
- Enable "Static website hosting"

3. **Upload files:**
```bash
aws s3 sync client/dist s3://your-bucket-name --delete
```

4. **Set up CloudFront:**
- Create CloudFront distribution pointing to S3
- Add SSL certificate via ACM
- Add custom domain

## Backend Deployment

### Option 1: Railway (Recommended - Easiest)

**Prerequisites:**
- Railway account (free at https://railway.app)
- GitHub repository

**Steps:**

1. **Connect GitHub:**
- Go to https://railway.app
- Click "New Project"
- Select "Deploy from GitHub"
- Choose your repository

2. **Configure:**
- Set root directory to `server/`
- Add environment variables:
  ```
  NODE_ENV=production
  DATABASE_URL=file:./prod.db
  PORT=3001
  ```

3. **Deploy:**
- Railway auto-deploys on push
- Domain assigned automatically

4. **Update Frontend:**
```javascript
// In client/.env.production
VITE_API_URL=https://your-railway-app.up.railway.app
```

### Option 2: Render

**Steps:**

1. **Create Web Service:**
- Go to https://render.com
- Click "New +" → "Web Service"
- Connect GitHub repository

2. **Configure:**
- Name: samson-api
- Environment: Node
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`
- Root Directory: `./`

3. **Add Environment Variables:**
```
NODE_ENV=production
DATABASE_URL=file:./prod.db
```

4. **Deploy and note the URL**

### Option 3: Heroku

**Prerequisites:**
- Heroku account
- Heroku CLI

**Steps:**

1. **Create Procfile in server/:**
```
web: node src/index.js
```

2. **Create app:**
```bash
cd server
heroku create samson-api
```

3. **Set environment:**
```bash
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL="file:./prod.db"
```

4. **Deploy:**
```bash
git push heroku main
```

### Option 4: DigitalOcean App Platform

**Steps:**

1. Go to DigitalOcean Dashboard
2. Click "Apps" → "Create App"
3. Connect GitHub repository
4. Select `server/` as source
5. Configure build command: `npm install`
6. Configure run command: `npm start`
7. Set environment variables
8. Deploy

## Database Considerations

### SQLite (Development/Small Sites)
```bash
DATABASE_URL=file:./prod.db
```
✅ Easy to deploy
✅ No external service needed
❌ Not ideal for high concurrency
❌ Can't scale across servers

### PostgreSQL (Production/Large Sites)
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
```

**Setup on Railway:**
```bash
# Railway has built-in PostgreSQL support
# Just add PostgreSQL service and auto-connect
```

**Setup on Render:**
```bash
# Create PostgreSQL database
# Copy connection string to DATABASE_URL
```

**Update Connection:**
```bash
# Change in server/.env
DATABASE_URL=postgresql://...

# Run migrations
npx prisma migrate deploy
```

## Post-Deployment Checklist

### Before Going Live

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] API URLs updated in frontend
- [ ] Database migrations run
- [ ] Environment variables set correctly
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Domain name configured
- [ ] Email notifications working (if added)
- [ ] Chat AI responses tested
- [ ] Contact form tested end-to-end

### Performance

- [ ] Frontend cached at CDN
- [ ] Images optimized
- [ ] Database indexes added
- [ ] API response times < 500ms
- [ ] Page load time < 3s

### Security

- [ ] HTTPS on all endpoints
- [ ] CORS whitelist configured
- [ ] Database backups enabled
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting on API
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (Prisma provides this)

### Monitoring

- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring (New Relic, etc.)
- [ ] Uptime monitoring (UptimeRobot, etc.)
- [ ] Log aggregation (CloudWatch, etc.)

## Database Backups

### SQLite Local Backups
```bash
# Daily backup script
cp server/prod.db server/backups/prod.db.$(date +%Y%m%d)
```

### PostgreSQL Backups (if using)
```bash
# Automated with most hosting providers
# Or use pg_dump
pg_dump $DATABASE_URL > backup.sql
```

## Continuous Deployment

### GitHub Actions (Free)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway up
```

## Updating After Deployment

### Push new changes:
```bash
git add .
git commit -m "Update: [description]"
git push origin main
```

### Deployment automatically triggers (most platforms)

### For database schema changes:
```bash
# Run migrations on production
npx prisma migrate deploy
```

## Troubleshooting

### 502 Bad Gateway
- Backend not running
- Port conflict
- Environment variables missing
- Database connection error

**Solution:**
```bash
# Check logs on your hosting platform
# Verify DATABASE_URL is set
# Check if npm start works locally
```

### CORS Errors
- Backend not allowing frontend domain

**Solution:**
In `server/src/index.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:5173']
}));
```

### Database not persisting
- Using SQLite without proper file mounting
- Need to switch to PostgreSQL for production

**Solution:**
```bash
# Use PostgreSQL on production
DATABASE_URL=postgresql://...
```

### API timeout
- Request taking too long
- Database too slow

**Solution:**
- Add database indexes
- Optimize queries
- Use caching (Redis)

## Scaling Strategy

### Phase 1: MVP (Current)
- Vercel (frontend)
- Railway (backend + SQLite)
- Works for ~1000 monthly visitors

### Phase 2: Growth
- Vercel (frontend)
- Railway (backend + PostgreSQL)
- Redis caching layer
- Works for ~10,000 monthly visitors

### Phase 3: Scale
- CloudFront (frontend CDN)
- Load-balanced backend servers
- PostgreSQL with replication
- Message queue (Bull)
- Works for ~100,000+ monthly visitors

## Cost Estimate

### Minimal Setup (Monthly)
- Frontend (Vercel): $0 (free tier)
- Backend (Railway): $5-10
- Database: Included
- **Total: ~$5-10/month**

### Production Setup
- Frontend (Vercel): $0-20 (paid tier)
- Backend (Railway): $15-30
- Database (PostgreSQL): $15-30
- CDN: $0-50
- Monitoring: $0-50
- **Total: ~$30-180/month**

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Express Docs:** https://expressjs.com

---

**Deployment Checklist:** Follow this guide step-by-step and you'll have a production-ready site!
