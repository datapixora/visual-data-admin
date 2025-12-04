# Visual Data Platform - Admin Dashboard Roadmap

**Last Updated**: 2025-12-04

This roadmap outlines planned features, improvements, and bug fixes for the admin dashboard. Tasks are organized by priority and status.

## Legend
-  Completed
- =§ In Progress
- =Ë Planned
- =4 High Priority
- =á Medium Priority
- =â Low Priority

---

## Current Sprint - December 2025

### High Priority =4

#### Core Features
- [x]  User authentication (Login/Logout)
- [x]  Dashboard overview page
- [x]  Campaign management (List, Create, Edit)
- [x]  Upload review system (List, Approve, Reject)
- [x]  User management (List users)
- [ ] =Ë **Add actual image preview** (Show R2 images instead of placeholder) =4
- [ ] =Ë **Add quality score input** (Adjustable score when approving uploads)
- [ ] =Ë **Add bonus amount input** (Custom bonus per upload)

#### UI/UX Improvements
- [ ] =Ë **Fix mobile sidebar** (Better mobile menu) =4
- [ ] =Ë **Add loading skeletons** (Better loading states)
- [ ] =Ë **Add toast notifications** (Success/error messages)
- [ ] =Ë **Add confirmation dialogs** (Confirm delete/reject actions)
- [ ] =Ë **Improve form validation** (Better error messages)

#### Bug Fixes
- [ ] =Ë **Fix campaign form modal close** (State management issue) =4
- [ ] =Ë **Fix date picker timezone** (Consistent date handling)
- [ ] =Ë **Fix upload status filter** (Case sensitivity issue)
- [ ] =Ë **Fix pagination controls** (Add next/prev buttons)

### Medium Priority =á

#### Dashboard Enhancements
- [ ] =Ë **Add real-time statistics** (Auto-refresh every 30s) (@Unassigned)
- [ ] =Ë **Add charts and graphs** (Upload trends, campaign progress)
- [ ] =Ë **Add quick actions** (Recent pending uploads on dashboard)
- [ ] =Ë **Add admin activity log** (Who approved/rejected what)

#### Campaign Management
- [ ] =Ë **Add campaign status toggle** (Quick activate/deactivate) (@Unassigned)
- [ ] =Ë **Add campaign duplicate** (Clone existing campaign)
- [ ] =Ë **Add campaign delete** (Soft delete campaigns)
- [ ] =Ë **Add campaign analytics** (Approval rate, avg quality)
- [ ] =Ë **Add campaign export** (Download campaign data CSV)
- [ ] =Ë **Add bulk campaign actions** (Multi-select operations)

#### Upload Management
- [ ] =Ë **Add bulk approve/reject** (Select multiple uploads) =4
- [ ] =Ë **Add upload details modal** (Full EXIF data view)
- [ ] =Ë **Add image zoom** (Fullscreen image viewer)
- [ ] =Ë **Add upload comments** (Reviewer notes)
- [ ] =Ë **Add upload history** (Track status changes)
- [ ] =Ë **Add advanced filtering** (Date range, quality score, user)

#### User Management
- [ ] =Ë **Add user details page** (Full profile view) (@Unassigned)
- [ ] =Ë **Add user role management** (Promote to admin)
- [ ] =Ë **Add user ban/suspend** (Block problematic users)
- [ ] =Ë **Add user statistics** (Detailed upload/earnings breakdown)
- [ ] =Ë **Add user search** (Search by name, email)
- [ ] =Ë **Add user export** (Download user list CSV)

### Low Priority =â

#### Nice to Have
- [ ] =Ë **Add dark mode** (Theme toggle)
- [ ] =Ë **Add keyboard shortcuts** (Quick navigation)
- [ ] =Ë **Add admin preferences** (Customizable dashboard)
- [ ] =Ë **Add bulk import** (CSV upload for campaigns)
- [ ] =Ë **Add API playground** (Test API endpoints from dashboard)
- [ ] =Ë **Add help/documentation** (Inline help tooltips)

---

## Upcoming Features (Next Sprint)

### Analytics & Reporting
- [ ] =Ë **Add analytics dashboard** (Dedicated analytics page) =4
- [ ] =Ë **Add campaign performance charts** (Bar/line charts)
- [ ] =Ë **Add user activity heatmap** (Upload patterns)
- [ ] =Ë **Add revenue tracking** (Total payouts, pending, completed)
- [ ] =Ë **Add export reports** (PDF/CSV downloads)
- [ ] =Ë **Add date range filters** (Custom date selection)

### Advanced Features
- [ ] =Ë **Add real-time notifications** (WebSocket integration)
- [ ] =Ë **Add email integration** (Send emails from dashboard)
- [ ] =Ë **Add announcement system** (Broadcast to users)
- [ ] =Ë **Add automated rules** (Auto-approve based on quality score)
- [ ] =Ë **Add AI quality review** (Computer vision integration)

### Payment Management
- [ ] =Ë **Add payout management** (Approve/reject payout requests)
- [ ] =Ë **Add payment history** (Track all transactions)
- [ ] =Ë **Add payment export** (Financial reports)
- [ ] =Ë **Add payment dashboard** (Revenue analytics)

### Settings & Configuration
- [ ] =Ë **Add system settings page** (Configure platform settings)
- [ ] =Ë **Add email templates** (Customize notification emails)
- [ ] =Ë **Add API key management** (Generate/revoke API keys)
- [ ] =Ë **Add admin team management** (Add/remove admin users)

---

## Future Roadmap (3-6 Months)

### Performance
- [ ] =Ë **Add infinite scroll** (Replace pagination)
- [ ] =Ë **Add image lazy loading** (Faster page loads)
- [ ] =Ë **Add service worker** (Offline support)
- [ ] =Ë **Add progressive web app** (PWA features)

### Security
- [ ] =Ë **Add two-factor authentication** (2FA for admin login)
- [ ] =Ë **Add session management** (View active sessions)
- [ ] =Ë **Add security audit log** (Track sensitive actions)
- [ ] =Ë **Add IP whitelist** (Restrict admin access)

### Internationalization
- [ ] =Ë **Add multi-language support** (i18n)
- [ ] =Ë **Add timezone selection** (User timezone preferences)
- [ ] =Ë **Add currency display** (Multi-currency support)

### Mobile App
- [ ] =Ë **Create mobile-optimized views** (Touch-friendly UI)
- [ ] =Ë **Add mobile app** (React Native version)
- [ ] =Ë **Add push notifications** (Mobile alerts)

---

## Bug Fixes

### Known Issues
- [ ] =Ë **Fix table overflow on mobile** (Responsive tables) =4
- [ ] =Ë **Fix modal scroll on small screens** (Scrollable modals)
- [ ] =Ë **Fix sidebar overlay on tablet** (Responsive breakpoints)
- [ ] =Ë **Fix logout redirect** (Clear all state properly)
- [ ] =Ë **Fix image aspect ratio** (Maintain aspect in previews)

### Performance Issues
- [ ] =Ë **Optimize upload list rendering** (Virtual scrolling)
- [ ] =Ë **Reduce API call frequency** (Better caching)
- [ ] =Ë **Optimize bundle size** (Code splitting)

---

## Technical Debt

### Code Quality
- [ ] =Ë **Add TypeScript strict mode** (Stricter type checking)
- [ ] =Ë **Add unit tests** (Component testing with Vitest)
- [ ] =Ë **Add E2E tests** (Playwright integration)
- [ ] =Ë **Refactor API client** (Better error handling)
- [ ] =Ë **Add code splitting** (Dynamic imports)
- [ ] =Ë **Add error boundary** (Graceful error handling)

### Accessibility
- [ ] =Ë **Add ARIA labels** (Screen reader support)
- [ ] =Ë **Add keyboard navigation** (Full keyboard support)
- [ ] =Ë **Add focus indicators** (Visible focus states)
- [ ] =Ë **Test with screen readers** (WCAG compliance)

### Documentation
- [ ] =Ë **Add component documentation** (Storybook)
- [ ] =Ë **Add user guide** (Admin handbook)
- [ ] =Ë **Add video tutorials** (How-to guides)

### DevOps
- [ ] =Ë **Add CI/CD pipeline** (GitHub Actions)
- [ ] =Ë **Add staging environment** (Preview deployments)
- [ ] =Ë **Add error tracking** (Sentry integration)
- [ ] =Ë **Add analytics** (Google Analytics or PostHog)

---

## Completed 

### Phase 1 - MVP (November 2025)
- [x]  Project setup with Next.js 15 + TypeScript
- [x]  Tailwind CSS styling
- [x]  Zustand state management
- [x]  Axios API client
- [x]  Login page with authentication
- [x]  Protected route middleware
- [x]  Dashboard layout with sidebar
- [x]  Dashboard overview page
- [x]  Campaigns listing page
- [x]  Campaign create form
- [x]  Campaign edit form
- [x]  Uploads listing page
- [x]  Upload filtering (status, search)
- [x]  Upload approval/rejection
- [x]  Upload detail modal
- [x]  Users listing page
- [x]  Responsive design (basic)
- [x]  Environment configuration

### Phase 2 - Improvements (December 2025)
- [x]  Campaign form modal
- [x]  Upload statistics
- [x]  Status badges
- [x]  Loading states
- [x]  Error handling
- [x]  Project documentation (README, CONTRIBUTING)
- [x]  GitHub templates (Issue, PR)

---

## Page Priorities

### =4 Critical Pages (Must Work Perfectly)
1. Login page
2. Upload review page
3. Campaign management page

### =á Important Pages (Should Work Well)
4. Dashboard overview
5. User management page

### =â Nice to Have Pages (Future)
6. Analytics page
7. Settings page
8. Reports page

---

## How to Use This Roadmap

### For Developers
1. **Check "Current Sprint"** - These are immediate priorities
2. **Pick an unassigned task** - Add your name: `(@YourName)`
3. **Create a branch** - `git checkout -b feature/task-name`
4. **Update status** - Move from =Ë to =§ when starting
5. **Mark complete** - Change to  when done
6. **Update this file** - Keep roadmap current

### Example Workflow
```bash
# 1. Pick a task from roadmap
# Task: Add bulk approve/reject

# 2. Update roadmap (add your name)
- [ ] =§ **Add bulk approve/reject** (@Mostafa) =4

# 3. Create branch
git checkout -b feature/bulk-approve

# 4. Code the feature
# ... your work ...

# 5. Commit and push
git add .
git commit -m "feat(uploads): add bulk approve/reject functionality"
git push origin feature/bulk-approve

# 6. Update roadmap (mark complete)
- [x]  **Add bulk approve/reject** (@Mostafa)

# 7. Create Pull Request
```

### Task Assignment Format
```markdown
- [ ] =Ë **Task name** (@AssignedDeveloper) =4
```

---

## Quick Reference

### High Priority This Week
1. Add actual image preview =4
2. Fix mobile sidebar =4
3. Add bulk approve/reject =4
4. Add campaign form fixes =4

### Next Week Priorities
1. Add real-time statistics
2. Add charts and graphs
3. Add user details page
4. Add campaign analytics

---

**Questions?** Open a GitHub Discussion or contact the team lead.
