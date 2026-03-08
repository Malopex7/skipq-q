
# Screen: Mobile Login

## Layout
- Centered mobile card layout
- Logo top center
- Main card: Role toggle at top, login form fields, sign-in button
- Links below main card (Forgot password, Register)
- Social Login at bottom

## Components
- `RoleToggle`
- `LoginForm`
- `SocialLoginButton`

## Spacing
- page padding: `px-6 py-12`
- card padding: `p-6`
- element gap: `gap-4`

## Surface
- card radius: `rounded-2xl`
- input radius: `rounded-xl`
- shadow: `shadow-md`

## Typography
- Logo/Tagline: `text-2xl font-bold`
- Buttons: `text-base font-semibold`

---

# Screen: C3 Select Service Type

## Layout
- Mobile-first, vertical stack
- Page header (title + subtitle)
- Sticky or top search bar
- Main content: 2-column grid of category cards
- Bottom padding for safe area

## Components
- `PageHeader`
- `SearchFilter`
- `ServiceCategoryGrid`
  - `CategoryCard`

## Spacing
- grid gap: `gap-4`
- card padding: `p-4`

## Surface
- search input: `rounded-full` or `rounded-xl`
- cards: `rounded-xl`, `border`
- selected card: `border-primary` ring

## Cards
- Center-aligned icon `h-8 w-8`
- Category Title `text-sm font-semibold`
- Wait time `text-xs text-muted-foreground`

---

# Screen: C4 Select Branch/Location

## Layout
- Mobile-first list stack
- Page header: "Choose a branch" + selected service
- Top actions: Search input and "Use my location" button
- Main content: Stacked list of branch cards
- Safe area padding at bottom

## Components
- `PageHeader`
- `SearchFilter` (reused)
- `LocationButton`
- `BranchList`
  - `BranchCard`

## Spacing
- list gap: `gap-3`
- card padding: `p-4` or `p-5`

## Surface
- cards: `rounded-xl`, `bg-background`, `border`
- badges: `rounded-full`, colored by urgency (red/orange/green)

## Typography
- Branch name: `text-base font-bold`
- Area/Distance: `text-sm text-muted-foreground`
- Badge text: `text-xs font-semibold`

---

# Screen: C5 Booking Detail

## Layout
- Mobile-first, vertical form stack
- Page header: "Booking Details"
- Summary card: selected service + branch
- Date picker (horizontal scroll of dates)
- Time slot selector (chips for Morning / Afternoon / Specific Time)
- Special instructions textarea
- Document type selector
- Price estimate display (bottom, fixed or inline)
- Confirm & Find Runner button (large primary)

## Components
- `PageHeader`
- `BookingSummaryCard`
- `BookingForm`
  - `DatePicker`
  - `TimeSlotPicker`
  - `SpecialInstructionsInput`
  - `DocumentTypeSelector`
- `PriceEstimateDisplay`

## Spacing
- form gap: `gap-6`
- element padding: `p-4` or `p-5`

## Surface
- inputs and selectors: `rounded-xl`, `border-slate-200`
- summary card: `rounded-2xl`, `bg-slate-50`, `border`

## Typography
- Section headers: `text-sm font-semibold`
- Price text: `text-2xl font-bold text-primary`

---

# Screen: C6 Finding Runner

## Layout
- Full-screen height, map-forward mobile layout
- Top 60%: pulsing map background with central pin
- Map overlay: "Finding a Runner Near You..." status with animation
- Bottom 40%: absolute positioned white surface / card
- Floating Job Summary: service name, date/time, estimated price
- Floating Action: "Cancel Request" (light gray, secondary styling)

## Components
- `MatchingMapBackground`
- `MatchingStatusOverlay`
- `JobSummaryCard`
- `CancelSearchButton`

## Spacing
- Bottom floating card padding: `p-6` or `p-8`
- Button margins: `mt-4`

## Surface
- Summary card: `bg-white`, `rounded-t-3xl` or `rounded-2xl`, high shadow `shadow-lg`

## Typography
- Status text: `text-lg font-bold text-primary`
- Summary title: `text-base font-semibold text-foreground`
- Summary details: `text-sm text-muted-foreground`

---

# Screen: C7 Live Queue Tracker

## Layout
- Mobile-first, vertical stack
- Page header: "Live Tracker" or back button
- Runner info card at top: photo, name, star rating, "Chat" action
- Large ETA display centrally placed
- Vertical status progress bar / steps: Accepted -> En Route -> Arrived -> Waiting -> Near Front -> Complete
- Step active state highlighted with lime green icon and bold label
- Auxiliary actions: "Update Instructions" button at bottom

## Components
- `RunnerProfileCard`
- `EtaDisplay`
- `QueueProgressTracker`
  - `ProgressStepItem`
- `TrackerActions`

## Spacing
- Global padding: `p-6`
- Card padding: `p-5`
- Step spacing: `gap-6`

## Surface
- Cards: `rounded-2xl`, `bg-white`, `shadow-sm`, `border`
- Status icons: `rounded-full`, bright green `bg-[#80f20d]` for active, gray for inactive

## Typography
- ETA text: `text-3xl font-extrabold text-navy`
- Active Step Label: `font-bold text-foreground`
- Inactive Step Label: `font-medium text-muted-foreground`

---

# Screen: C8 Chat with Queue Runner

## Layout
- Mobile-first, vertical chat interface
- Chat header: sticky top, runner avatar, name, and "Active" status indicator
- Message thread: scrollable area, right-aligned blue bubbles (client), left-aligned gray bubbles (runner)
- Time separators: centered timestamp chips
- Bottom action area: fixed, text input field, send button, and horizontal scroll of quick replies above input

## Components
- `ChatHeader`
- `MessageBubble`
- `ChatThread`
- `QuickReplies`
- `ChatInputArea`

## Spacing
- Thread padding: `p-4`
- Message gap: `gap-2`
- Input layout: `p-4`

## Surface
- Client bubble: `bg-primary`, `text-white`, `rounded-2xl rounded-br-sm`
- Runner bubble: `bg-slate-100`, `text-foreground`, `rounded-2xl rounded-bl-sm`
- Background: `bg-slate-50`

## Typography
- Bubble text: `text-sm leading-relaxed`
- Timestamps: `text-xs text-muted-foreground font-medium`

---

# Screen: C9 Client Dashboard

## Layout
- Mobile-first, vertical scrolling dashboard
- Header: Profile greeting and avatar
- High-priority section: "Active Booking" card (prominent, contains tracking CTA)
- Main feed: "Recent Activity" list of stacked cards
- Floating Action Button (FAB): Bottom right for "Book New Queue"
- Fixed Bottom Navigation: Home, My Jobs, Chat, Profile

## Components
- `DashboardHeader`
- `ActiveJobBanner`
- `RecentJobsList`
  - `JobHistoryCard`
- `BookQueueFab`
- `ClientBottomNav`

## Spacing
- Global side padding: `px-4` or `px-6`
- Section gap: `mt-8`
- Stack gap: `gap-4`

## Surface
- Cards: `bg-white`, `rounded-2xl`, `border border-slate-100`, `shadow-sm`
- Background: `bg-slate-50`
- Active State / Tracker CTA: `bg-[#80f20d]` or primary blue

## Typography
- Section Titles: `text-lg font-bold text-foreground`
- Card Titles: `font-semibold text-base`
- Badges: `text-xs font-semibold`

---

# Screen: C10 Job Completion Receipt

## Layout
- Mobile-first, vertical scroll
- Header Area: Large green checkmark icon, "Queue Complete!" title
- Summary Card: Centered block containing job details (Branch, Runner, Duration, Total Cost)
- Rating Section: "Rate your runner" text, 5 large interactive stars, optional comment textarea
- Payment Note: Small text indicating the payment method used
- Fixed Bottom Actions: Primary "Book Another Queue" button, Secondary "Back to Home" outline button

## Components
- `CompletionHeader`
- `ReceiptSummaryCard`
- `RunnerRating`
- `ReceiptActions`

## Spacing
- Global padding: `px-6 py-8`
- Button Stack: `gap-3`
- Top Spacing: `mt-12 mb-8`

## Surface
- Summary Card: `bg-slate-50`, `rounded-2xl`, `p-6`
- Icon: `bg-[#80f20d]`, `text-white`, `h-20 w-20 rounded-full`
- Primary Action: `bg-primary`, `text-white`
- Secondary Action: `border-slate-200`, `text-slate-700`

## Typography
- Main Title: `text-3xl font-extrabold text-foreground`
- Cost Text: `text-xl font-bold text-primary`
- Labels: `text-sm font-medium text-muted-foreground`

---

# Screen: R1 Runner Onboarding

## Layout
- Mobile-first, vertical form flow
- Header area: "Back to Login" text link, Top progress bar indicating 5 steps
- Title: "Personal Details"
- Form section: Vertical stack of inputs (Full Name, Phone Number, ID Number)
- Bottom sticky area: Large primary Next button

## Components
- `OnboardingProgress`
- `RunnerInputForm`
- `OnboardingLayout`

## Spacing
- Global padding: `px-6 py-8`
- Input gap: `gap-6`
- Form container: `mt-10 mb-24`

## Surface
- Background: `bg-slate-50`
- Inputs: `bg-white`, `rounded-xl`, `border-slate-200`
- Active Progress: `bg-primary`
- Inactive Progress: `bg-slate-200`

## Typography
- Step Title: `text-2xl font-bold text-foreground`
- Input Labels: `text-sm font-semibold text-slate-700`
- Input Text: `text-base`

---

# Screen: R2 Runner Dashboard

## Layout
- Mobile-first, Dark Mode themed
- Header area: "Available Jobs Near You" and Online/Offline Toggle
- Earnings Chip: Today's earnings summary
- Filter Bar: Service type, distance, time chips
- Main Feed: Scrollable list of available queue jobs
- Bottom Navigation: Fixed dark theme navigation (Jobs, Active, Earnings, Profile)

## Components
- `RunnerDashboardHeader`
- `OnlineToggle`
- `EarningsChip`
- `JobFilterBar`
- `JobFeedCard`
- `RunnerBottomNav`

## Spacing
- Global padding: `px-4 py-6`
- Card stack gap: `gap-4`

## Surface
- Background: `bg-slate-950`
- Cards: `bg-slate-900`, `border-slate-800`, `rounded-2xl`
- Accents: `bg-[#80f20d]` (Lime green for pay and toggles)
- Text Primary: `text-white`
- Text Secondary: `text-slate-400`

## Typography
- Section headers: `text-xl font-bold text-white`
- Card titles: `font-semibold text-base text-white`
- Pay amount: `text-xl font-bold text-[#80f20d]`

---

# Screen: R3 Runner Job Review

## Layout
- Mobile-first, Light Mode theme for detail screens
- Top area: Map preview taking up top 25% of screen height
- Middle area: Overlapping detail card containing:
  - Header: Service name and branch
  - Grid points: Scheduled time, duration, documents needed
  - Special Instructions block
  - Earnings block
- Bottom sticky area: Large primary Accept button and secondary Decline text link

## Components
- `JobDetailMap`
- `JobDetailCard`
- `JobActionFooter`

## Spacing
- Global padding: `px-5 py-6`
- Card overlap margin: `-mt-6`
- Detail grid gap: `gap-4`

## Surface
- Background: `bg-slate-100`
- Card: `bg-white`, `rounded-[2rem]`, `shadow-xl`, `border border-slate-100`
- Icons/Badges: `bg-primary/10`, `text-primary`

## Typography
- Main title: `text-2xl font-bold text-foreground`
- Data labels: `text-sm font-semibold text-muted-foreground`
- Data values: `text-base font-semibold text-foreground`

---

# Screen: R4 Runner Active Job

## Layout
- Mobile-first, Light Mode theme focused on large actions
- Header: Minimalist header with "Active Job" and service/client name
- Main stage: Current status card (large centered text)
- Primary Action area: Huge button for the next status transition
- Secondary Actions: Chat with client, Upload Proof (when applicable), Report Issue

## Components
- `ActiveJobHeader`
- `CurrentStatusCard`
- `StatusUpdateAction`
- `ProofUploadButton`

## Spacing
- Global padding: `px-6 py-8`
- Button gaps: `gap-4`

## Surface
- Background: `bg-slate-50`
- Status Card: `bg-white`, `border-slate-200`, `shadow-md`
- Primary CTA: `bg-[#80f20d]`
- Secondary CTA: `bg-slate-900 text-white`

## Typography
- Job Title: `text-xl font-bold text-slate-900`
- Status Text: `text-2xl font-black text-slate-800`
- CTA Text: `text-lg font-bold`

---

# Screen: R5 Runner Earnings Summary

## Layout
- Mobile-first, Light Mode theme with Navy and Lime aesthetics
- Top Navigation: Segmented control (Today/Week/Month)
- Hero Section: Large "Total Earnings" amount and completed jobs count
- Middle Section: Weekly bar chart representing daily earnings
- List Section: Recent payouts with dates, counts, and amounts
- Bottom sticky area: Primary request payout button

## Components
- `PeriodSelector`
- `EarningsHero`
- `EarningsChart`
- `PayoutList`
- `PayoutCard`

## Spacing
- Global padding: `px-6 py-6`
- Section gap: `gap-8`
- List gap: `gap-4`

## Surface
- Background: `bg-slate-50`
- Cards: `bg-white`, `border-slate-100`
- Chart accents: `bg-[#80f20d]`
- Badges: `bg-green-100 text-green-700`

## Typography
- Hero Amount: `text-4xl font-extrabold text-slate-900`
- Chart Labels: `text-xs font-semibold text-slate-400`
- List titles: `text-base font-bold text-slate-900`

---

# Screen: A1 Admin Dashboard

## Layout
- Desktop-first, professional neutral theme
- Left Sidebar (Fixed, 250px): Navigation links, company logo
- Top Nav/Header: Page title and user profile block
- Main Content Area:
  - Top: 4 Stat Cards in a row (Active Jobs, Clients, Runners, Disputes)
  - Middle: Wide table for Live Active Jobs
  - Right Side Panel (or split layout): Pending Runner Applications list

## Components
- `AdminSidebar`
- `AdminHeader`
- `AdminStatsRow`
- `StatCard`
- `ActiveJobsTable`
- `PendingRunnersList`
- `PendingRunnerCard`

## Spacing
- Global padding: `p-8`
- Sidebar width: `w-[250px]`
- Section gaps: `gap-6`

## Surface
- Main Background: `bg-slate-50`
- Sidebar: `bg-slate-900`
- Cards/Tables: `bg-white`, `border-slate-200`, `shadow-sm`
- Primary Accents: `bg-primary`, `bg-blue-600`

## Typography
- Page Title: `text-2xl font-bold text-slate-900`
- Stat Values: `text-3xl font-bold text-slate-900`
- Table Headers: `text-xs font-semibold text-slate-500 uppercase tracking-wider`
- Sidebar Links: `text-sm font-medium text-slate-300`

---

# Screen: A2 User Management

## Layout
- Desktop-first re-use of Admin Shell (sidebar + main)
- Toolbar: Search input + Role dropdown filter
- Main Area: Wide data table with alternating row colors
- Footer: Pagination controls

## Components
- `RoleFilter`
- `UserTable`
- `UserTableRow`
- `PaginationBar`

## Spacing
- Table cell padding: `px-6 py-4`
- Toolbar gap: `gap-4`

## Surface
- Even rows: `bg-white`
- Odd rows: `bg-slate-50`
- Active badge: `bg-green-100 text-green-700`
- Suspended badge: `bg-red-100 text-red-700`
- Role badge (Client): `bg-blue-100 text-blue-700`
- Role badge (Runner): `bg-purple-100 text-purple-700`
- Role badge (Admin): `bg-slate-200 text-slate-700`

## Typography
- Table cell: `text-sm text-slate-700`
- Name: `text-sm font-semibold text-slate-900`

---

# Screen: A3 Runner Management

## Layout
- Desktop-first re-use of Admin Shell (sidebar + main)
- Section 1: Pending Applications table (name, date, ID link, Approve/Reject buttons)
- Section 2: Active Runners table (name, jobs, rating, status, View/Suspend)
- Each section has its own search + status filter toolbar

## Components
- `PendingApplicationsTable`
- `RunnerTable`

## Surface
- Approve: `bg-green-600 text-white`
- Reject: `bg-red-600 text-white`
- Online badge: `bg-green-50 text-green-700`
- Offline badge: `bg-slate-100 text-slate-500`
- Suspended badge: `bg-red-50 text-red-700`

## Typography
- Section headings: `text-lg font-bold text-slate-900`
- Rating: `text-sm font-semibold text-yellow-600`
