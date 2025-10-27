# Theme System Architecture

This directory contains the modular theme system for the NativeScript Vue application, inspired by DaisyUI's semantic design token approach.

## 📁 File Structure

```
themes/
├── tokens.css       # Design tokens (typography, spacing, radius, elevation)
├── light.css        # Light theme color scheme
├── dark.css         # Dark theme color scheme (.ns-dark)
├── variants.css     # Platform-specific variants (android, ios, portrait, landscape)
├── utilities.css    # Reusable utility classes
└── README.md        # This file
```

## 🎨 Theme Files Explained

### `tokens.css`
**Core design tokens that remain constant across themes.**

Contains:
- **Typography**: Font families (sans, serif, mono, display with Crimson Text), font sizes (xs to 4xl), font weights, line heights
- **Spacing Scale**: 4px base unit (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20)
- **Border Radius**: Component-specific radius (btn, input, card, badge, avatar)
- **Elevation Levels**: 0-5 for androidElevation (shadow depth)
- **Opacity Levels**: disabled, hover, pressed, subtle
- **Animation Timing**: fast (150), base (200), slow (300)

### `light.css`
**Light theme color scheme (default).**

Semantic color variables:
- **Base colors**: `--color-base-100/200/300` (backgrounds), `--color-base-content` (text)
- **Brand colors**: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-neutral`
- **State colors**: `--color-success`, `--color-info`, `--color-warning`, `--color-error`
- **Custom colors**: `--color-crimson` (custom brand color)
- **UI elements**: `--color-border`, `--color-input`, `--color-focus-ring`, `--color-disabled`, `--color-placeholder`
- **Text hierarchy**: `--color-text-primary/secondary/tertiary/disabled`

Each color has:
- Base color (e.g., `--color-primary`)
- Focus state (e.g., `--color-primary-focus`)
- Content color (e.g., `--color-primary-content` - text color on primary background)

### `dark.css`
**Dark theme color overrides (triggered by `.ns-dark` class).**

Same color variables as light theme but with adjusted values:
- Darker backgrounds (`#1a1a1a`, `#262626`, `#404040`)
- Brighter colors for better contrast (e.g., Blue 400 instead of Blue 500)
- Lighter text colors (`#fafafa`, `#d4d4d4`)

NativeScript automatically applies `.ns-dark` class when system dark mode is enabled.

### `variants.css`
**Platform-specific CSS variants for conditional styling.**

Defines custom variants:
- `android:` - Android-only styles (`.ns-android`)
- `ios:` - iOS-only styles (`.ns-ios`)
- `dark:` - Dark mode styles (`.ns-dark`)
- `light:` - Light mode styles (`.ns-light`)
- `portrait:` - Portrait orientation (`.ns-portrait`)
- `landscape:` - Landscape orientation (`.ns-landscape`)

Usage in Tailwind:
```vue
<Label class="android:text-blue-500 ios:text-green-500" />
<StackLayout class="dark:bg-gray-800 light:bg-white" />
```

### `utilities.css`
**Reusable utility classes for common patterns.**

Includes:
- **Typography utilities**: `.font-serif`, `.font-sans`, `.font-mono`, `.font-display`
- **Text color utilities**: `.text-primary`, `.text-secondary`, `.text-tertiary`, `.text-disabled`
- **Surface utilities**: `.surface-base`, `.surface-elevated`, `.surface-card`

## 🚀 Usage Examples

### Using Color Tokens
```vue
<template>
  <StackLayout class="bg-[var(--color-base-100)]">
    <Label :text="title" class="text-[var(--color-text-primary)]" />
    <NSButton variant="primary" text="Click Me" />
  </StackLayout>
</template>
```

### Using Design Tokens
```vue
<template>
  <StackLayout class="p-[var(--spacing-4)]">
    <Label class="font-display text-[var(--font-size-2xl)]" />
    <ContentView class="rounded-[var(--radius-card)]" />
  </StackLayout>
</template>
```

### Platform-Specific Styling
```vue
<template>
  <Label class="android:font-sans ios:font-serif dark:text-white" />
</template>
```

## 🎯 Creating a New Theme

To create a new theme (e.g., high contrast theme):

1. **Create new theme file**: `src/themes/high-contrast.css`

```css
.ns-high-contrast {
  /* Override all --color-* variables */
  --color-base-100: #000000;
  --color-base-content: #ffffff;
  --color-primary: #00ff00;
  /* ... all other color variables ... */
}
```

2. **Import in `app.css`**:
```css
@import './themes/high-contrast.css';
```

3. **Apply theme class**: Add `.ns-high-contrast` class to root element programmatically or via settings.

## ⚙️ Theme Switching

NativeScript automatically handles light/dark theme switching based on system settings. The `.ns-dark` class is applied automatically.

For manual theme switching:
```typescript
import { Application } from '@nativescript/core';

// Get root view
const rootView = Application.getRootView();

// Switch to dark theme
rootView.className = 'ns-dark';

// Switch to light theme
rootView.className = 'ns-light';
```

## 🎨 Color Naming Convention

Following DaisyUI's semantic naming:

- **Base**: Backgrounds and surfaces (100 = lightest, 300 = darkest)
- **Content**: Text colors for corresponding backgrounds
- **Focus**: Hover/focus/active state colors
- **Primary/Secondary/Accent**: Brand identity colors
- **Success/Info/Warning/Error**: State feedback colors
- **Neutral**: Generic UI elements

## 🔧 Customization

### Change Brand Colors
Edit `light.css` and `dark.css`:
```css
/* light.css */
--color-primary: #3b82f6;  /* Change to your brand color */
--color-primary-focus: #2563eb;  /* Darken by ~10-15% */
--color-primary-content: #ffffff;  /* Ensure contrast */
```

### Adjust Spacing Scale
Edit `tokens.css`:
```css
/* Change base unit from 4px to 8px */
--spacing-1: 8px;
--spacing-2: 16px;
--spacing-3: 24px;
```

### Add Custom Font
Edit `tokens.css`:
```css
--font-family-custom: 'MyFont-Regular', sans-serif;
```

Then use in components:
```css
.font-custom {
  font-family: var(--font-family-custom);
}
```

## 📖 Related Documentation

- **Main README**: `/README.md` - Project overview
- **Component Library**: `/COMPONENT_LIBRARY.md` - All UI components API
- **CSS Limitations**: `/NATIVESCRIPT_CSS_LIMITATIONS.md` - NativeScript CSS constraints
- **Changelog**: `/CHANGELOG.md` - Version history

## ⚠️ Important Notes

1. **NativeScript Only Accepts Hex Colors**: Use `#ffffff` format, NOT `rgb(255, 255, 255)` or space-separated RGB.

2. **CSS Limitations**: NativeScript is NOT web CSS. No `gap`, no inheritance, no pseudo-elements. Read `NATIVESCRIPT_CSS_LIMITATIONS.md` first.

3. **Linter Warnings**: You may see "Unknown at rule @theme" or "@custom-variant" warnings. These are Tailwind v4 directives and work correctly at runtime despite linter errors.

4. **File Order Matters**: Import order in `app.css`:
```css
@import 'tailwindcss';        /* 1. Tailwind base */
@import './themes/tokens.css'; /* 2. Design tokens */
@import './themes/light.css';  /* 3. Light theme */
@import './themes/dark.css';   /* 4. Dark theme overrides */
@import './themes/variants.css'; /* 5. Platform variants */
@import './themes/utilities.css'; /* 6. Utility classes */
```

5. **Testing Themes**: Always test on both iOS and Android, and in both light and dark modes.

## 🤝 Contributing

When adding new colors or tokens:
1. Add to both `light.css` AND `dark.css`
2. Use semantic naming (don't use color names like "blue-500")
3. Ensure proper contrast ratios (WCAG AA minimum: 4.5:1)
4. Document in this README
5. Update `CHANGELOG.md`
