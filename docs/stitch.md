# Google Stitch MCP — Comprehensive How-To Guide

> **Google Stitch** is an AI-powered UI design tool from Google Labs that transforms text prompts (and images) into high-quality frontend designs and source code. Accessed through the **Model Context Protocol (MCP)**, it lets AI coding agents like Antigravity (Gemini), Claude Code, and Cursor generate, edit, and manage UI screens programmatically—without ever leaving your editor.

---

## Table of Contents

1. [What Is Stitch?](#1-what-is-stitch)
2. [How It Integrates via MCP](#2-how-it-integrates-via-mcp)
3. [Core Concepts](#3-core-concepts)
4. [Available MCP Tools](#4-available-mcp-tools)
   - [Project Management](#41-project-management)
   - [Screen Generation & Editing](#42-screen-generation--editing)
   - [Variants](#43-variants)
5. [Configuration Options](#5-configuration-options)
   - [Model IDs](#51-model-ids)
   - [Device Types](#52-device-types)
6. [Step-by-Step Workflows](#6-step-by-step-workflows)
   - [Workflow A: Generate a New Screen from Scratch](#workflow-a-generate-a-new-screen-from-scratch)
   - [Workflow B: Edit an Existing Screen](#workflow-b-edit-an-existing-screen)
   - [Workflow C: Generate Design Variants](#workflow-c-generate-design-variants)
   - [Workflow D: Full Multi-Screen App Flow](#workflow-d-full-multi-screen-app-flow)
7. [Prompting Best Practices](#7-prompting-best-practices)
8. [Common Pitfalls & Tips](#8-common-pitfalls--tips)
9. [Typical Agentic Usage Patterns](#9-typical-agentic-usage-patterns)

---

## 1. What Is Stitch?

Google Stitch (available via [labs.google](https://labs.google)) is an **experimental AI UI generator** powered by Gemini models (Gemini 2.5 Flash by default; Gemini 2.5 Pro in higher-quality mode).

**Key capabilities:**
- Generate complete UI screens from natural language descriptions
- Edit specific elements on existing screens via text prompts
- Produce multiple design **variants** from a single prompt
- Output clean **HTML/CSS** frontend code
- Export to **Figma**
- Handle mobile, desktop, tablet, and device-agnostic layouts
- Support multi-screen flows (prototype stitching)

---

## 2. How It Integrates via MCP

The **Model Context Protocol (MCP)** is an open standard that acts as a universal bridge between AI agents and external tools. When Stitch is registered as an MCP server in your AI tool (Antigravity, Cursor, Claude Code, Gemini CLI, VS Code), the agent can call Stitch's tools directly.

```
AI Agent (Antigravity / Cursor / Claude Code)
        │
        │  MCP Protocol
        ▼
  Stitch MCP Server
        │
        ▼
  Google Stitch API (Gemini-powered UI generation)
```

**This means:**
- You prompt the AI agent in plain English  
- The agent calls the appropriate Stitch MCP tool  
- Stitch generates or edits the UI  
- The agent retrieves the resulting screen image and/or code  

No manual copy-pasting between tools. No switching tabs.

---

## 3. Core Concepts

| Concept | Description |
|---------|-------------|
| **Project** | A workspace/container. All screens live inside a project. |
| **Screen** | A single UI view/page. Identified by a `screenId`. |
| **Variant** | An alternative design of an existing screen (same concept, different visual treatment). |
| **Model** | The Gemini model powering generation. `GEMINI_3_FLASH` (fast) or `GEMINI_3_PRO` (higher quality). |
| **Device Type** | Target form factor: `MOBILE`, `DESKTOP`, `TABLET`, or `AGNOSTIC`. |
| **Prompt** | Natural language description of what you want to generate or change. |

---

## 4. Available MCP Tools

### 4.1 Project Management

#### `create_project`
Creates a new project container.

```
Parameters:
  title (optional): string — Human-readable project name
```

**Example prompt to agent:**
> "Create a new Stitch project called 'SkipQ Customer Portal'"

---

#### `list_projects`
Lists all your Stitch projects.

```
Parameters:
  filter (optional): "view=owned" | "view=shared"
  - "view=owned"  → Only projects you own (default)
  - "view=shared" → Only projects shared with you
```

**Example prompt to agent:**
> "List all my Stitch projects"

---

#### `get_project`
Retrieves details of a specific project.

```
Parameters:
  name (required): string — Format: "projects/{projectId}"
  Example: "projects/4044680601076201931"
```

---

#### `list_screens`
Lists all screens within a project.

```
Parameters:
  projectId (required): string — The project ID (without "projects/" prefix)
  Example: "4044680601076201931"
```

**Example prompt to agent:**
> "List all screens in Stitch project 4044680601076201931"

---

#### `get_screen`
Retrieves metadata and details for a specific screen.

```
Parameters:
  name       (required): string — "projects/{project}/screens/{screen}"
  projectId  (required): string — Project ID without prefix
  screenId   (required): string — Screen ID without prefix
```

---

### 4.2 Screen Generation & Editing

#### `generate_screen_from_text`
**The main generation tool.** Creates a brand new screen from a text prompt.

```
Parameters:
  projectId   (required): string
  prompt      (required): string — What to generate
  deviceType  (optional): "MOBILE" | "DESKTOP" | "TABLET" | "AGNOSTIC"
  modelId     (optional): "GEMINI_3_FLASH" | "GEMINI_3_PRO"
```

> ⚠️ **This can take a few minutes.** Be patient — do NOT retry on timeout.

**Example prompt to agent:**
> "Generate a dashboard screen in my Stitch project for a cleaning booking admin. Device: desktop. Use Gemini Pro."

**Output includes:**
- `output_components` — May contain text descriptions or **suggestion chips** (like "Yes, make them all responsive"). If suggestions appear, accept one to trigger another generation call.

---

#### `edit_screens`
Edits one or more existing screens using a text prompt.

```
Parameters:
  projectId        (required): string
  selectedScreenIds (required): string[] — Array of screen IDs to edit
  prompt           (required): string — What to change
  deviceType       (optional): "MOBILE" | "DESKTOP" | "TABLET" | "AGNOSTIC"
  modelId          (optional): "GEMINI_3_FLASH" | "GEMINI_3_PRO"
```

> ⚠️ **This can take a few minutes.** Do NOT retry.

**Example prompt to agent:**
> "Edit screen 98b50e2ddc9943efb387052637738f61 in project 4044680601076201931: change the primary color to deep teal and add a notification bell to the navbar."

---

### 4.3 Variants

#### `generate_variants`
Generates multiple alternative designs for an existing screen.

```
Parameters:
  projectId        (required): string
  selectedScreenIds (required): string[] — Screens to generate variants for
  prompt           (required): string — Direction/instruction for variants
  variantOptions   (required): object — Controls generation behavior
    {
      count: number,          // How many variants to create
      creativeRange: number,  // 0.0–1.0 (low = conservative, high = bold)
      aspectsToFocus: string[] // e.g. ["color", "typography", "layout"]
    }
  deviceType  (optional): string
  modelId     (optional): string
```

**Example prompt to agent:**
> "Generate 3 variants of screen [screenId] in project [projectId]. Make them explore different color palettes from dark to light, keeping the same layout."

---

## 5. Configuration Options

### 5.1 Model IDs

| Model | Enum Value | Best For |
|-------|-----------|---------|
| Default | `MODEL_ID_UNSPECIFIED` | Let Stitch decide (usually Flash) |
| **Gemini 2.5 Flash** | `GEMINI_3_FLASH` | Speed, iteration, agentic loops, high-throughput |
| **Gemini 2.5 Pro** | `GEMINI_3_PRO` | Highest quality, complex layouts, nuanced designs |

**Rule of thumb:**
- Use **Flash** when iterating quickly or doing many screens
- Use **Pro** for final high-fidelity designs or when quality matters most

---

### 5.2 Device Types

| Enum Value | Produces |
|-----------|---------|
| `DEVICE_TYPE_UNSPECIFIED` | Stitch decides |
| `MOBILE` | Mobile-first layout (narrow viewports, touch-friendly) |
| `DESKTOP` | Wide layout, sidebars, multi-column grids |
| `TABLET` | Medium-form factor |
| `AGNOSTIC` | Responsive, adapts to all sizes |

---

## 6. Step-by-Step Workflows

### Workflow A: Generate a New Screen from Scratch

1. **Create a project** (if you don't have one):
   > "Create a new Stitch project called 'My App'"
   → Get back a `projectId`

2. **Generate the first screen:**
   > "Generate a mobile login screen with email + password fields, a sign-in button, and a 'Forgot password?' link. Use a dark purple gradient background."
   → Stitch returns a `screenId` and a preview image

3. **Review** the generated screen image

4. **Iterate** with `edit_screens` or generate more screens

---

### Workflow B: Edit an Existing Screen

1. **Know your IDs:**
   - Use `list_projects` to find `projectId`
   - Use `list_screens` to find `screenId`

2. **Call `edit_screens`** with a specific edit prompt:
   > "On screen [screenId]: replace the placeholder avatar with a profile picture upload zone, and move the logout button to a dropdown menu on the top-right."

3. **Retrieve the result** via `get_screen`

4. **Iterate** — make one focused change per call for best results

---

### Workflow C: Generate Design Variants

1. Start from an **existing screen** you like
2. Call `generate_variants`:
   > "Generate 3 variants of this dashboard screen: one light mode, one dark mode, one high-contrast accessibility mode."
3. Compare the variants
4. Pick the best one and continue editing from there

---

### Workflow D: Full Multi-Screen App Flow

```
1. create_project         → "Travel Booking App"
2. generate_screen_from_text → "Home / Search screen" (Desktop)
3. generate_screen_from_text → "Search results with map" (Desktop)
4. generate_screen_from_text → "Booking confirmation" (Desktop)
5. edit_screens           → "Unify the navbar across all three screens"
6. list_screens           → Review all generated screens
7. Export HTML/CSS        → (via stitch-mcp CLI or `get_screen` + code fetch)
8. Integrate into Next.js project
```

---

## 7. Prompting Best Practices

### Structure Your Prompts in 4 Layers

| Layer | What to Include | Example |
|-------|----------------|---------|
| **Context** | Who is it for? | "for a B2B SaaS admin panel" |
| **Structure** | Layout topology | "2-column with sidebar nav on left" |
| **Aesthetic** | The vibe | "clean, minimal, dark mode with cyan accents" |
| **Tech/Device** | Execution medium | "desktop web, modern card-based UI" |

### Good Prompt Examples

```
❌ Vague:
"Make a nice dashboard"

✅ Specific:
"Design a desktop admin dashboard for a cleaning service platform. 
 Show: total bookings count, revenue chart (weekly bar chart), 
 upcoming jobs table with status badges, and a quick-add booking button.
 Style: dark mode, deep navy background, lime green accents, Inter font."
```

```
❌ Too broad when editing:
"Make it look better"

✅ Targeted:
"On the existing screen: change the hero section gradient from blue 
 to a warm amber-to-coral sunset gradient, and increase the CTA 
 button size to be more prominent."
```

### Key Tips

- **One major change per edit call** — smaller, targeted prompts produce better results
- **Use UI/UX terminology**: "navigation bar", "card grid", "hero section", "CTA button", "breadcrumb", "modal"
- **Set the vibe with adjectives**: "professional", "playful", "minimal", "bold", "glassmorphic", "brutalist"
- **Specify exact elements**: "the top-right user avatar", "the sidebar menu item for Reports"
- **Include data examples**: "show 5 sample rows in the table with realistic cleaning job data"
- **Reference screen context when editing**: Stitch needs to know which screen element you mean

---

## 8. Common Pitfalls & Tips

### ⏱️ Patience Is Required
Generation and editing can take **1–3 minutes**. This is normal.
- Do **NOT** call the tool again if it seems to take long
- Wait for the response before chaining more calls

### 🔑 ID Management
Always store and track your `projectId` and `screenId` values — you'll need them for every subsequent call.

```
# Good habit: track IDs
projectId: "4044680601076201931"
homeScreenId: "98b50e2ddc9943efb387052637738f61"
dashboardScreenId: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
```

### 🔄 `output_components` Suggestions
When `generate_screen_from_text` returns suggestion chips (like "Yes, make all screens dark mode"), you can accept one by passing it back as the prompt in another `generate_screen_from_text` call. This is Stitch's way of offering quick follow-up actions.

### 🎨 Consistency Across Screens
To maintain visual consistency across multiple screens:
- Generate a "design system" screen first describing your color palette, typography, and spacing
- Reference it explicitly in subsequent prompts: "maintain the same dark navy/lime green theme established in the Home screen"
- Use `edit_screens` to batch-update common elements (like navbars) across multiple screenIds at once

### 📱 Device Type Matters
Always specify `deviceType` — the same prompt generates very different layouts for `MOBILE` vs `DESKTOP`.

### 🔁 Iterate, Don't Overload
Rather than one giant prompt trying to specify every detail, build up iteratively:
1. Generate the basic structure
2. Edit to refine colors
3. Edit again to adjust typography
4. Edit again to add specific components

---

## 9. Typical Agentic Usage Patterns

### Pattern 1: Design-First Development
```
Prompt Agent → Generate UI in Stitch → Export HTML/CSS → Adapt into React/Next.js components
```

### Pattern 2: Screenshot-to-Code
```
Take screenshot of reference design → Feed to Stitch as image prompt → Get clean Stitch implementation → Export code
```

### Pattern 3: A/B Design Exploration
```
Generate base screen → generate_variants (3 variants, high creative range) → Pick favourite → Edit to perfection → Export
```

### Pattern 4: Rapid Prototyping
```
Describe full app flow in one prompt → Generate all screens sequentially → Link as prototype → Validate with stakeholders
```

### Pattern 5: Design System Propagation
```
Create brand screen (colors, fonts, components) → use_edit_screens on all project screens with "Apply this design system" → Consistent brand across entire app
```

---

## Reference: ID Format Cheat Sheet

| Thing | Format | Example |
|-------|--------|---------|
| Project resource name | `projects/{id}` | `projects/4044680601076201931` |
| Screen resource name | `projects/{pid}/screens/{sid}` | `projects/4044680601076201931/screens/98b50e...` |
| projectId parameter | Just the numeric ID | `4044680601076201931` |
| screenId parameter | Just the hex ID | `98b50e2ddc9943efb387052637738f61` |

> **Note:** The `name` parameter in `get_project` / `get_screen` requires the full `projects/...` format. The `projectId` and `screenId` parameters in all other tools take the short ID **without** the prefix.

---

## Quick Reference Card

```
CREATE PROJECT:   create_project(title?)
LIST PROJECTS:    list_projects(filter?)
GET PROJECT:      get_project(name: "projects/{id}")
LIST SCREENS:     list_screens(projectId)
GET SCREEN:       get_screen(name, projectId, screenId)

GENERATE SCREEN:  generate_screen_from_text(projectId, prompt, deviceType?, modelId?)
EDIT SCREENS:     edit_screens(projectId, selectedScreenIds[], prompt, deviceType?, modelId?)
GEN VARIANTS:     generate_variants(projectId, selectedScreenIds[], prompt, variantOptions)

Models:   GEMINI_3_FLASH (fast) | GEMINI_3_PRO (quality)
Devices:  MOBILE | DESKTOP | TABLET | AGNOSTIC
```

---

*Last updated: March 2026 · Based on Google Stitch MCP server as integrated in Antigravity AI assistant*
