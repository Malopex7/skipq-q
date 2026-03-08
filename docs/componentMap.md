
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

## Sections
- `ServiceCategoryGrid`
- `BranchList`
- `BookingForm`
- `MatchingScreen`

## UI Primitives
- `CategoryCard`
- `SearchFilter`
- `BranchCard`
- `StatusBadge` (for wait times)
- `TimeSlotPicker`
- `BookingSummaryCard`
- `JobSummaryCard`
