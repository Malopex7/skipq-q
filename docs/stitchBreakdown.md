
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
