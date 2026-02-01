# 🚀 GitHub Pages Deployment Guide

## ✅ Automatic Deployment (Recommended)

GitHub Pages is now **automatically deployed** whenever you push to the `main` branch!

### How it works:
1. Every push to `main` triggers the GitHub Actions workflow
2. The app is built automatically
3. The build output is deployed to GitHub Pages
4. Live at: `https://jbsartedavid.github.io/Samson_Landing_Page`

### Check deployment status:
1. Go to your repository
2. Click **Actions** tab
3. Look for the latest "Deploy to GitHub Pages" workflow
4. When it shows a ✅ green checkmark, it's live!

---

## 📋 Manual Deployment Steps (If Needed)

### 1. Install dependencies
```bash
cd Samson_Landing_Page
npm install
```

### 2. Build the static site
```bash
cd web
npm run build
```

This creates an `out/` directory with all static files.

### 3. Push to GitHub
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** (auto-created by workflow)
   - Folder: **/ (root)**
3. Click **Save**

---

## 🌐 Access Your Live Site

**Live URL**: `https://jbsartedavid.github.io/Samson_Landing_Page`

---

## 🔧 Configuration Details

### What Changed:
- ✅ `next.config.js` - Added `output: 'export'` for static generation
- ✅ `.github/workflows/deploy.yml` - Automatic deployment pipeline
- ✅ `basePath` - Set to `/Samson_Landing_Page` (GitHub repo name)
- ✅ `assetPrefix` - Configured for correct asset paths

### Note on API Calls:
Since GitHub Pages is static hosting, the **backend must be hosted separately** for full functionality:
- Frontend (static): GitHub Pages ✅
- Backend (API): Render, Railway, or other Node.js hosting

For development testing locally without a separate backend, some features requiring the API may not work on the live site.

---

## 🛠️ Future Backend Deployment

To get full functionality, deploy the backend to:

### Option 1: **Render** (Recommended - Free Tier)
```bash
# 1. Create account at render.com
# 2. Connect your GitHub repo
# 3. Create new Web Service
# 4. Set Build Command: npm run seed
# 5. Set Start Command: node server/src/index.js
# 6. Add environment variables in Settings
```

### Option 2: **Railway**
```bash
# 1. Create account at railway.app
# 2. Connect GitHub
# 3. Deploy from repository
# 4. Configure environment variables
```

### Option 3: **Vercel** (For Edge Functions)
```bash
npm install -g vercel
vercel deploy --prod
```

---

## 📊 Deployment Status

| Component | Status | URL |
|-----------|--------|-----|
| **Frontend** | ✅ Live | `https://jbsartedavid.github.io/Samson_Landing_Page` |
| **Backend** | ⏳ Pending | Configure in deployment settings |
| **Database** | ⏳ Pending | SQLite (local) or external DB |

---

## 🐛 Troubleshooting

### Pages Not Showing?
1. Wait 30 seconds after push (GitHub Pages builds)
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Actions tab for build errors

### Styling Broken?
- This is likely a `basePath` issue
- Verify `next.config.js` has correct `basePath`
- Clear browser cache and rebuild

### API Not Working?
- Frontend is static on GitHub Pages
- Backend must be hosted separately
- Update `NEXT_PUBLIC_API_URL` environment variable

---

## 📝 Next Steps

1. ✅ Frontend deployed to GitHub Pages
2. ⬜ Deploy backend to Render/Railway
3. ⬜ Update API URL in environment variables
4. ⬜ Test all features on live site
5. ⬜ Set custom domain (optional)

---

## 🎯 Custom Domain Setup (Optional)

To use your own domain (e.g., samsongroup.com):

1. Go to repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Update DNS records at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: jbsartedavid.github.io
   ```
4. GitHub will verify and auto-enable HTTPS

---

**Questions?** Check the main [README.md](../README.md) or GitHub Pages documentation.
