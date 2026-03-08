# SkipQ — Stitch MCP UI Roadmap (v2)

> **Project ID**: `1726844794520536114`  
> **SkipQ**: South African queue-skipping platform. Clients book Queue Runners to stand in line on their behalf at Home Affairs, clinics, licensing departments, and more.  
> **Three apps in one system**: Client App · Runner App · Admin Panel  
> **Process reference**: `stitch-dt.md`  
> **Rule**: One screen per Stitch call. Inspect structure only. Never paste HTML.

---

## App Split

```
SkipQ
├── Client App      → Book a runner, track progress, pay
├── Runner App      → Accept jobs, update queue status, earn
└── Admin Panel     → Manage everything
```

All three live inside the same Next.js project using route groups:
```
app/
  (client)/
  (runner)/
  admin/
```

---

## Screen Inventory

### 🟦 Client App

| # | Screen | Route | Device | Priority |
|---|--------|-------|--------|----------|
| C1 | [Landing Page](#c1-landing-page) | `/` | Desktop + Mobile | 🔴 High |
| C2 | [Auth — Login / Register](#c2-auth) | `/login`, `/register` | Mobile | 🔴 High |
| C3 | [Select Service Type](#c3-select-service-type) | `/book` | Mobile | 🔴 High |
| C4 | [Select Branch / Location](#c4-select-branch--location) | `/book/location` | Mobile | 🔴 High |
| C5 | [Booking Detail — Date, Time, Notes](#c5-booking-detail) | `/book/details` | Mobile | 🔴 High |
| C6 | [Runner Matching / Finding Screen](#c6-runner-matching) | `/book/matching` | Mobile | 🔴 High |
| C7 | [Live Queue Tracker](#c7-live-queue-tracker) | `/jobs/[id]/track` | Mobile | 🔴 High |
| C8 | [Chat with Runner](#c8-chat-with-runner) | `/jobs/[id]/chat` | Mobile | 🟡 Medium |
| C9 | [Client Dashboard — Active + Past Jobs](#c9-client-dashboard) | `/dashboard` | Mobile + Desktop | 🟡 Medium |
| C10 | [Receipt / Job Complete](#c10-receipt--job-complete) | `/jobs/[id]/receipt` | Mobile | 🟡 Medium |

### 🟩 Runner App

| # | Screen | Route | Device | Priority |
|---|--------|-------|--------|----------|
| R1 | [Runner Onboarding / Profile Setup](#r1-runner-onboarding) | `/runner/onboard` | Mobile | 🔴 High |
| R2 | [Runner Dashboard — Available Jobs](#r2-runner-dashboard) | `/runner/jobs` | Mobile | 🔴 High |
| R3 | [Job Detail — Accept or Decline](#r3-job-detail) | `/runner/jobs/[id]` | Mobile | 🔴 High |
| R4 | [Active Job — Status Updates](#r4-active-job) | `/runner/jobs/[id]/active` | Mobile | 🔴 High |
| R5 | [Runner Earnings Summary](#r5-runner-earnings) | `/runner/earnings` | Mobile | 🟡 Medium |

### 🟥 Admin Panel

| # | Screen | Route | Device | Priority |
|---|--------|-------|--------|----------|
| A1 | [Admin Dashboard](#a1-admin-dashboard) | `/admin` | Desktop | 🔴 High |
| A2 | [User Management](#a2-user-management) | `/admin/users` | Desktop | 🟡 Medium |
| A3 | [Runner Management — Approve / Reject](#a3-runner-management) | `/admin/runners` | Desktop | 🟡 Medium |
| A4 | [Active Jobs Monitor](#a4-active-jobs-monitor) | `/admin/jobs` | Desktop | 🟡 Medium |
| A5 | [Service Categories & Pricing](#a5-service-categories--pricing) | `/admin/services` | Desktop | 🟡 Medium |
| A6 | [Disputes & Escalations](#a6-disputes--escalations) | `/admin/disputes` | Desktop | 🟠 Later |
| A7 | [Analytics Dashboard](#a7-analytics-dashboard) | `/admin/analytics` | Desktop | 🟠 Later |

---

## Execution Order

```
Week 1 — Client booking flow     C1 → C2 → C3 → C4 → C5 → C6 → C7
Week 2 — Client completion + Runner flow     C8 → C9 → C10 → R1 → R2 → R3 → R4 → R5
Week 3 — Admin panel     A1 → A2 → A3 → A4 → A5 → A6 → A7
```

---

## Shared UI Primitives (Build First)

```tsx
components/ui/
  PageContainer.tsx     → max-w-7xl mx-auto px-6 py-8
  SurfaceCard.tsx       → rounded-2xl border shadow-sm p-4
  SectionHeader.tsx     → text-lg font-semibold
  StatusBadge.tsx       → colour-coded pill (Requested / Assigned / En Route / Waiting / Complete)
  PrimaryButton.tsx     → full-width navy CTA (mobile-first)
  EmptyState.tsx        → empty list placeholder
  LoadingSkeleton.tsx   → skeleton loaders
  BottomSheet.tsx       → mobile bottom drawer (for job confirmations)
  AvatarBadge.tsx       → runner/user avatar + name chip
```

---

## Client App Screens

### [x] C1. Landing Page

```
generate_screen_from_text
projectId: 1726844794520536114
deviceType: DESKTOP
modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a modern mobile-and-desktop landing page for SkipQ — a South African app where people
book "Queue Runners" to stand in government queues for them (like Uber, but for queues).

Sections:
- Hero: bold headline "Skip the Queue. Send a Runner.", CTA "Book a Runner Now"
- How It Works: 3 steps — Choose your queue, Book a runner, Track in real time
- Queue categories: Home Affairs, Licensing Department, Clinic, Banks, Grocery stores (icon grid)
- Trust signals: "Verified Runners", "Real-time tracking", "Safe and insured"
- Testimonials: 3 short cards
- Footer: links, app store badges placeholder, contact

Style: bold, Uber-inspired, navy + lime green accent, modern SaaS, mobile-friendly hero
Max-width 1280px centered. Tailwind-compatible spacing.
```

**Components:**
```
components/sections/HeroSection.tsx, HowItWorks.tsx, QueueCategoryGrid.tsx,
TrustSignals.tsx, Testimonials.tsx, Footer.tsx
components/cards/CategoryCard.tsx, TestimonialCard.tsx
```

---

### [x] C2. Auth

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a clean mobile login screen for a gig-economy app.

Components:
- App logo + tagline "Skip the Queue"
- Toggle: Client / Queue Runner role selector (two tabs)
- Email input, Password input with toggle
- Sign In button (large primary)
- "Forgot password?" link
- Google sign-in button
- Register link below

Style: clean mobile card, navy primary, rounded inputs, Tailwind-compatible.
```

**Components:** `app/(auth)/login/page.tsx`, `components/auth/RoleToggle.tsx`, `LoginForm.tsx`

---

### [x] C3. Select Service Type

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile screen for selecting a queue service category.

Components:
- Page header: "What queue do you need?"
- Search bar to filter categories
- Category grid (2 columns): large icon cards for
  Home Affairs, Traffic/Licensing, Clinic/Hospital, Bank, Grocery Shopping,
  Municipal Office, SASSA, Post Office
- Each card: icon, category name, typical wait time estimate
- Selected state: navy border + checkmark

Style: clean, icon-forward, rounded-xl cards, mobile-first. Tailwind-compatible.
```

**Components:** `app/(client)/book/page.tsx`, `components/booking/ServiceCategoryGrid.tsx`, `CategoryCard.tsx`

---

### [x] C4. Select Branch / Location

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile branch/location selection screen.

Components:
- Page header: "Choose a branch — [Service Name]"
- Search input for filtering locations
- List of branch cards (stacked):
  - Branch name
  - Area/suburb
  - Distance from user
  - Estimated current wait time badge
  - "Select" button
- "Use my location" option at top

Style: list layout, clean cards, wait time badge coloured (green = short, red = long). Mobile-first.
```

**Components:** `app/(client)/book/location/page.tsx`, `components/booking/BranchList.tsx`, `BranchCard.tsx`

---

### [x] C5. Booking Detail

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile booking detail screen for a queue service.

Components:
- Page header: "Booking Details"
- Summary card: selected service + branch
- Date picker
- Time slot selector (morning / afternoon / specific time)
- Special instructions textarea (e.g. "Renewing ID — have documents ready")
- Document type selector (which ID/form is needed)
- Price estimate display
- Confirm & Find Runner button (large primary)

Style: vertical form stack, clear field labels, clean spacing, mobile-first. Tailwind-compatible.
```

**Components:** `app/(client)/book/details/page.tsx`, `components/booking/BookingForm.tsx`, `TimeSlotPicker.tsx`

---

### [x] C6. Runner Matching

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a mobile "finding your runner" waiting screen for a gig-economy app.

Components:
- Animated/pulsing map area with a pin for the queue location
- "Finding a Runner Near You..." status message
- Spinner or animated dots
- Job summary card below map: service, branch, time
- Cancel button

Style: Uber-inspired, map-forward layout, navy accent, minimal UI, mobile. Tailwind-compatible.
```

**Components:** `app/(client)/book/matching/page.tsx`, `components/matching/MatchingScreen.tsx`, `JobSummaryCard.tsx`

---

### [x] C7. Live Queue Tracker

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a mobile real-time queue tracking screen for a runner service.

Components:
- Runner info card at top: photo, name, star rating, "Chat" button
- Status progress bar / steps:
  Accepted → En Route → Arrived → Waiting → Near Front → Complete
- Current status highlighted with icon and label
- Queue position estimate: "Approx. 23 people ahead"
- Time estimate: "~45 min remaining"
- Map area showing runner's location at the queue
- Cancel button (small, below)

Style: Uber-trip-inspired, status steps prominent, navy + green, mobile. Tailwind-compatible.
```

**Components:** `app/(client)/jobs/[id]/track/page.tsx`, `components/tracking/RunnerStatusBar.tsx`,
`QueueProgressSteps.tsx`, `RunnerInfoCard.tsx`

---

### [x] C8. Chat with Runner

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile chat screen between a client and a queue runner.

Components:
- Chat header: runner name + avatar + "active" status indicator
- Message thread: right-aligned client bubbles, left-aligned runner bubbles
- Timestamp between message groups
- Text input + send button at bottom
- Quick reply chips: "How long?", "Are you there?", "Thank you"

Style: WhatsApp-inspired but cleaner, light background, navy send button. Mobile-first.
```

**Components:** `app/(client)/jobs/[id]/chat/page.tsx`, `components/chat/ChatWindow.tsx`, `MessageBubble.tsx`, `QuickReplies.tsx`

---

### [x] C9. Client Dashboard

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a mobile client dashboard for a queue booking app.

Components:
- Header: "Hi [Name]" greeting + profile avatar
- Active job card (if live): runner name, queue status, "Track" CTA — prominent
- "Recent Jobs" section: stacked job cards
  - Service name, branch, date, status badge, "View" link
- "Book a Queue" floating action button or bottom section CTA
- Bottom navigation: Home, My Jobs, Chat, Profile

Style: clean mobile dashboard, Uber-inspired, navy, card-based, bottom nav. Mobile-first.
```

**Components:** `app/(client)/dashboard/page.tsx`, `components/dashboard/ActiveJobBanner.tsx`,
`JobHistoryList.tsx`, `JobHistoryCard.tsx`, `ClientBottomNav.tsx`

---

### [x] C10. Receipt / Job Complete

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile job completion / receipt screen.

Components:
- Checkmark success icon
- "Queue Complete!" headline
- Job summary card: service, branch, runner name, duration, total cost
- Rate your runner: 5-star selector + optional comment
- Payment confirmation details
- "Book Again" and "Back to Home" buttons

Style: clean, celebratory but minimal, navy accent, rounded card, mobile.
```

**Components:** `app/(client)/jobs/[id]/receipt/page.tsx`, `components/job/JobReceiptCard.tsx`, `StarRating.tsx`

---

## Runner App Screens

### [x] R1. Runner Onboarding

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a multi-step mobile onboarding form for a queue runner (gig worker).

Steps shown in progress bar:
1. Personal details (name, phone, ID number)
2. Upload ID document (photo upload zone)
3. Profile photo upload
4. Service area selection (suburb/city)
5. Review & submit application

Current step shown: Step 1 — Personal Details.
Form: clean vertical stack, large inputs, Next button, Back link.
Style: friendly onboarding, navy, mobile-first. Tailwind-compatible.
```

**Components:** `app/(runner)/onboard/page.tsx`, `components/runner/OnboardingWizard.tsx`,
`DocumentUploadZone.tsx`, `AreaSelector.tsx`

---

### R2. Runner Dashboard — Available Jobs

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a mobile runner dashboard showing available queue jobs to accept.

Components:
- Header: "Available Jobs Near You" + toggle Online/Offline status
- Earnings summary chip: today's earnings
- Job list (stacked cards):
  - Queue service type + branch name
  - Distance from runner
  - Scheduled time
  - Estimated duration
  - Pay amount
  - "Accept Job" button
- Filter bar: Service type, Distance, Time
- Bottom navigation: Jobs, Active, Earnings, Profile

Style: Uber Driver-inspired, clean cards, navy, lime accent for pay, mobile-first.
```

**Components:** `app/(runner)/jobs/page.tsx`, `components/runner/JobFeedCard.tsx`,
`OnlineToggle.tsx`, `RunnerBottomNav.tsx`

---

### R3. Job Detail — Accept or Decline

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile job detail screen for a runner to review before accepting.

Components:
- Queue service name + icon
- Branch name + address
- Map preview of the queue location
- Scheduled date + time
- Special client instructions
- Required documents listed
- Estimated queue duration
- Pay amount (prominent)
- Accept Job button (large green primary)
- Decline link (small secondary)

Style: clean detail card, map at top, key info below, action buttons at bottom. Mobile-first.
```

**Components:** `app/(runner)/jobs/[id]/page.tsx`, `components/runner/JobDetailCard.tsx`

---

### R4. Active Job — Status Updates

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a mobile active job screen for a queue runner updating their status.

Components:
- Job header: service + client name
- Large status update buttons (one visible at a time based on progress):
  "I've Arrived at the Location"
  "I'm Now Waiting in the Queue"
  "I'm Near the Front"
  "Task Complete"
- Current status indicator
- Chat button to message client
- Upload proof of completion button (photo)
- Cancel / report issue link

Style: action-focused, one big CTA per step, Uber-driver-inspired, navy + green, mobile.
```

**Components:** `app/(runner)/jobs/[id]/active/page.tsx`, `components/runner/StatusUpdatePanel.tsx`,
`ProofUploadButton.tsx`

---

### R5. Runner Earnings Summary

```
generate_screen_from_text · deviceType: MOBILE · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Design a mobile earnings summary screen for a gig worker.

Components:
- Period selector: Today / This Week / This Month
- Total earnings large heading
- Jobs completed count
- Earnings bar chart (weekly)
- Recent payouts list: date, job count, amount, status badge
- "Request Payout" button

Style: clean, financial dashboard feel, navy + lime, mobile-first. Tailwind-compatible.
```

**Components:** `app/(runner)/earnings/page.tsx`, `components/runner/EarningsChart.tsx`, `PayoutList.tsx`

---

## Admin Panel Screens

### A1. Admin Dashboard

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Design a desktop admin dashboard for a queue-runner service platform.

Layout: left sidebar 250px + main content.

Sidebar nav links: Dashboard, Users, Runners, Jobs, Services, Disputes, Analytics

Main content:
- Page header: "Admin Overview"
- Stats row: Active Jobs, Registered Clients, Active Runners, Open Disputes
- Live Active Jobs table: Client, Runner, Service, Branch, Status, Time Elapsed, Actions
- Pending Runner Applications section: name, date applied, Approve / Reject buttons

Style: professional admin, neutral background, navy sidebar, inline status badges, Tailwind-compatible.
```

**Components:** `app/admin/page.tsx`, `components/admin/AdminSidebar.tsx`,
`ActiveJobsTable.tsx`, `PendingRunnersList.tsx`, `AdminStatsRow.tsx`

---

### A2. User Management

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Desktop admin user management table.

Features: search bar, role filter (Client / Runner / Admin).
Table columns: Name, Email, Role, Registered Date, Status badge (Active/Suspended), Actions (View, Suspend).
Pagination at bottom.
Style: clean admin table, navy sidebar, alternating rows. Tailwind-compatible.
```

**Components:** `app/admin/users/page.tsx`, `components/admin/UserTable.tsx`, `RoleFilter.tsx`

---

### A3. Runner Management

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Desktop admin runner management screen.

Two sections:
1. Pending Applications table: name, date, ID uploaded, Actions (Approve / Reject / View ID)
2. Active Runners table: name, jobs completed, rating, status, Actions (View, Suspend)

Search + status filter above each table.
Style: clean admin, navy sidebar, status badges coloured. Tailwind-compatible.
```

**Components:** `app/admin/runners/page.tsx`, `components/admin/PendingRunnersTable.tsx`, `ActiveRunnersTable.tsx`

---

### A4. Active Jobs Monitor

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Desktop real-time jobs monitoring screen for an admin.

Layout: left sidebar + main content with live job cards or table.

Jobs row/card: Job ID, Client name, Runner name, Service, Branch, Status badge, Time elapsed, Action (View / Intervene).
Status filter tabs: All / Matching / En Route / Waiting / Near Front / Complete / Cancelled.
Auto-refresh indicator top right.

Style: clean monitoring dashboard, navy sidebar, status badges colour-coded, Tailwind-compatible.
```

**Components:** `app/admin/jobs/page.tsx`, `components/admin/LiveJobsMonitor.tsx`, `JobStatusTabs.tsx`

---

### A5. Service Categories & Pricing

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Desktop admin screen to manage queue service categories and pricing.

Components:
- Table of service categories: icon, name, base price, per-minute rate, active toggle, Edit action
- "Add New Category" button opening a side panel form:
  name, icon selector, description, pricing fields, save + cancel

Style: clean admin settings page, navy sidebar, inline editable rows. Tailwind-compatible.
```

**Components:** `app/admin/services/page.tsx`, `components/admin/ServiceCategoryTable.tsx`, `AddCategoryForm.tsx`

---

### A6. Disputes & Escalations

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_FLASH
```

**Prompt:**
```
Desktop admin disputes management screen.

Table: Dispute ID, Client, Runner, Job ID, Issue Type, Date Raised, Status (Open/Investigating/Resolved), Actions (View, Resolve).
Filter: status, date range, issue type.
Dispute detail side panel on row click: chat transcript, job details, resolution actions.

Style: clean admin, navy sidebar, open disputes highlighted, Tailwind-compatible.
```

**Components:** `app/admin/disputes/page.tsx`, `components/admin/DisputesTable.tsx`, `DisputeDetailPanel.tsx`

---

### A7. Analytics Dashboard

```
generate_screen_from_text · deviceType: DESKTOP · modelId: GEMINI_3_PRO
```

**Prompt:**
```
Desktop analytics dashboard for a service platform admin.

Layout: left sidebar + main content.

Charts/widgets:
- Jobs completed per day (line chart)
- Revenue over time (bar chart)
- Most popular service categories (pie or bar)
- Runner utilisation rate
- Client retention rate
- Average job duration

Time range selector: 7D / 30D / 90D / All time.
Style: data dashboard, clean cards, navy sidebar, chart-forward. Tailwind-compatible.
```

**Components:** `app/admin/analytics/page.tsx`, `components/admin/AnalyticsCharts.tsx`, `MetricCard.tsx`

---

## Per-Screen Execution Checklist

- [x] `generate_screen_from_text`  (use prompt above)
- [x] `get_screen`  (extract layout + components — not HTML)
- [x] Save screenshot (source of truth while building)
- [x] Note components → add to `componentMap.md`
- [x] Build page shell (widths, columns, nav structure)
- [x] Create/reuse UI primitives
- [x] Rebuild components with mock data
- [x] Side-by-side visual QA vs screenshot
- [ ] Connect Express/MongoDB backend
- [ ] Add loading states + empty states
- [x] Responsive check
- [ ] Final polish after live data

---

## Stitch Quick Reference

| Item | Value |
|------|-------|
| Project Name | SkipQ |
| Project ID | `1726844794520536114` |
| Fast model | `GEMINI_3_FLASH` |
| Quality model | `GEMINI_3_PRO` |
| Process doc | `docs/stitch-dt.md` |
| MCP reference | `docs/stitch.md` |
| Product brief | `docs/prompt.md` |

---

*SkipQ Stitch Roadmap v2 · March 2026 — updated to reflect correct product (queue-skipping platform)*
