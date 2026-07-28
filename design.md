# Design System Guide — whats-your-ip

> Reference this file before writing any UI. Every visual decision must align with these tokens.

---

## 1. Foundation

### Font
- **Family:** `Rubik` (Google Fonts) — weights 300, 400, 500, 600, 700
- **Load via:** dynamically injected `<link>` in useEffect, or import in HTML
- **Apply via:** `style={{ fontFamily: "'Rubik', sans-serif" }}` on root container

### Colour Palette
The entire app is **monochromatic zinc** on a **pure white** background. No colour accents — never use blue, green, red, etc. outside of functional states.

| Token | Tailwind Class | Usage |
|---|---|---|
| Background | `bg-white` | Page / panel background |
| Surface alt | `bg-zinc-50` | Hover states, focused form bg |
| Border | `border-zinc-200` | Dividers, panel edges |
| Border alt | `border-zinc-100` | Row separators inside panels |
| Skeleton / placeholder | `bg-zinc-100`, `bg-zinc-200` | Loading states, map bg |
| Muted text | `text-zinc-300` | N/A italic, dot separators |
| Subtle text | `text-zinc-400` | Icons default, placeholders |
| Secondary text | `text-zinc-500` | Labels, sub-labels |
| Body text | `text-zinc-800` | Section headings |
| Primary text | `text-zinc-900` | Data values, IP numbers, headings |
| Active badge bg | `bg-zinc-800` | Active/on badge |
| Active badge text | `text-white` | Text on active badge |
| Inactive badge bg | `bg-zinc-100` | Inactive/off badge |
| Inactive badge text | `text-zinc-600` | Text on inactive badge |

### Iconography
- **Library:** Phosphor Icons (`@phosphor-icons/web` via unpkg CDN)
- **Sizes used:** `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px), `text-4xl` (36px), `text-5xl` (48px)
- **Default colour:** `text-zinc-400`
- **Hover / active colour:** `text-zinc-700` or `text-zinc-800`
- **Transition:** `transition-colors` always present on interactive icons
- **Weight:** use `ph` (regular) for UI chrome, `ph-fill` for emphasis / brand marks

---

## 2. Layout

### Page Shell
```
flex flex-col lg:flex-row w-full h-screen bg-white text-zinc-900 overflow-hidden
```
- Mobile: stacked columns (`flex-col`)
- Desktop (lg+): side-by-side (`flex-row`)

### Left Panel (Data Panel)
```
w-full lg:w-[480px] flex-shrink-0 flex flex-col
border-r border-zinc-200 z-10 bg-white
h-[55vh] lg:h-screen
```
- Fixed `480px` width on desktop
- Full height on desktop, `55vh` on mobile

### Right Panel (Map / Visual)
```
flex-1 relative bg-zinc-200 z-0
h-[45vh] lg:h-screen
border-t lg:border-t-0 border-zinc-200
```
- Fills remaining space
- `45vh` on mobile, full height on desktop

### Content Area (inside left panel)
```
flex-1 overflow-y-auto px-8 py-10 custom-scrollbar
```
- Horizontal padding: `px-8` (32px)
- Vertical padding: `py-10` (40px)
- Custom scrollbar (6px width, `bg-zinc-200` thumb, transparent track)

---

## 3. Typography

### Section Heading (h3)
```
text-sm font-bold text-zinc-800 uppercase tracking-widest
border-b border-zinc-200 pb-4 mb-4
flex items-center gap-3
```
- Always accompanied by a Phosphor icon (`text-xl text-zinc-500`)

### Field Label
```
text-xs font-bold text-zinc-500 uppercase tracking-[0.15em] mb-1.5
```
- Custom letter-spacing `0.15em` (slightly tighter than `tracking-widest`)

### Field Value
```
text-base font-medium text-zinc-900 break-words pr-4 leading-relaxed
```

### Status / Meta Label (tiny overline)
```
text-xs font-bold text-zinc-500 uppercase tracking-[0.15em]
```

### IP Address Display (`FormattedIP`)
Each octet:
```
text-4xl md:text-5xl font-medium text-zinc-900 tracking-tight leading-none
```
Separator dot:
```
text-3xl text-zinc-300 font-bold mb-3
```
Underline bar per octet:
```
h-[3px] w-full bg-zinc-300 mt-3 rounded-full
```
Container:
```
flex items-end gap-3 my-8
```

---

## 4. Spacing & Sizing

| Use | Value |
|---|---|
| Panel horizontal padding | `px-8` (32px) |
| Panel vertical padding | `py-10` (40px) |
| Content section gap | `space-y-12` |
| Row gap between sections | `space-y-12` |
| DataRow vertical padding | `py-4` |
| DataRow icon → text gap | `gap-4` |
| Section heading → rows gap | `mb-4` (after `pb-4`) |
| Badge gap | `gap-3` |
| Badge row top margin | `mt-6` |
| IP display margin | `my-8` |
| IP octet gap | `gap-3` |
| Loading skeleton spacing | `space-y-8` |

---

## 5. Components

### `DataRow`
```tsx
<div className="flex items-start gap-4 py-4 border-b border-zinc-100 last:border-0 group">
  <i className={`ph ${icon} text-2xl text-zinc-400 group-hover:text-zinc-700 transition-colors mt-0.5`} />
  <div className="flex-1">
    <div className="text-xs font-bold text-zinc-500 uppercase tracking-[0.15em] mb-1.5">{label}</div>
    <div className="text-base font-medium text-zinc-900 break-words pr-4 leading-relaxed">
      {value || <span className="text-zinc-300 italic">N/A</span>}
    </div>
  </div>
</div>
```
- Icon size: `text-2xl`, default `text-zinc-400`, hover `text-zinc-700`
- Bottom border: `border-b border-zinc-100`, removed on last child via `last:border-0`
- Group hover pattern: parent has `group`, icon has `group-hover:text-zinc-700`

### `FlatBadge`
```tsx
<span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider
  ${isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
  {children}
</span>
```
- **Shape:** `rounded-sm` (barely rounded — almost flat)
- **Padding:** `px-3 py-1.5`
- **Text:** `text-xs font-bold uppercase tracking-wider`
- Active: dark `bg-zinc-800 text-white`
- Inactive: light `bg-zinc-100 text-zinc-600`

### Search / Form Bar
```
flex items-center w-full border-b border-zinc-200 bg-white px-6 h-16
flex-shrink-0 group focus-within:bg-zinc-50 transition-colors
```
- Height: `h-16` (64px)
- Padding: `px-6`
- Background shifts to `bg-zinc-50` on focus-within
- Icon: `text-2xl text-zinc-400 group-focus-within:text-zinc-800`
- Input: `flex-1 bg-transparent text-base focus:outline-none placeholder:text-zinc-400 font-medium text-zinc-900`

### Error Banner
```
px-6 py-4 bg-zinc-100 text-zinc-800 text-sm border-b border-zinc-200 flex items-start gap-3
```
- Background: `bg-zinc-100` (no red — stays within zinc palette)
- Icon: `ph-warning-circle text-lg`

### Live Indicator (Ping dot)
```tsx
<span className="relative flex h-3 w-3">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75" />
  <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-800" />
</span>
```
- Zinc animated ping, no colour

### Loading Skeleton
```
h-4 bg-zinc-200 rounded-sm w-1/3 animate-pulse   ← heading placeholder
h-12 bg-zinc-100 rounded-sm w-3/4 animate-pulse  ← IP placeholder
h-2 bg-zinc-200 rounded-sm w-1/4 animate-pulse   ← label placeholder
h-3 bg-zinc-100 rounded-sm w-2/3 animate-pulse   ← value placeholder
```
- Wrapper opacity: `opacity-50`
- Shape: `rounded-sm`
- Colours: `bg-zinc-100` / `bg-zinc-200`

### Custom Scrollbar (CSS)
```css
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e4e4e7; border-radius: 20px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #d4d4d8; }
```

### Map Marker
```html
<div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shadow-[0_0_0_4px_white]">
  <i class="ph-fill ph-crosshair text-white text-xl"></i>
</div>
```
- 40×40px, `bg-zinc-900`, `rounded-full`
- White ring via `shadow-[0_0_0_4px_white]`

---

## 6. Interactive Patterns

| Pattern | Class |
|---|---|
| Icon hover colour | `group-hover:text-zinc-700` |
| Form focus background | `focus-within:bg-zinc-50` |
| Icon focus colour | `group-focus-within:text-zinc-800` |
| All transitions | `transition-colors` |
| Button hover | `hover:text-zinc-900` |
| All interactive borders | `border-zinc-200` |

---

## 7. Border & Rounding

| Element | Class |
|---|---|
| Panel dividers | `border-r border-zinc-200`, `border-b border-zinc-200` |
| Row separators | `border-b border-zinc-100` |
| Badge | `rounded-sm` |
| Skeleton | `rounded-sm` |
| Scrollbar thumb | `border-radius: 20px` |
| Map marker | `rounded-full` |
| IP underline | `rounded-full` |
| Ping dot | `rounded-full` |

> **Rule:** No `rounded-lg`, `rounded-xl`, `rounded-2xl` anywhere. Max rounding is `rounded-sm` for badges/skeletons, and `rounded-full` for circles.

---

## 8. Sizing Reference

| Element | Size |
|---|---|
| Left panel width | `w-[480px]` (desktop) |
| Search bar height | `h-16` (64px) |
| IP octet font | `text-4xl` / `text-5xl` (md) |
| IP underline | `h-[3px]` |
| Map marker | `w-10 h-10` (40×40px) |
| Live dot | `h-3 w-3` |
| Scrollbar | `width: 6px` |

---

## 9. Navigation / Link Style
```
text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest
flex items-center gap-1 transition-colors
```

---

## 10. Do's and Don'ts

✅ **Do**
- Stay strictly within the zinc scale
- Use `rounded-sm` for UI elements, `rounded-full` only for circles
- Always apply `transition-colors` on interactive elements
- Use `uppercase tracking-[0.15em]` or `tracking-widest` for all labels
- Pair icons with text for section headings
- Use `border-b border-zinc-100 last:border-0` for lists of rows

❌ **Don't**
- Use any non-zinc colour for decorative purposes
- Use `rounded-lg` or larger border-radius
- Use `font-semibold` — the app uses `font-medium` or `font-bold`
- Add shadows (except the map marker ring)
- Use coloured backgrounds for error/info states — use `bg-zinc-100`
- Deviate from Rubik font
