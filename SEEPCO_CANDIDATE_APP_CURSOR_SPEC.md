# Seepco Candidate App — Mobile Web Conversion Spec
> Paste this into Cursor. This converts the existing Expo React Native app into a Next.js mobile web app (PWA). The client views it in Safari on iPhone — it must look and feel like a native app.

---

## What We Are Building

A **mobile-first web app** that replicates the Seepco candidate app experience in the browser. Target viewport: **390px wide (iPhone 14 Pro)**. All screens are designed for mobile. No desktop layout needed. This is a static prototype — no real backend, all mock data.

The client will:
1. Open a Vercel URL in Safari on iPhone
2. See a native-feeling mobile app
3. Optionally tap "Add to Home Screen" for fullscreen mode

---

## Stack

```
Framework:   Next.js 14 (App Router)
Styling:     Tailwind CSS
Language:    TypeScript
Gestures:    @use-gesture/react (for swipe cards only)
Animation:   CSS transitions + Tailwind (no Framer Motion needed)
Icons:       lucide-react
PWA:         next-pwa or manual manifest + meta tags
Deploy:      Vercel
```

Install:
```bash
npx create-next-app@latest seepco-candidate --typescript --tailwind --app --no-src-dir
cd seepco-candidate
npm install lucide-react @use-gesture/react
```

---

## Critical Mobile Web Setup

### Viewport and PWA meta tags — app/layout.tsx

```tsx
export const metadata = {
  title: 'Swype — Find Your Next Job',
  description: 'Discover jobs. Swipe right. Get hired.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Swype',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
}
```

Also add to `<head>`:
```html
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#0a0a0a" />
```

### /public/manifest.json
```json
{
  "name": "Swype — Find Your Job",
  "short_name": "Swype",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### globals.css — mobile-specific base

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

html, body {
  overscroll-behavior: none;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: fixed; /* prevents iOS bounce/scroll */
}

#__next, main {
  height: 100%;
  overflow: hidden;
}

/* Safe area insets for iPhone notch / home indicator */
.pt-safe { padding-top: env(safe-area-inset-top); }
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
.px-safe { padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }
```

### tailwind.config.ts — mobile shell dimensions

```ts
theme: {
  extend: {
    colors: {
      brand: '#0f65ef',
      'ai-badge': '#d0e1fd',
      dark: '#0a0a0a',
      'dark-2': '#1a1a1a',
      'dark-3': '#2a2a2a',
      'border-dark': '#333333',
    },
    fontFamily: {
      display: ['"Charlie Display"', 'DM Sans', 'sans-serif'],
    },
    screens: {
      // Only mobile needed
      'sm': '390px',
    },
  },
}
```

---

## App Shell

The app should be constrained to a mobile width. In `app/page.tsx`:

```tsx
// The app renders inside a max-w-[390px] centered container
// On desktop (if viewing in browser): shows a phone frame
// On real mobile: fills the screen

export default function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-[390px] h-screen max-h-[844px] bg-dark relative overflow-hidden font-display">
        <CandidateApp />
      </div>
    </div>
  )
}
```

`CandidateApp` uses `useState` to manage the active screen — same pattern as the employer portal.

---

## React Native → Web Component Conversion Rules

When converting existing Expo code, apply these replacements:

| React Native | Web Equivalent |
|---|---|
| `<View style={styles.x}>` | `<div className="...">` |
| `<Text style={styles.x}>` | `<p className="...">` or `<span>` |
| `<TouchableOpacity onPress={fn}>` | `<button onClick={fn}>` with `active:scale-95 transition` |
| `<Pressable onPress={fn}>` | `<div onClick={fn} className="cursor-pointer active:scale-95 transition">` |
| `<Image source={...} />` | `<img src="..." alt="" />` |
| `<FlatList data={x} renderItem={...} />` | `<div className="overflow-y-auto">{x.map(i => ...)}</div>` |
| `<ScrollView>` | `<div className="overflow-y-auto h-full">` |
| `<SafeAreaView>` | `<div className="pt-safe pb-safe">` |
| `StyleSheet.create({...})` | Tailwind classes |
| `Animated.View` | `<div className="transition-all duration-300">` |
| `PanResponder` | `useDrag` from `@use-gesture/react` |
| `useNavigation()` | `go(screen)` prop function |
| `navigation.navigate('X')` | `go('x')` |
| `StatusBar` | Remove — handled by meta tags |
| `Platform.OS` | Remove |
| `Dimensions.get('window')` | Use `100vw` / `100vh` in CSS |

### StyleSheet → Tailwind conversion guide:

```
flex: 1             → flex-1
flexDirection: row  → flex-row
alignItems: center  → items-center
justifyContent: ...  → justify-...
padding: 16         → p-4
margin: 16          → m-4
borderRadius: 12    → rounded-xl
fontSize: 16        → text-base
fontWeight: '700'   → font-bold
color: '#606060'    → text-[#606060]
backgroundColor     → bg-[#...]
position: absolute  → absolute
width: '100%'       → w-full
height: 60          → h-[60px]
gap: 12             → gap-3
```

---

## Screen List & Navigation

```ts
type Screen =
  | 'splash'
  | 'onboarding'
  | 'signup'
  | 'profile-setup'
  | 'video-record'
  | 'job-feed'         // main swipe screen
  | 'job-detail'
  | 'match'
  | 'messages'
  | 'chat'
  | 'applications'
  | 'premium'
```

Navigation flow:
```
splash → onboarding → signup → profile-setup → video-record → job-feed
job-feed → job-detail (tap card)
job-feed → match (on swipe right + employer liked)
job-feed → premium (swipes exhausted)
match → messages
messages → chat
job-feed bottom tab → applications
```

---

## Screen-by-Screen Specs

---

### SCREEN 1 — Splash

Full screen dark background (`bg-dark`).

```
Layout: flex col, items-center, justify-center, h-full
Background: #0a0a0a

Content (centred):
  - Swype logo (large water drop SVG in brand blue)
  - "Swype" wordmark — text-[48px] font-bold tracking-[-2px] text-white
  - Tagline — "Find your next job. No stress. No agents." text-sm text-[#666]

Bottom:
  - "Create Account" → primary button (full width, brand blue, pill) → go('signup')
  - "Log In" → ghost text link → go('signup')
  - Trust line — "100% free to apply · Anti-fraud verified employers" text-xs text-[#555] text-center
```

---

### SCREEN 2 — Sign Up

Dark screen, top padding for status bar.

```
Header: "Create your account" (text-[28px] tracking-[-1px] text-white)
Subtext: "No CV required. Just you." (text-sm text-[#888])

Form fields (mt-8, flex col gap-4):
  - Phone number: +234 prefix selector + number input (white border, dark bg)
  - Full name input
  - Password input (with show/hide toggle)
  - Checkbox: "I agree to Terms & Privacy Policy"

Primary button: "Continue" (full width, brand blue, pill)
Below: "Already have an account? Log in" (text-sm, brand blue link)

OTP step (show after "Continue" tapped):
  - "Enter the 6-digit code sent to your number"
  - 6 individual input boxes (auto-advance on input)
  - "Resend code" timer
  - "Verify" → go('profile-setup')
```

---

### SCREEN 3 — Profile Setup

Dark screen with progress indicator (step 1 of 3 dots at top).

```
Progress dots: 3 dots, first filled brand blue

Header: "Tell us about yourself"

Profile photo:
  - Circle (80px), dotted border, tap to upload
  - Camera icon inside
  - "Add photo" label below

Fields:
  - "What do you do?" — text input with autocomplete suggestions
  - Years of experience — horizontal stepper (0, 1, 2-3, 4-6, 7+)
  - Highest qualification — segmented/chip select (SSCE, OND, HND, BSc, MSc)
  - Current city — dropdown (Lagos, Abuja, PH, Other)
  - Open to relocate? — toggle switch

Skills (tap to add):
  "Select your top skills"
  Scrollable chip grid — tapping a chip selects it (bg changes to brand blue)
  Suggested: Excel, Customer Service, Sales, AutoCAD, Python, Data Analysis, etc.

"Continue" → go('video-record')
"Skip for now" link → go('job-feed')
```

---

### SCREEN 4 — Video Profile Recording

Dark screen. Camera takes full screen (simulate with dark rectangle).

```
Background: black/very dark (camera preview area — use bg-black)

Coaching tips panel (top, collapsible card):
  Tip 1: "Introduce yourself"
  Tip 2: "Talk about your experience"
  Tip 3: "Say why you want this type of role"
  Small "x" to collapse

Timer display (below tips or centred):
  "0:00 / 2:00"
  Circular progress ring around timer (SVG)

Record button (bottom centre):
  Large red circle (64px) with white circle inside
  Tap: starts recording → border animates, timer counts up
  Tap again: stops

After recording — show preview controls:
  Video thumbnail (dark rect with play icon)
  "Use This Take" — primary button → go('job-feed')
  "Record Again" — ghost button
  "Skip for Now" — text link → go('job-feed')

Quality warning (show if simulating low light):
  Yellow banner: "Try recording near a window for better results"
```

---

### SCREEN 5 — Job Discovery Feed (Swipe Cards)

This is the hero screen. Dark background. Tinder-style swipe interface.

```
Top bar:
  - Left: filter icon (Sliders2 from lucide)
  - Centre: Swype logo (small)
  - Right: bell icon with notification dot

Filter chips below top bar (horizontal scroll, no scrollbar):
  "All" (selected) · "Full-time" · "Remote" · "Lagos" · "Entry Level"
  Chip style: bg-dark-3 text-white rounded-full px-3 py-1.5 text-xs
  Selected: bg-brand text-white

Swipe card stack (main area, centred):
  Stack of 2-3 cards visible (cards behind slightly scaled down)
  
  TOP CARD structure:
    - Rounded card (rounded-3xl), dark background (#1a1a1a), full width minus 32px margin
    - Height: ~480px
    - Top section (gradient overlay): company logo + verified badge (blue tick)
    - Company name (text-white, bold, large)
    - Job title (text-white, text-2xl, tracking tight)
    - Location tag + salary range (text-[#aaa], text-sm)
    - "Posted X days ago"
    - Brief description (2-3 lines, text-[#888])
    - Gradient fade to bottom

  SWIPE INTERACTION (use @use-gesture/react useDrag):
    - Drag right → card rotates slightly clockwise, green "INTERESTED" overlay appears (top-left, large text)
    - Drag left → card rotates counter-clockwise, red "PASS" overlay appears (top-right)
    - Release past threshold (150px) → card flies off screen, next card pops forward
    - Release within threshold → card snaps back to centre

  Implementation with useDrag:
    ```tsx
    const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = Math.abs(mx) > 150
      const dir = xDir > 0 ? 1 : -1
      if (!down && trigger) {
        // card exits
        setGone(prev => new Set(prev).add(currentIndex))
      }
      setStyle({
        transform: down ? `translateX(${mx}px) rotate(${mx / 20}deg)` : 'translateX(0) rotate(0)',
      })
    })
    ```

  Swipe overlays (absolute, top-8, opacity based on drag distance):
    - Left side: "INTERESTED" text in green (rotate -12deg)
    - Right side: "PASS" text in red (rotate 12deg)

Bottom action bar (3 buttons, fixed above tab bar):
  [❌ circle] [★ circle (gold, "Super Apply")] [✅ circle]
  Pass         Super Apply                        Interested
  Each is a circle button (~52px)

Bottom tab bar (fixed bottom, with pb-safe):
  Discover (flame icon, active) | Matches | Profile
```

**IMPORTANT:** The swipe interaction is the critical feature. Make it feel smooth and native. Apply `touch-action: none` to the card element to prevent scroll conflicts.

---

### SCREEN 6 — Job Detail (tap a card to expand)

Bottom sheet that slides up over the feed (use `translate-y` animation).

```
Container: absolute, bottom-0, left-0, right-0
Height: 85% of screen
Background: #1a1a1a
Border-radius: 20px 20px 0 0
Animation: slides up from bottom (translateY 100% → 0, duration 300ms)

Drag handle: 32x4px grey pill at top centre

Content (scrollable inside):
  Company logo (48px) + Company name + Verified badge
  Job title (text-white, text-2xl, bold)
  Meta chips: Full-time · On-site · Lagos · Posted 2 days ago
  
  Sections (separated by thin grey lines):
    "About the Role" — body text
    "What You Need" — bullet list
    "Nice to Have"
    "About [Company]" — 2-3 lines

Bottom sticky row (inside sheet, above pb-safe):
  [❌ Pass] [✅ I'm Interested]
  Equal width, pill buttons

Verified employer tooltip (if tapping badge):
  Small popup: "CAC-registered and verified employer"
```

---

### SCREEN 7 — It's a Match!

Full screen celebration. This is an emotional highlight — make it feel joyful.

```
Background: dark with animated particles or simple confetti effect
  (Use a CSS keyframe animation with multiple small dots/circles)

Centre content:
  - Candidate profile circle (left) + Company logo circle (right)
  - Connected by animated glowing line between them
  - "It's a Match! 🎉" — large, white, bold, tracking tight
  - Sub: "Seepco liked your profile too. Start a conversation."

Animation sequence:
  1. Circles scale in from 0 with spring (CSS: scale 0 → 1, duration 400ms)
  2. Connection line draws in (stroke-dashoffset animation)
  3. Headline fades in
  4. Confetti particles burst (simple CSS keyframe dots)

Buttons:
  "Send a Message" → primary (brand blue, pill, full width) → go('chat')
  "Keep Swiping" → ghost/text link → go('job-feed')

Safety note (text-xs, #555, bottom):
  "Your contact details are not shared until you both agree."
```

**Confetti implementation (CSS only, no library):**
```css
@keyframes confetti-fall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
.confetti-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: confetti-fall 2s ease-in forwards;
}
```
Generate ~20 dots with different colors, positions, and animation delays using a useEffect loop.

---

### SCREEN 8 — Messages List

Dark screen. All active matches.

```
Top bar: "Matches" (heading) + filter icon

Tabs: "Messages" | "Match Requests"

Message list (scrollable):
  Each row:
    - Company logo (40px circle)
    - Company name + job title (text-sm text-[#aaa])
    - Last message preview (text-xs text-[#666], truncated)
    - Timestamp (text-xs text-[#555])
    - Unread badge (blue circle with count) if unread

  Row tap → go('chat')

System message at top of list (card style):
  "Remember: Legitimate employers never ask you to pay."
  ⚠ Brand yellow text, dark bg

Empty state (if no matches):
  Centred illustration placeholder + "No matches yet. Keep swiping!"
```

---

### SCREEN 9 — Chat

Dark, full-screen chat interface.

```
Top bar (fixed):
  Back arrow + Company name + "Seepco · Verified" (blue tick) + ⋮ menu icon

Chat thread (scrollable, pb-safe):
  System message (centred, text-xs text-[#555]):
    "You matched with Seepco for Sales Assistant on [date]"
  
  Recruiter message bubble:
    - Left aligned
    - Dark grey bg (#2a2a2a), rounded-2xl, rounded-tl-sm
    - "Hi [name]! I'm Tunde from Seepco. I reviewed your profile and would love to chat."
    - Timestamp below (text-xs, #555)
  
  User message bubble:
    - Right aligned
    - Brand blue bg, rounded-2xl, rounded-tr-sm
    - "Hi Tunde! Thanks for reaching out. I'm very interested."
    - Timestamp + ✓✓ read receipt

Safety banner (yellow, first message only):
  "Legitimate employers never ask you to pay fees. Report if they do."

Input bar (fixed bottom, pb-safe):
  - Grey bg (#1a1a1a), border-t border-[#333]
  - Text input (bg transparent, text white)
  - Attach icon (Paperclip from lucide)
  - Send button (brand blue circle, ArrowUp icon)
```

---

### SCREEN 10 — My Applications

Dark screen. Tab overview of all swipe activity.

```
Top bar: "My Applications"

Tabs: "Matches" | "Applied" | "Saved"

MATCHES tab (default):
  List of all matched companies:
    - Company logo + name + job title
    - "Matched 2 days ago"
    - Last message preview
    - Tap → go('chat')

APPLIED tab:
  List of all right-swipes:
    Status labels (colour-coded pills):
      Waiting for Response — grey
      Viewed by Employer — blue
      Matched — green
      Interview Scheduled — purple
      Not Selected — dim red

SAVED tab:
  Jobs bookmarked (Super Applied)
  "Unlock unlimited saves with Swype+" upsell if more than 3

Empty state:
  "Start swiping to see your applications here 👀"
  Ghost button "Find Jobs" → go('job-feed')

Bottom tab bar (same as job feed):
  Discover | Matches (active, with badge) | Profile
```

---

### SCREEN 11 — Premium Upgrade (Swype+)

Shown when free swipes run out, or tapping upgrade button.

```
Background: dark, slight gradient

Header: "Level up your job search"
Subtext: "You've used all your free swipes today."

Plan comparison cards:

FREE card (dim, current):
  - 20 swipes/day
  - Standard profile
  - Basic matching

SWYPE+ card (highlighted, brand blue border glow):
  "Most Popular" badge
  - Unlimited swipes
  - See who viewed your profile
  - Profile boost (appear first)
  - AI CV review
  - 5 Super Applies/day
  Price: ₦2,500/month or ₦6,500/3 months (save 13%)

Billing toggle: Monthly | 3-Month (toggle switches)

"Start 7-Day Free Trial" → primary full-width button

Below: "Continue with Free →" text link → go('job-feed')

Trust line (text-xs text-[#555]):
  "Cancel anytime. Payment via Paystack."
```

---

## Bottom Tab Bar Component

Fixed at bottom of every main screen (job-feed, messages, applications).

```tsx
const tabs = [
  { id: 'job-feed', icon: Flame, label: 'Discover' },
  { id: 'messages', icon: MessageCircle, label: 'Matches' },
  { id: 'applications', icon: Briefcase, label: 'Profile' },
]

// Structure:
<div className="fixed bottom-0 left-0 right-0 pb-safe bg-dark border-t border-[#222] flex">
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => go(tab.id as Screen)}
      className={`flex-1 flex flex-col items-center py-3 gap-1 ${
        screen === tab.id ? 'text-brand' : 'text-[#555]'
      }`}
    >
      <tab.icon size={22} />
      <span className="text-[10px] tracking-tight">{tab.label}</span>
    </button>
  ))}
</div>
```

---

## Mock Data (lib/mock-data.ts)

```ts
export const mockJobs = [
  {
    id: '1',
    company: 'Seepco Nigeria',
    title: 'Sales Assistant',
    location: 'Lagos Island · On-site',
    salary: '₦250,000 – ₦350,000/month',
    type: 'Full-time',
    posted: '2 days ago',
    verified: true,
    description: 'We are looking for a motivated Sales Assistant to join our team and help drive revenue growth across our Lagos territory.',
    requirements: ['2+ years sales experience', 'Strong communication skills', 'CRM proficiency', 'Lagos-based'],
    niceToHave: ['FMCG experience', 'Salesforce certification'],
    about: 'Seepco is a leading Nigerian energy company with operations across the country.',
    logoColor: '#0f65ef',
    logoInitial: 'S',
  },
  {
    id: '2',
    company: 'TechBridge Ltd',
    title: 'Business Development Exec',
    location: 'Victoria Island · Hybrid',
    salary: '₦300,000 – ₦400,000/month',
    type: 'Full-time',
    posted: '1 day ago',
    verified: true,
    description: 'Drive new business partnerships and revenue streams for a fast-growing tech company.',
    requirements: ['3+ years BD experience', 'Tech sector knowledge', 'Strong network'],
    niceToHave: ['MBA', 'SaaS experience'],
    about: 'TechBridge connects African businesses with global technology solutions.',
    logoColor: '#6030e0',
    logoInitial: 'T',
  },
  {
    id: '3',
    company: 'NovaBanc',
    title: 'Relationship Manager',
    location: 'Ikeja · On-site',
    salary: '₦280,000 – ₦360,000/month',
    type: 'Full-time',
    posted: '3 days ago',
    verified: true,
    description: 'Manage and grow a portfolio of retail and SME banking clients.',
    requirements: ['Banking experience preferred', 'Customer relationship skills', 'Finance background'],
    niceToHave: ['CIBN certification', 'Portfolio management experience'],
    about: 'NovaBanc is a digital-first bank serving Nigerians across the country.',
    logoColor: '#e06020',
    logoInitial: 'N',
  },
]

export const mockMatches = [
  {
    id: 'm1',
    company: 'Seepco Nigeria',
    jobTitle: 'Sales Assistant',
    logoColor: '#0f65ef',
    logoInitial: 'S',
    lastMessage: "Hi! I'm Tunde from Seepco. I reviewed your profile and would love to chat.",
    timestamp: '2h ago',
    unread: 1,
    matchedDate: 'Monday, 25 Aug',
  },
]
```

---

## Swipe Card Implementation Detail

This is the most important interaction. Here's the complete pattern:

```tsx
'use client'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'

export function SwipeCard({ job, onSwipeLeft, onSwipeRight, isTop }: SwipeCardProps) {
  const [style, setStyle] = useState({ x: 0, rotation: 0, opacity: 1 })

  const bind = useDrag(({ active, movement: [mx], velocity: [vx], direction: [xDir] }) => {
    const trigger = Math.abs(mx) > 120 || Math.abs(vx) > 0.5
    const dir = mx > 0 ? 1 : -1

    if (!active && trigger) {
      // Card flies off
      setStyle({ x: dir * 600, rotation: dir * 30, opacity: 0 })
      setTimeout(() => {
        dir > 0 ? onSwipeRight() : onSwipeLeft()
      }, 300)
    } else if (active) {
      setStyle({ x: mx, rotation: mx / 15, opacity: 1 })
    } else {
      // Snap back
      setStyle({ x: 0, rotation: 0, opacity: 1 })
    }
  }, { filterTaps: true, bounds: undefined })

  const interestedOpacity = Math.min(style.x / 120, 1) // 0 → 1 as card goes right
  const passOpacity = Math.min(-style.x / 120, 1)      // 0 → 1 as card goes left

  return (
    <div
      {...(isTop ? bind() : {})}
      className="absolute w-full touch-none select-none cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${style.x}px) rotate(${style.rotation}deg)`,
        transition: style.x === 0 && style.rotation === 0 ? 'all 0.3s spring' : 'none',
        opacity: style.opacity,
        zIndex: isTop ? 10 : 5,
        scale: isTop ? 1 : 0.96,
      }}
    >
      {/* Interested overlay */}
      <div
        className="absolute top-10 left-6 z-20 border-4 border-green-400 rounded-lg px-3 py-1 rotate-[-12deg]"
        style={{ opacity: interestedOpacity }}
      >
        <span className="text-green-400 font-bold text-2xl tracking-widest">INTERESTED</span>
      </div>

      {/* Pass overlay */}
      <div
        className="absolute top-10 right-6 z-20 border-4 border-red-400 rounded-lg px-3 py-1 rotate-[12deg]"
        style={{ opacity: passOpacity }}
      >
        <span className="text-red-400 font-bold text-2xl tracking-widest">PASS</span>
      </div>

      {/* Card content */}
      <div className="bg-[#1a1a1a] rounded-3xl mx-4 overflow-hidden" style={{ height: 480 }}>
        {/* Card body — company info, job title, etc. */}
      </div>
    </div>
  )
}
```

---

## Screen Background Colours

Unlike the employer portal (which is light), the candidate app is **dark-themed**:

```
Page background:   #0a0a0a (dark)
Cards/surfaces:    #1a1a1a
Inner surfaces:    #2a2a2a
Borders:           #333333
Text primary:      #ffffff
Text secondary:    #aaaaaa
Text muted:        #555555
Brand:             #0f65ef (same)
AI badge:          #d0e1fd (same, but use sparingly — this is a light colour)
```

---

## Build Order for Cursor

1. Project setup + font import
2. `globals.css` + `tailwind.config.ts`
3. `app/layout.tsx` with all meta tags
4. `public/manifest.json`
5. `lib/types.ts` + `lib/mock-data.ts`
6. `/components/ui/` — Button, SwipeCard, BottomTabBar, JobCard, ChatBubble, MatchRow
7. Screens in order: Splash → Signup → ProfileSetup → VideoRecord → JobFeed → JobDetail → Match → Messages → Chat → Applications → Premium
8. `app/page.tsx` — wire with useState

---

## How to Use This File in Cursor

1. Open Cursor in the new project folder
2. Open AI chat (Cmd+L)
3. Paste this entire document and say:
   **"Build this mobile web app following this spec. Start with step 1 and proceed in the build order listed. The most important screen is the job feed with swipe cards — make that interaction smooth."**
4. For the swipe specifically: **"Implement the SwipeCard component using @use-gesture/react as described in the spec. Prioritise the feel of the gesture."**
5. After each screen: **"Next screen"**

---

## Testing on iPhone (Client Handoff)

1. Deploy to Vercel: `git push` → auto-deploy
2. Share the Vercel URL with the client
3. Client opens in Safari on iPhone
4. For app-like experience: tap Share → "Add to Home Screen"
5. App opens fullscreen, no browser chrome — looks native

**The client will not be able to tell this is a web app.**
