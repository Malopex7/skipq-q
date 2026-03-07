# SkipQ — Stitch → Tailwind UI Standard Template

> **Purpose**: This is the standard operating procedure for every UI screen in this project.  
> Antigravity + Stitch MCP + Next.js + Tailwind + shadcn/ui + MENN stack.

---

## Core Principle

```
Prompt → Stitch MCP → inspect layout/components → rebuild React components
```

> ❌ Never: Prompt → Stitch → copy HTML → paste into Next.js  
> ✅ Always: Prompt → Stitch → inspect structure → rebuild clean components

Stitch is a **UI architect**. You are the engineer turning that architecture into a clean component system.

---

## The Master Loop

```
generate_screen_from_text
        ↓
get_screen  (inspect layout + components — ignore HTML)
        ↓
save screenshot  (source of truth)
        ↓
write stitchBreakdown.md
        ↓
build shell in Next.js
        ↓
define primitives
        ↓
rebuild components with mock data
        ↓
visual QA side-by-side
        ↓
connect backend
        ↓
final polish pass
```

---

## Phase 0 — Generate the Right Screen

**Golden rules:**
- Generate **one screen at a time** — never the full app
- Good targets: `dashboard screen`, `profile page`, `settings page`, `service card`, `booking modal`, `navbar`, `sidebar`

### Standard Stitch Prompt Template

```
Design a modern web application screen.

Layout constraints:
- Centered container, max width ~1280px
- Flexbox and grid layouts
- Clear vertical spacing rhythm between sections
- Sidebar width ~240–260px if present
- Cards in responsive grid

Component structure:
- Reusable card components
- Consistent button styles
- Search inputs and filters
- Section headers
- Content grids

Visual style:
- Rounded cards
- Soft shadows
- Clean typography hierarchy
- Minimal color palette
- Plenty of whitespace

Spacing system:
- Consistent spacing similar to Tailwind scale (4, 8, 16, 24, 32)
- Consistent card padding
- Balanced gaps between grid items

Responsiveness:
- Desktop layout with sidebar and main content
- Tablet stacked layout
- Mobile single column

Avoid:
- Overly complex nested layouts
- Decorative floating shapes or graphics
- Fixed pixel positioning

Structure the layout in a way that can be easily recreated with Tailwind CSS utility classes.
```

### Screen-Specific Starter Prompts

**Dashboard:**
```
Create a modern SaaS dashboard. Left sidebar nav. Main content column with stats cards and search.
Right panel for activity. Centered 1280px. Responsive grid. Rounded cards. Neutral palette.
Tailwind-friendly spacing. Sidebar collapses on mobile.
```

**Marketplace Feed (SkipQ):**
```
Design a service marketplace feed. Left sidebar nav. Main feed: search bar, category filters,
service card grid (3-col desktop, 2-col tablet, 1-col mobile). Cards: title, description, price,
book button. Rounded, shadowed, neutral palette. Max width 1280px.
```

**Booking Modal:**
```
Design a booking modal. Centered card ~500px wide. Vertical form stack: service summary,
date picker, time selector, confirm button. Rounded, subtle shadow, consistent spacing.
Large primary action button.
```

---

## Phase 1 — Inspect the Screen

```
get_screen → focus on: layout + components (ignore html)
```

**Extract:**

```yaml
Layout zones:
  - top bar / sidebar / main content / right rail / footer / modal?

Repeated components:
  - nav item / stat card / service card / filter chip / section header / action button
```

---

## Phase 2 — Write stitchBreakdown.md

Before touching code, create `docs/stitchBreakdown.md`:

```markdown
# Screen: [Name]

## Layout
- max-w: 1280px, centered
- columns: left sidebar 250px | main flex-1 | right rail 320px

## Components
- SidebarNav, SearchBar, FilterTabs, ServiceCard, StatsCard, ActivityPanel

## Spacing
- page padding: 24px
- section gap: 24px
- card padding: 16px
- grid gap: 24px

## Surface
- radius: rounded-xl / rounded-2xl
- shadow: shadow-sm
- border: border

## Typography
- page title: text-2xl font-semibold
- section title: text-lg font-semibold
- card title: text-base font-medium
- body: text-sm
- muted: text-sm text-muted-foreground
```

---

## Phase 3 — Component Map

Create `docs/componentMap.md`:

```markdown
## Layout
- AppSidebar, DashboardShell, RightRail

## Sections
- DashboardHeader, FiltersBar, ServicesGrid, ActivityPanel

## Cards
- ServiceCard, StatsCard, ActivityCard

## UI Primitives
- SurfaceCard, SectionHeader, PrimaryButton, InputShell, EmptyState
```

Folder structure:

```
components/
  layout/
    SidebarNav.tsx
    DashboardShell.tsx
  cards/
    ServiceCard.tsx
    StatsCard.tsx
  sections/
    ActivityPanel.tsx
    FiltersBar.tsx
  forms/
    SearchBar.tsx
  ui/
    SurfaceCard.tsx
    SectionHeader.tsx
    PrimaryButton.tsx
    PageContainer.tsx
```

---

## Phase 4 — Build the Shell First

**Do not start with cards. Build the outer layout first.**

```tsx
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <aside className="w-64 shrink-0">
          <SidebarNav />
        </aside>
        <section className="min-w-0 flex-1">
          <DashboardFeed />
        </section>
        <aside className="w-80 shrink-0">
          <ActivityPanel />
        </aside>
      </div>
    </main>
  )
}
```

**Stop and compare to screenshot. Fix shell before proceeding.**

---

## Phase 5 — Define UI Primitives

Create once. Reuse everywhere. One radius, one shadow, one spacing standard.

```tsx
// components/ui/PageContainer.tsx
export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
}

// components/ui/SurfaceCard.tsx
export function SurfaceCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-background p-4 shadow-sm">
      {children}
    </div>
  )
}

// components/ui/SectionHeader.tsx
export function SectionHeader({ title }: { title: string }) {
  return <h2 className="text-lg font-semibold">{title}</h2>
}
```

---

## Phase 6 — Rebuild Components with Mock Data

Use **realistic mock data** before backend. Realistic content reveals real spacing, wrapping, and alignment issues.

```tsx
const services = [
  { id: 1, name: "Window Cleaning", description: "Professional glass cleaning.", price: "R250" },
  { id: 2, name: "Carpet Cleaning", description: "Deep cleaning with stain removal.", price: "R450" },
]

// components/cards/ServiceCard.tsx
export default function ServiceCard({ service }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md">
      <h3 className="text-base font-semibold">{service.name}</h3>
      <p className="text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex justify-between">
        <span className="font-medium">{service.price}</span>
        <button className="text-primary">Book</button>
      </div>
    </div>
  )
}
```

---

## Phase 7 — Visual QA (Before Backend)

**Check every item:**

| Area | Check |
|------|-------|
| Layout | Widths correct, columns right, no overflow |
| Cards | Equal visual weight, consistent padding/radius/shadow |
| Text | Correct hierarchy, line clamped where needed, muted is muted |
| Controls | Buttons same height, inputs aligned, icons sized right |
| Responsive | Desktop ✓, tablet stacks ✓, mobile single column ✓ |

**Do not move to backend until this passes.**

---

## Phase 8 — Backend Integration

```
Next.js page → API route / Express → MongoDB
```

```tsx
// TanStack Query pattern
const { data: services } = useQuery({
  queryKey: ["services"],
  queryFn: () => fetch("/api/services").then(r => r.json()),
})
```

---

## Phase 9 — Add Interactions

Use **shadcn** for primitives only:

| Use shadcn for | Build custom for |
|---------------|-----------------|
| `Dialog`, `DropdownMenu`, `Tabs`, `Sheet`, `Button`, `Input`, `Select` | Service cards, stats tiles, activity items, pricing cards, feature grids |

Add: modals, filters, dropdowns, loading skeletons, empty states, auth gating.

---

## Phase 10 — Final Polish Pass

After live data, recheck:
- Text wrapping changed?
- Cards became uneven heights?
- Empty states display correctly?
- Long names breaking layout?
- API-loaded content changed card heights?

---

## Tailwind Quick-Reference Mapping

| Stitch Concept | Tailwind |
|----------------|----------|
| Card container | `rounded-2xl border shadow-sm p-4` |
| Section spacing | `space-y-6` |
| Grid layout | `grid grid-cols-3 gap-6` |
| Sidebar layout | `flex` |
| Page container | `max-w-7xl mx-auto px-6 py-8` |
| Buttons | `px-4 py-2 rounded-lg` |
| Sidebar | `w-64 shrink-0` |
| Right rail | `w-80 shrink-0` |
| Muted text | `text-sm text-muted-foreground` |
| Card title | `text-base font-medium` |
| Page title | `text-2xl font-semibold` |

---

## Stitch MCP Call Checklist (Per Screen)

```
[ ] generate_screen_from_text  (use template prompt above)
[ ] get_screen  (extract layout + components, ignore HTML)
[ ] Save screenshot  (keep open side-by-side)
[ ] Write stitchBreakdown.md
[ ] Write componentMap.md
[ ] Build page shell (widths, columns, gaps)
[ ] Create/reuse UI primitives
[ ] Rebuild components with mock data
[ ] Visual QA pass  (layout + cards + text + responsive)
[ ] Connect backend (TanStack Query)
[ ] Add interactions (shadcn + custom)
[ ] Final polish pass (live data check)
```

---

## The 30-Minute Rebuild Flow

| Time | Task |
|------|------|
| 0–5 min | Generate screen, save screenshot, inspect, write breakdown |
| 5–10 min | Build page shell, lock widths and columns |
| 10–15 min | Create/reuse primitives, write component map |
| 15–25 min | Rebuild major sections with mock data, match spacing + type |
| 25–30 min | Side-by-side compare, adjust details |
| After | Backend + interactions + polish |

---

## ❌ Don't Do This

- Paste full HTML into `page.tsx`
- Style while also building API logic
- Use five different card styles on one screen
- Rebuild the whole app in one Stitch prompt
- Trust memory instead of screenshot comparison
- Overuse shadcn defaults and wonder why it looks generic
- Skip mock data
- Leave spacing to the end

## ✅ Always Do This

- Generate one screen at a time
- Screenshot the final design
- Inspect Stitch structure (not HTML)
- Build shell first
- Define primitives early
- Use realistic mock data
- Compare side-by-side
- Wire logic last

---

*Standard template for SkipQ · March 2026*
