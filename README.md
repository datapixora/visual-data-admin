# Visual Data Platform - Admin Dashboard

> Modern admin dashboard for managing the Visual Data Platform crowdsourcing system

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## Overview

The Visual Data Platform Admin Dashboard is a Next.js-based web application that provides administrators with tools to manage campaigns, review uploads, manage users, and monitor platform statistics.

**Connected Backend API**: [Visual Data Platform API](https://github.com/datapixora/DataSet)

## Features

### Core Functionality
- 🔐 **Secure Authentication** - Admin-only access with JWT authentication
- 📊 **Dashboard Analytics** - Real-time statistics and metrics
- 📸 **Upload Management** - Review, approve, and reject photo submissions
- 🎯 **Campaign Management** - Create and manage data collection campaigns
- 👥 **User Management** - View and manage platform users
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔍 **Search & Filter** - Advanced filtering for uploads and users
- ⚡ **Real-time Updates** - Instant feedback on admin actions

### User Experience
- Loading states and error handling
- Search and filter capabilities
- Modal forms for data entry
- Status badges and progress indicators
- Mobile-friendly sidebar navigation

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **State Management** | Zustand |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Date Formatting** | date-fns |
| **Deployment** | Vercel / Netlify |

## Getting Started

### Prerequisites

```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
```

### 1. Clone the Repository

```bash
git clone https://github.com/datapixora/visual-data-admin.git
cd visual-data-admin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://visual-data-api.onrender.com/v1

# Or for local development:
# NEXT_PUBLIC_API_URL=http://localhost:3000/v1
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Login

**Default Admin Account:**
- Email: `admin@visualdata.com`
- Password: `Admin@123`

**Test Admin Account:**
- Email: `test@example.com`
- Password: `Test@123`

## Project Structure

```
visual-data-admin/
├── app/                        # Next.js App Router
│   ├── login/                 # Login page
│   │   └── page.tsx
│   ├── dashboard/             # Protected dashboard routes
│   │   ├── page.tsx          # Dashboard overview
│   │   ├── campaigns/        # Campaign management
│   │   │   └── page.tsx
│   │   ├── uploads/          # Upload review
│   │   │   └── page.tsx
│   │   ├── users/            # User management
│   │   │   └── page.tsx
│   │   └── layout.tsx        # Dashboard layout with sidebar
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/                # React components
│   └── dashboard/
│       ├── Sidebar.tsx       # Navigation sidebar
│       └── CampaignForm.tsx  # Campaign create/edit form
├── lib/                       # Utilities and configuration
│   ├── api.ts                # API client and endpoints
│   ├── store.ts              # Zustand state management
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts              # Helper functions
├── public/                    # Static assets
├── .env.local                # Environment variables (create this)
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Dependencies
```

## Available Pages

### 1. Login Page (`/login`)
- JWT-based authentication
- Email and password validation
- Error handling and loading states
- Redirects to dashboard on success

### 2. Dashboard Overview (`/dashboard`)
- Platform statistics (users, campaigns, uploads)
- Total earnings tracking
- Recent uploads list
- Quick action buttons

### 3. Campaigns Page (`/dashboard/campaigns`)
- List all campaigns with status
- Create new campaigns with form validation
- Edit existing campaigns
- Progress tracking (collected vs target)
- Payout information display
- Status badges (Active/Inactive)

### 4. Uploads Page (`/dashboard/uploads`)
- View all photo submissions
- Filter by status (pending, approved, rejected)
- Search by user or campaign
- Review upload details (metadata, EXIF, location)
- Approve or reject uploads
- Image preview modal
- Bulk statistics

### 5. Users Page (`/dashboard/users`)
- List all registered users
- User statistics (uploads, earnings)
- Search and filter users
- View detailed user profiles

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run type checking
npx tsc --noEmit
```

## API Integration

The dashboard communicates with the backend API using Axios. All API calls are defined in `lib/api.ts`.

### API Client Configuration

```typescript
// lib/api.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Available API Endpoints

**Authentication:**
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

**Campaigns:**
- `GET /campaigns` - List all campaigns
- `POST /campaigns` - Create campaign (admin)
- `PATCH /campaigns/:id` - Update campaign (admin)

**Uploads:**
- `GET /uploads/admin/all` - List all uploads
- `GET /uploads/admin/pending` - List pending uploads
- `POST /uploads/:id/approve` - Approve upload
- `POST /uploads/:id/reject` - Reject upload

**Users:**
- `GET /users` - List all users

## Authentication

The dashboard uses JWT tokens for authentication.

### Login Flow

1. User submits email and password
2. API returns `accessToken` and `refreshToken`
3. Tokens stored in localStorage
4. Axios interceptor adds token to all requests
5. Zustand store manages auth state

### Protected Routes

All `/dashboard/*` routes are protected and redirect to `/login` if not authenticated.

```typescript
// lib/store.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `NEXT_PUBLIC_API_URL=https://visual-data-api.onrender.com/v1`
   - Deploy

3. **Configuration** (automatic)
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Deploy to Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` in Netlify dashboard
   - Value: `https://visual-data-api.onrender.com/v1`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://visual-data-api.onrender.com/v1` |

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Coding standards
- Pull request process
- Testing guidelines

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Common Issues

### Issue: "Failed to fetch campaigns"
**Solution**: Check that the backend API is running and `NEXT_PUBLIC_API_URL` is correct.

### Issue: "Login failed"
**Solution**: Verify admin credentials and check browser console for errors.

### Issue: "Access denied. Admin privileges required"
**Solution**: Ensure you're logging in with an admin account (role: ADMIN).

### Issue: API Connection Errors
**Solution**:
- Verify the `NEXT_PUBLIC_API_URL` in `.env.local`
- Check that the backend API is running
- Verify CORS is configured on the backend

### Issue: Images Not Loading
**Solution**:
- Check that Cloudflare R2 URLs are publicly accessible
- Verify CORS settings on R2 bucket

## Security

- All routes except `/login` require authentication
- Admin role verification on login
- JWT token stored in localStorage
- Automatic token expiration handling
- HTTPS required for production
- API requests authenticated with Bearer token

## Links

- **Backend API**: https://visual-data-api.onrender.com
- **GitHub (Backend)**: https://github.com/datapixora/DataSet
- **GitHub (Dashboard)**: https://github.com/datapixora/visual-data-admin
- **API Documentation**: [Backend API.md](https://github.com/datapixora/DataSet/blob/main/docs/API.md)

## Support

- **Issues**: [GitHub Issues](https://github.com/datapixora/visual-data-admin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/datapixora/visual-data-admin/discussions)
- **Email**: support@visualdata.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with Next.js and TypeScript by the Visual Data Platform Team**
