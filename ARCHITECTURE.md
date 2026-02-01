# 🎨 Samson Landing Page - Visual Architecture

## Page Layout & Components

```
┌────────────────────────────────────────────────────────────┐
│                    NAVIGATION BAR                          │
│  [Logo] [About] [Solutions] [Branches] [Contact]  [Button] │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ╔══════════════════╗    ╔════════════════════════════╗  │
│  ║ HERO SECTION     ║    ║  HERO INFO CARD            ║  │
│  ║                  ║    ║                            ║  │
│  ║ • Title          ║    ║ • Response Time            ║  │
│  ║ • Subtitle       ║    ║ • Availability             ║  │
│  ║ • CTAs           ║    ║ • Chat Button              ║  │
│  ║ • Stats Grid     ║    ║                            ║  │
│  ╚══════════════════╝    ╚════════════════════════════╝  │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ ABOUT SECTION                                              │
│ ┌──────────────────┐  ┌──────────────────────────────┐   │
│ │ Company Story    │  │ Timeline (1928-2004)         │   │
│ │                  │  │ ├─ 1928: Founded             │   │
│ │ Historical text  │  │ ├─ 1976: Relaunched          │   │
│ │ about Samson     │  │ ├─ 1988: Caskets             │   │
│ │ Group            │  │ ├─ 1997: Memorial Garden    │   │
│ │                  │  │ ├─ 2000: Vigil Spaces       │   │
│ │                  │  │ └─ 2004: Flower Farm        │   │
│ └──────────────────┘  └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ SOLUTIONS SECTION (Light Background)                       │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│ │ Content      │  │ AI Chat      │  │ Social Media │     │
│ │ Management   │  │ Support      │  │ Integration  │     │
│ │ [Learn more] │  │ [Learn more] │  │ [Learn more] │     │
│ └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ BRANCHES SECTION                                           │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│ │ Imus Branch  │  │ RSMG Garden  │  │ SDMG Garden  │     │
│ │ 11 chapels   │  │ 6 hectares   │  │ Premium lots │     │
│ └──────────────┘  └──────────────┘  └──────────────┘     │
│ ┌──────────────┐  ┌──────────────┐                        │
│ │ Mabolo       │  │ San Francisco│                        │
│ │ 8 chapels    │  │ 5 chapels    │                        │
│ └──────────────┘  └──────────────┘                        │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ AI CHAT SECTION (Light Background)                         │
│ ┌──────────────────┐  ┌────────────────────┐             │
│ │ CRM Features     │  │ Chat Widget        │             │
│ │                  │  │ ┌────────────────┐ │             │
│ │ • Inquiry        │  │ │ Samson Support │ │             │
│ │   Capture        │  │ ├────────────────┤ │             │
│ │ • Branch         │  │ │ Assistant: ...  │ │             │
│ │   Routing        │  │ │ User: ...       │ │             │
│ │ • 24/7 Support   │  │ ├────────────────┤ │             │
│ │                  │  │ │ [Input] [Send] │ │             │
│ │                  │  │ └────────────────┘ │             │
│ └──────────────────┘  └────────────────────┘             │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ CONTENT EDITOR SECTION                                     │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ [Hero Title Input Field]                            │   │
│ │ [Hero Subtitle Textarea]                            │   │
│ │ [About Text Textarea]                               │   │
│ │ [Contact Email Input]                               │   │
│ │ Status: "Changes are saved automatically"           │   │
│ └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ CONTACT SECTION (Light Background)                         │
│ ┌──────────────────┐  ┌─────────────────────────────┐    │
│ │ Contact Form     │  │ Contact Card (Dark)         │    │
│ │                  │  │                             │    │
│ │ [Name Input]     │  │ Samson Support              │    │
│ │ [Email Input]    │  │ Address: 145 Bayan Luma... │    │
│ │ [Phone Input]    │  │                             │    │
│ │ [Message TextA]  │  │ Email: bahay_ugnayan@...   │    │
│ │ [Send Button]    │  │ Phone: (046) 471-2675      │    │
│ │                  │  │ [Social Links]              │    │
│ │ Status msgs      │  │                             │    │
│ └──────────────────┘  └─────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                    FOOTER                                  │
│  [Logo] Samson Group      [Links] About | Solutions | ... │
│  Service with love...              Contact                │
└────────────────────────────────────────────────────────────┘
```

## Color Scheme

```
Primary Colors:
┌─────────────────┐
│ Purple: #7c5cff │ (Accent)
│ Cyan: #00c2ff   │ (Secondary)
│ Dark: #111827   │ (Buttons, headers)
└─────────────────┘

Background:
┌─────────────────────────┐
│ Light: #f6f7fb          │ (Main background)
│ Muted: #f0f2f8/#e8ebf2  │ (Section backgrounds)
│ White: #ffffff          │ (Cards)
└─────────────────────────┘

Text:
┌─────────────────────────┐
│ Foreground: #0e1024     │ (Primary text)
│ Muted: #5c647a          │ (Secondary text)
│ Light: #cbd5f5          │ (On dark backgrounds)
└─────────────────────────┘
```

## Responsive Breakpoints

```
Mobile (< 720px)
├─ Single column layout
├─ Stack cards vertically
├─ Touch-friendly buttons
└─ Full-width sections

Tablet (720px - 1200px)
├─ 2-column grids where applicable
├─ Adjusted spacing
└─ Side-by-side cards

Desktop (> 1200px)
├─ Multi-column layouts
├─ Full animations
└─ Expanded spacing
```

## Sections & Heights

```
Navigation:        ~60px (sticky)
Hero:              ~600px (variable)
About:             ~500px
Solutions:         ~400px
Branches:          ~500px
AI Chat:           ~600px
Content Editor:    ~400px
Contact:           ~500px
Footer:            ~150px
─────────────────
Total:             ~3710px average
```

## Interactive Elements

### Buttons
```
Primary Button (Gradient)
┌──────────────────────┐
│ Schedule Now →       │ 
└──────────────────────┘
Background: #7c5cff → #00c2ff
Color: White
Padding: 12px 22px
Border-radius: 12px

Ghost Button (Outline)
┌──────────────────────┐
│ Learn More           │
└──────────────────────┘
Border: 1px solid #d0d5e3
Padding: 12px 22px
Border-radius: 12px

Text Button
Explore More →
Color: #7c5cff
Font-weight: 600
No background
```

### Input Fields
```
Input/Textarea
┌─────────────────────────────────┐
│ Email: [                        │]
│                                 │
│ Message:                        │
│ [                               │]
│ [                               │]
└─────────────────────────────────┘
Border: 1px solid #d8dce8
Border-radius: 12px
Padding: 12px 14px
Font-size: 14px
```

### Cards
```
Card Container
┌────────────────────────────┐
│ ╔════════════════════════╗ │
│ ║ Card Title             ║ │
│ ║                        ║ │
│ ║ Card content text...   ║ │
│ ║ [Button]               ║ │
│ ╚════════════════════════╝ │
│                            │
└────────────────────────────┘
Background: White or #111827
Border-radius: 16-24px
Box-shadow: 0 12px 30px rgba(...)
Padding: 16-28px
```

## Typography

```
Font Family: Manrope (sans-serif)
Import: Google Fonts

Sizes Used:
H1: clamp(2.4rem, 4vw, 3.5rem)   [2.4-3.5 rem]
H2: clamp(1.8rem, 3vw, 2.6rem)   [1.8-2.6 rem]
H3: 1.2rem / 1.3rem
H4: 1rem
P:  0.9-1.1rem (14-18px)
Sm: 0.8rem / 0.813rem (13px)
Xs: 0.75rem / 0.812rem (12px)

Line Heights:
Headings: 1.2
Body: 1.5-1.8
Labels: 1.0
```

## Spacing System

```
Gap/Padding increments:
4px    (xs)
8px    (sm)
12px   (md)
16px   (lg)
20px   (xl)
24px   (2xl)
28px   (3xl)
32px   (4xl)

Section Padding: 72px (vertical), 6vw (horizontal)
Card Padding: 16-28px
Border-radius: 12-24px
```

## Animation Principles

```
Transitions: 0.3s ease
Hover effects: Subtle scale/shadow
Smooth scrolling enabled
GPU-accelerated transforms
No jarring movements
Accessibility: Respects prefers-reduced-motion
```

---

This architecture creates a modern, professional landing page that's:
✨ Visually appealing
📱 Fully responsive
⚡ Fast loading
♿ Accessible
🎯 Goal-oriented
