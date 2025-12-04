# Visual Data Platform Admin Dashboard - Quick Start

## 🎉 Your Admin Dashboard is Ready!

The development server is running at: **http://localhost:3000**

## 📋 Login Credentials

```
Email: admin@example.com
Password: Admin@123
```

## 🚀 What's Built

### ✅ Complete Features

1. **Authentication System**
   - Secure JWT-based login
   - Admin-only access
   - Auto-redirect to dashboard

2. **Dashboard Overview** (`/dashboard`)
   - Total campaigns, uploads, and earnings
   - Upload statistics (pending, approved, rejected)
   - Recent uploads table with images

3. **Campaigns Management** (`/dashboard/campaigns`)
   - View all campaigns
   - Campaign progress tracking
   - Active/inactive status
   - Create new campaigns (modal ready)

4. **Uploads Review** (`/dashboard/uploads`)
   - Grid view of all uploads with images
   - Filter by status (all, pending, approved, rejected)
   - Search by user or campaign
   - Approve/reject uploads with one click
   - Detailed upload viewer with metadata
   - Image quality scoring

5. **Users Management** (`/dashboard/users`)
   - View all users
   - User roles and statistics
   - Upload counts per user

### 🎨 UI Features

- Responsive design (works on mobile, tablet, desktop)
- Clean, modern interface with Tailwind CSS
- Sidebar navigation
- Loading states and error handling
- Image previews and modals
- Status badges with colors

## 📊 Dashboard Features

### Upload Approval Workflow

1. Navigate to **Uploads** page
2. Filter by **Pending** status
3. Click **View** to see full details
4. Review image quality and metadata
5. Click **Approve** or **Reject**
6. System automatically:
   - Updates upload status
   - Calculates earnings
   - Assigns quality score

### Campaign Management

1. Navigate to **Campaigns** page
2. View all campaigns with progress bars
3. See base payout and bonus amounts
4. Track photo collection progress
5. Click **Create Campaign** to add new ones

## 🔗 API Integration

The dashboard connects to your deployed API:

```
https://visual-data-api.onrender.com
```

**Active Endpoints:**
- ✅ `POST /v1/auth/login` - Authentication
- ✅ `GET /v1/campaigns` - List campaigns
- ✅ `GET /v1/uploads` - List uploads
- ✅ `POST /v1/uploads/:id/approve` - Approve upload
- ✅ `POST /v1/uploads/:id/reject` - Reject upload

## 🛠️ Development Commands

```bash
# Start dev server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Project Structure

```
visual-data-admin/
├── app/
│   ├── dashboard/           # Main dashboard
│   │   ├── campaigns/       # Campaign management
│   │   ├── uploads/         # Upload review
│   │   ├── users/           # User management
│   │   ├── layout.tsx       # Protected layout
│   │   └── page.tsx         # Dashboard home
│   ├── login/              # Login page
│   │   └── page.tsx
│   └── page.tsx            # Root redirect
├── components/
│   └── dashboard/          # Reusable components
│       ├── Sidebar.tsx     # Navigation
│       └── StatCard.tsx    # Statistics cards
├── lib/
│   ├── api.ts              # API client
│   ├── store.ts            # State management
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
└── .env.local              # Environment config
```

## 🚀 Next Steps

### Option 1: Deploy to Vercel

```bash
# 1. Push to GitHub
cd visual-data-admin
git init
git add .
git commit -m "Initial commit: Admin dashboard"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

# 2. Deploy on Vercel
# - Go to vercel.com
# - Import your repository
# - Add env var: NEXT_PUBLIC_API_URL=https://visual-data-api.onrender.com
# - Deploy!
```

### Option 2: Continue Development

Add these features:
- [ ] Complete campaign creation form
- [ ] Bulk upload actions
- [ ] Export data to CSV
- [ ] Real-time notifications
- [ ] Analytics charts
- [ ] Dark mode

### Option 3: Build Mobile App

Now that you have a complete backend API and admin dashboard, you can:
- Build a Flutter or React Native mobile app
- Use the same API endpoints
- Focus on the photo capture experience

## 📝 Environment Variables

Update `.env.local` if needed:

```env
# For deployed API (default)
NEXT_PUBLIC_API_URL=https://visual-data-api.onrender.com

# For local development
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🔐 Security Notes

- Admin authentication required for all dashboard routes
- JWT tokens stored in localStorage
- Automatic token expiration handling
- CORS configured on backend API

## 🐛 Troubleshooting

### Can't login?
- Check API is running: https://visual-data-api.onrender.com/v1/health
- Verify credentials: admin@example.com / Admin@123
- Check browser console for errors

### Images not loading?
- Verify Cloudflare R2 URLs are public
- Check CORS settings on R2 bucket
- Verify backend R2 configuration

### API errors?
- Check backend logs in Render dashboard
- Verify environment variables
- Ensure database is connected

## 📞 Support

- **API Dashboard**: https://dashboard.render.com
- **API URL**: https://visual-data-api.onrender.com
- **GitHub**: https://github.com/datapixora/DataSet

## 🎯 Summary

You now have:
- ✅ Complete backend API (deployed on Render)
- ✅ Admin dashboard (running locally)
- ✅ Authentication system
- ✅ Campaign management
- ✅ Upload review workflow
- ✅ User management

**Ready to:**
- Deploy admin dashboard to production
- Build mobile app for photo collection
- Set up Cloudflare R2 for image storage
- Add more features as needed

---

**Admin Dashboard**: http://localhost:3000
**API Backend**: https://visual-data-api.onrender.com

Happy coding! 🚀
