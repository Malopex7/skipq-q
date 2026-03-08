
# Component Map: Auth (Login/Register)

## Layout
- `AuthLayout` (Background & Centered Card Container)

## Sections
- `LoginForm`
- `RegisterForm`

## UI Primitives
- `RoleToggle` (Client vs Runner)
- `PasswordInput` (with show/hide)

---

# Component Map: Client Booking Flow (C3-C6)

## Layout
- `ClientLayout` (Main container, max-width, bottom nav if any)

## Page Views
- `book/page.tsx` (C3 Select Service)
- `book/location/page.tsx` (C4 Select Branch)
- `book/details/page.tsx` (C5 Booking Detail)
- `book/matching/page.tsx` (C6 Finding Runner)
- `book/tracker/page.tsx` (C7 Live Queue Tracker)
- `jobs/[id]/chat/page.tsx` (C8 Chat with Runner)
- `dashboard/page.tsx` (C9 Client Dashboard)
- `jobs/[id]/receipt/page.tsx` (C10 Job Completion Receipt)
- `(runner)/onboard/page.tsx` (R1 Runner Onboarding)
- `(runner)/jobs/page.tsx` (R2 Runner Dashboard)
- `(runner)/jobs/[id]/page.tsx` (R3 Job Detail)
- `(runner)/jobs/[id]/active/page.tsx` (R4 Active Job)
- `(runner)/earnings/page.tsx` (R5 Earnings Summary)
- `admin/page.tsx` (A1 Admin Dashboard)

## Sections
- `ServiceCategoryGrid`
- `BranchList`
- `BookingForm`
- `MatchingScreen`
- `QueueProgressTracker`
- `ChatThread`
- `RecentJobsList`
- `RunnerInputForm`
- `StatusUpdatePanel`
- `PayoutList`
- `AdminStatsRow`
- `ActiveJobsTable`
- `PendingRunnersList`

## UI Primitives
- `CategoryCard`
- `SearchFilter`
- `BranchCard`
- `StatusBadge` (for wait times)
- `TimeSlotPicker`
- `BookingSummaryCard`
- `JobSummaryCard`
- `RunnerProfileCard`
- `EtaDisplay`
- `MessageBubble`
- `QuickReplies`
- `ChatInputArea`
- `DashboardHeader`
- `ActiveJobBanner`
- `JobHistoryCard`
- `BookQueueFab`
- `ClientBottomNav`
- `CompletionHeader`
- `ReceiptSummaryCard`
- `RunnerRating`
- `OnboardingProgress`
- `RunnerDashboardHeader`
- `OnlineToggle`
- `EarningsChip`
- `JobFilterBar`
- `JobFeedCard`
- `RunnerBottomNav`
- `JobDetailMap`
- `JobDetailCard`
- `JobActionFooter`
- `ActiveJobHeader`
- `CurrentStatusCard`
- `StatusUpdateAction`
- `ProofUploadButton`
- `PeriodSelector`
- `EarningsHero`
- `EarningsChart`
- `PayoutCard`
- `AdminSidebar`
- `AdminHeader`
- `StatCard`
- `PendingRunnerCard`
- `RoleFilter`
- `UserTableRow`
- `PaginationBar`
- `PendingApplicationsTable`
- `RunnerTable`
- `JobStatusTabs`
- `LiveJobsMonitor`
- `AutoRefreshIndicator`
- `ServiceCategoryTable`
- `AddCategoryForm`
