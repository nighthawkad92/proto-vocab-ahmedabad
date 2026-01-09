# Design System Documentation

This document describes the PAL Vocabulary Tool design system, based on the Figma Children Mobile App Design System.

## Colors

### Primary (Green)
- Primary 50: `#E6F7EF`
- Primary 100: `#B3E6CE`
- Primary 500: `#02A959` (Main)
- Primary 600: `#028B4A` (Hover)

### Secondary (Yellow)
- Secondary 50: `#FEF3E0`
- Secondary 100: `#FDE4B3`
- Secondary 500: `#F59E0B` (Main)
- Secondary 600: `#D97706` (Hover)

### Tertiary (Blue)
- Tertiary 50: `#E8F4FE`
- Tertiary 500: `#2E94F1` (Main)
- Tertiary 600: `#1E7BCE` (Hover)

### Error (Red)
- Error 50: `#FEE2E2`
- Error 500: `#EF4444` (Main)
- Error 600: `#DC2626` (Hover)

### Neutral (Grays)
- Neutral 100: `#F3F4F6`
- Neutral 200: `#E5E7EB`
- Neutral 300: `#D1D5DB`
- Neutral 400: `#9CA3AF`
- Neutral 500: `#6B7280`
- Neutral 900: `#111827`
- White: `#FFFFFF`
- Black: `#000000`

## Typography

### Fonts
- **Headings/Display**: Bubblegum Sans (Google Font)
- **Body/Paragraphs**: Andika (Google Font)

### Type Scale
- `text-child-sm`: 14px / 20px line height
- `text-child-base`: 16px / 24px line height
- `text-child-lg`: 20px / 28px line height
- `text-child-xl`: 24px / 32px line height
- `text-child-2xl`: 32px / 40px line height

## Buttons

### Variants

#### Primary
- Background: `bg-primary-500`
- Hover: `bg-primary-600`
- Text: White
- Has shadow
- Disabled: Gray background with gray text

#### Secondary
- Same as Primary in this design system
- Background: `bg-primary-500`
- Hover: `bg-primary-600`
- Text: White
- Has shadow

#### Outlined (Optional)
- Border: 2px `border-primary-500`
- Text: `text-primary-500`
- Background: White
- Hover: `bg-primary-50`
- Disabled: Gray border with gray text

#### Text
- Text: `text-primary-500`
- No background
- Hover: Underline
- Disabled: Gray text

### Sizes
- **Small**: 32px height (h-8)
- **Medium**: 40px height (h-10)
- **Large**: 48px height (h-12)

### Border Radius
- All buttons: `rounded-[40px]` (fully rounded)

### Icon Positions
- Left: Icon before text
- Right: Icon after text
- Only: Icon only, no text

## Inputs

### States
- **Default**: Gray border (`border-neutral-300`)
- **Focus**: Green border (`border-primary-500`)
- **Success**: Green border with checkmark icon
- **Error**: Red border (`border-error-500`) with X icon
- **Disabled**: Gray background, gray text

### Features
- Labels: Semibold, above input
- Placeholder: Gray text (`text-neutral-400`)
- Helper text: Below input in gray or red
- Icons: Left or right side
- Prefix: Text prefix for phone numbers, etc.
- Border radius: `rounded-child`

### Padding
- Horizontal: 16px (px-4)
- Vertical: 12px (py-3)
- With icons: Extra padding (pl-12 or pr-12)

## Icons

### Icon System
Icons are sourced from the Figma design system and stored in:
`/public/icons/Children Mobile App (Community) - Design System (Community)/`

### Usage
```tsx
import { Icon } from '@/components/ui/Icon'

<Icon name="search" size={24} className="text-primary-500" />
```

### Available Icons
1200+ icons including:
- Navigation: arrow-left, arrow-right, home, menu
- Actions: search, close, check, plus, minus
- UI: star, heart, user, settings
- And many more...

## Spacing

### Rounded Corners
- `rounded-child`: 16px border radius (buttons, inputs, cards)
- `rounded-[40px]`: Fully rounded (buttons only)

### Shadows
- `shadow-child`: Soft shadow for elevated elements

## Background Colors
- Primary background: `bg-secondary-50` (light yellow)
- Cards/Containers: `bg-white`
- Disabled: `bg-neutral-100`

## Loading States

### Loader Component
The Loader component displays an animated spinner for loading states.

#### Usage
```tsx
import { Loader } from '@/components/ui/Loader'

<Loader size="md" message="Loading your lessons" />
```

#### Props
- `size`: 'sm' | 'md' | 'lg' - Spinner size (32px, 48px, 64px)
- `message`: Optional loading message text

#### Features
- Uses design system loading indicator (`loading-indicator.svg`)
- Built-in animation from SVG asset
- Animated pulsing message text
- Animated dots (...) after message
- Responsive sizing

## Component Export

All components are exported from their respective files:
- `@/components/ui/Button` - Button component
- `@/components/ui/Input` - Input component
- `@/components/ui/Icon` - Icon component
- `@/components/ui/Loader` - Loading spinner component
- `@/components/ui/VocabPalLogo` - Logo component
- `@/components/ui/LoginBackground` - Decorative background

## Design Principles

1. **Child-Friendly**: Large touch targets, rounded corners, friendly colors
2. **Accessible**: High contrast, clear labels, proper ARIA attributes
3. **Consistent**: Unified color palette and spacing system
4. **Playful**: Fun shapes and decorative elements
5. **Clear Feedback**: Visual states for all interactions
