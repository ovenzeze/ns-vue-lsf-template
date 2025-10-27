# Usage Guide

Complete guide to using the NativeScript Vue LSF Template.

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [UI Components](#ui-components)
- [Theme System](#theme-system)
- [Settings System](#settings-system)
- [Navigation](#navigation)
- [Composables](#composables)
- [NativeScript Concepts](#nativescript-concepts)

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.3+
- NativeScript CLI 8.9+
- Xcode (for iOS development)
- Android Studio (for Android development)

### Initial Setup

1. **Clone and rename the project:**
```bash
git clone <template-url> my-project
cd my-project
```

2. **Update project metadata:**
```json
// package.json
{
  "name": "my-project",
  "version": "1.0.0"
}
```

```typescript
// nativescript.config.ts
export default {
  id: 'com.mycompany.myproject',
  // ...
}
```

3. **Install dependencies:**
```bash
bun install
```

4. **Run the app:**
```bash
bun run ns run ios
```

---

## Project Structure

### Directory Layout

```
src/
├── app.ts                    # Application entry point
├── app.css                   # Light theme styles
├── app-dark.css              # Dark theme styles
├── config/                   # Configuration files
│   ├── navigation.ts         # Bottom navigation config
│   └── settings.ts           # Settings config
├── composables/              # Vue composables
│   ├── useDialog.ts          # Dialog utilities
│   ├── useSettings.ts        # Settings management
│   ├── useFormValidation.ts  # Form validation
│   └── ...
├── components/
│   ├── MainContainer.vue     # Main app container
│   ├── pages/                # Page components
│   ├── settings/             # Settings components
│   ├── showcase/             # Component showcases
│   └── ui/                   # UI components
├── utils/
│   └── theme.ts              # Theme manager
└── themes/                   # Theme CSS files
```

### Key Files

| File | Purpose |
|------|---------|
| `app.ts` | App entry, initializes theme |
| `MainContainer.vue` | Main container with bottom nav |
| `config/navigation.ts` | Bottom navigation configuration |
| `config/settings.ts` | Settings page configuration |

---

## UI Components

### Available Components

Located in `src/components/ui/`:

- **NSButton** - Button with variants (primary, secondary, outline, ghost)
- **NSInput** - Text input field
- **NSCard** - Card container
- **NSBadge** - Badge/tag component
- **NSAvatar** - User avatar
- **NSSwitch** - Toggle switch
- **NSLabel** - Enhanced label
- **NSBottomNavigation** - Bottom tab navigation
- And more...

### Usage Example

```vue
<script setup>
import NSButton from './components/ui/NSButton.vue';
import NSInput from './components/ui/NSInput.vue';
import { ref } from 'nativescript-vue';

const email = ref('');

function handleSubmit() {
  console.log('Email:', email.value);
}
</script>

<template>
  <StackLayout class="p-6">
    <NSInput
      v-model="email"
      placeholder="Enter email"
      keyboardType="email"
      class="mb-4"
    />
    <NSButton
      variant="primary"
      text="Submit"
      @tap="handleSubmit"
    />
  </StackLayout>
</template>
```

### Button Variants

```vue
<NSButton variant="primary" text="Primary" />
<NSButton variant="secondary" text="Secondary" />
<NSButton variant="outline" text="Outline" />
<NSButton variant="ghost" text="Ghost" />
<NSButton variant="destructive" text="Destructive" />
```

### Badge Variants

```vue
<NSBadge variant="primary" text="Primary" />
<NSBadge variant="success" text="Success" />
<NSBadge variant="warning" text="Warning" />
<NSBadge variant="destructive" text="Error" />
```

---

## Theme System

### How It Works

The theme system uses **class-based theming** instead of CSS variables (due to NativeScript limitations).

```css
/* Light theme */
.ns-light .btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
}

/* Dark theme */
.ns-dark .btn-primary {
  background-color: #60a5fa;
  color: #0c0a09;
}
```

### Switching Themes

```typescript
import { SimpleThemeManager } from './utils/theme';

// Switch to dark theme
await SimpleThemeManager.switchTheme('dark');

// Switch to light theme
await SimpleThemeManager.switchTheme('light');

// Auto theme (follows system)
await SimpleThemeManager.switchTheme('auto');

// Check current theme
const isDark = SimpleThemeManager.isDarkTheme();
```

### Customizing Theme Colors

Edit `src/themes/light.css` and `src/themes/dark.css`:

```css
/* src/themes/light.css */
.ns-light {
  /* Primary colors */
  --color-primary-rgb: 59, 130, 246;
  --color-primary: rgb(var(--color-primary-rgb));

  /* Background colors */
  --color-background: #ffffff;
  --color-card: #f4f4f5;

  /* Text colors */
  --color-foreground: #18181b;
  --color-muted-foreground: #71717a;
}
```

**Important:** For `background-color` and `color` properties, use fixed values with `.ns-light`/`.ns-dark` prefixes, not CSS variables.

---

## Settings System

### How It Works

The settings system is **configuration-driven**. Define settings in `src/config/settings.ts`, and they're automatically rendered by `SettingsRenderer.vue`.

### Setting Types

| Type | Description | Use Case |
|------|-------------|----------|
| `switch` | Toggle on/off | Enable notifications |
| `select` | Choose from options | Theme mode |
| `link` | Navigate to details | Privacy policy |
| `button` | Trigger action | Clear cache |

### Adding a New Setting

Edit `src/config/settings.ts`:

```typescript
export const settingsConfig: SettingGroup[] = [
  {
    id: 'notifications',
    title: '通知',
    icon: '\uf0f3', // fa-bell
    items: [
      {
        id: 'app.notifications.sound',
        type: 'switch',
        title: '声音提醒',
        description: '接收通知时播放声音',
        icon: '\uf028', // fa-volume-up
        default: true,
        onChange: async (value: boolean) => {
          console.log('Sound enabled:', value);
          // TODO: Implement sound toggle
        }
      },
      {
        id: 'app.notifications.vibrate',
        type: 'switch',
        title: '震动提醒',
        default: false,
      }
    ]
  }
];
```

**That's it!** `SettingsRenderer` will automatically display it.

### Using Settings in Your Code

```typescript
import { useSettings } from './composables/useSettings';

const { getSetting, setSetting, getSettingValue } = useSettings();

// Get reactive setting
const soundEnabled = getSetting('app.notifications.sound', true);
console.log(soundEnabled.value); // true/false

// Set setting
setSetting('app.notifications.sound', false);

// Get non-reactive value
const value = getSettingValue('app.notifications.sound', true);
```

---

## Navigation

### Bottom Navigation Configuration

Edit `src/config/navigation.ts`:

```typescript
export const navigationTabs: NavigationTabConfig[] = [
  {
    id: 'home',
    title: 'Home',
    icon: '\uf015', // fa-home
    iconType: 'solid',
    component: HomePage,
    activeColor: '#3b82f6',
    inactiveColor: '#9ca3af',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: '\uf013', // fa-cog
    iconType: 'solid',
    component: SettingsPage,
    showDot: true, // Show notification dot
  }
];
```

### Programmatic Navigation

```typescript
// In MainContainer.vue
function navigateTo(pageComponent: Component, props?: any) {
  // Implementation
}

// Navigate to a page
navigateTo(DetailPage, { itemId: 123 });
```

---

## Composables

### useDialog

```typescript
import { useDialog } from './composables/useDialog';

const { showAlert, showConfirm, showActionDialog } = useDialog();

// Show alert
await showAlert({
  title: 'Success',
  message: 'Operation completed',
  okButtonText: 'OK'
});

// Show confirm
const confirmed = await showConfirm({
  title: 'Confirm',
  message: 'Are you sure?',
  okButtonText: 'Yes',
  cancelButtonText: 'No'
});

// Show action sheet
const action = await showActionDialog({
  title: 'Choose action',
  actions: ['Edit', 'Delete', 'Share'],
  cancelButtonText: 'Cancel'
});
```

### useSettings

```typescript
import { useSettings } from './composables/useSettings';

const { getSetting, setSetting } = useSettings();

// Reactive setting
const theme = getSetting('app.theme', 'light');
theme.value = 'dark'; // Auto-saves

// Direct set
setSetting('app.version', '1.0.0');
```

### useFormValidation

```typescript
import { useFormValidation } from './composables/useFormValidation';

const { validateEmail, validateRequired } = useFormValidation();

const emailError = validateEmail('test@example.com');
if (emailError) {
  console.log('Email invalid:', emailError);
}
```

---

## NativeScript Concepts

### Layout Components

#### StackLayout (Vertical/Horizontal Stacking)

```vue
<!-- Vertical (default) -->
<StackLayout class="p-4">
  <Label text="Item 1" class="mb-2" />
  <Label text="Item 2" class="mb-2" />
  <Label text="Item 3" />
</StackLayout>

<!-- Horizontal -->
<StackLayout orientation="horizontal">
  <Label text="Left" class="mr-4" />
  <Label text="Right" />
</StackLayout>
```

#### GridLayout (Grid-based Layout)

```vue
<!-- 2 columns, auto rows -->
<GridLayout columns="*, *" rows="auto">
  <Label text="Col 1" col="0" row="0" />
  <Label text="Col 2" col="1" row="0" />
</GridLayout>

<!-- Fixed width columns -->
<GridLayout columns="100, *, auto">
  <Label text="100dp" col="0" />
  <Label text="Fill" col="1" />
  <Label text="Auto" col="2" />
</GridLayout>
```

#### ScrollView (Scrollable Container)

```vue
<ScrollView class="bg-background">
  <StackLayout class="p-4">
    <!-- Long content here -->
  </StackLayout>
</ScrollView>
```

### Text Components

```vue
<!-- Basic label -->
<Label text="Hello" class="text-lg" />

<!-- NSLabel (enhanced) -->
<NSLabel
  text="Long text that wraps"
  textWrap="true"
  class="text-base text-muted-foreground"
/>

<!-- TextView (multiline input) -->
<TextView
  v-model="message"
  hint="Enter message"
  class="bg-input p-3 rounded-lg min-h-24"
/>
```

### Input Components

```vue
<!-- Text input -->
<TextField
  v-model="name"
  hint="Enter name"
  keyboardType="text"
  returnKeyType="next"
/>

<!-- NSInput (enhanced) -->
<NSInput
  v-model="email"
  placeholder="Email"
  keyboardType="email"
  autocapitalizationType="none"
/>
```

### Common Keyboard Types

- `text` - Default keyboard
- `email` - Email keyboard with @
- `phone` - Phone number pad
- `number` - Numeric keyboard
- `url` - URL keyboard with .com

### Platform-Specific Styles

```vue
<!-- iOS shadow -->
<StackLayout class="ios:shadow-lg">
  <!-- Content -->
</StackLayout>

<!-- Android elevation -->
<StackLayout style="androidElevation: 2;">
  <!-- Content -->
</StackLayout>

<!-- Both -->
<StackLayout
  class="ios:shadow-lg"
  style="androidElevation: 2;"
>
  <!-- Content -->
</StackLayout>
```

### Common Pitfalls

❌ **Don't use:**
- `display: flex` (use `<StackLayout>` or `<FlexboxLayout>`)
- `gap` property (use margins instead)
- CSS variables for colors in some properties
- `overflow: scroll` (use `<ScrollView>`)

✅ **Do use:**
- `<StackLayout>`, `<GridLayout>` for layouts
- `margin-*` classes for spacing
- Fixed color values with `.ns-light`/`.ns-dark`
- `<ScrollView>` for scrolling
- `textWrap="true"` for wrapping text
- `verticalAlignment` and `horizontalAlignment`

---

## Best Practices

### 1. Always Initialize Theme

In `app.ts`:
```typescript
SimpleThemeManager.initializeTheme()
  .then(() => createApp(MainContainer).start());
```

### 2. Use Composables for Reusable Logic

Instead of duplicating code, create composables:
```typescript
// composables/useApi.ts
export function useApi() {
  async function fetchData(url: string) {
    // Fetch logic
  }
  return { fetchData };
}
```

### 3. Keep Configuration Separate

Use `src/config/` for all configuration:
- `navigation.ts` - Navigation tabs
- `settings.ts` - Settings
- Add more as needed

### 4. Use Page Templates as Starting Points

Don't start from scratch. Copy a template:
```bash
cp src/components/pages/templates/ListPage.vue \
   src/components/pages/MyListPage.vue
```

### 5. Test on Both Platforms

Always test iOS and Android:
```bash
bun run ns run ios
bun run ns run android
```

---

## Troubleshooting

### Theme Not Applying

1. Check `app.ts` has `SimpleThemeManager.initializeTheme()`
2. Verify root view has `.ns-light` or `.ns-dark` class
3. Use fixed color values, not CSS variables

### Settings Not Saving

1. Check setting `id` is unique
2. Verify `default` value is provided
3. Ensure `useSettings` is imported correctly

### Layout Issues

1. Don't use `display: flex` or `gap`
2. Use `<StackLayout>` or `<GridLayout>`
3. Use margins instead of gap
4. Check `textWrap="true"` for long text

---

For more information, see:
- [TEMPLATES.md](./TEMPLATES.md) - Page template guide
- [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md) - Full implementation details
- [NativeScript Docs](https://docs.nativescript.org/)
