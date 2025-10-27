# NativeScript Vue LSF Template

> A production-ready NativeScript-Vue template inspired by shadcn/ui's "copy-paste" philosophy

## 🎯 Project Philosophy

Unlike traditional npm packages, this template follows **shadcn/ui's "own your code" approach**:

```
❌ Traditional Way (npm package)
- npm install @some/ui-lib
- Code locked in node_modules
- Hard to customize
- Breaking changes on updates

✅ Our Way (copy-paste template)
- Clone entire project
- All code in your project
- Full control & customization
- You own every line of code
```

## ✨ Features

### 🎨 Complete UI Component Library (15+ components)
- NSButton, NSInput, NSCard, NSBadge, NSAvatar
- NSSwitch, NSLabel, NSBottomNavigation
- And more...

### 🌓 Theme System
- Light/Dark mode support
- Auto theme (follows system)
- **Fixed theme initialization** (no screen flash)
- Class-based theming (`.ns-light`/`.ns-dark`)

### ⚙️ Configuration-Driven Settings System
- Add settings in `src/config/settings.ts`
- Auto-rendered by `SettingsRenderer`
- Persistent storage via `useSettings` composable
- Support for: switch, select, link, button types

### 📄 Ready-to-Use Page Templates
Located in `src/components/pages/templates/`:
- **ListPage.vue** - List view with items
- **FormPage.vue** - Form with validation
- **DetailPage.vue** - Detail view with stats
- **EmptyPage.vue** - Minimal starting point

### 🎓 Educational Showcase Components
Examples in `src/components/showcase/`:
- ButtonsShowcase, InputsShowcase
- DisplayShowcase, FeedbackShowcase
- And more...

### 🎭 Example Pages
- HomePage - Dashboard with stats & CTA
- ProfilePage - User profile
- DiscoverPage - Tab navigation
- AboutPage - About screen

## 🚀 Quick Start

### 1. Clone the Template

```bash
git clone <your-template-repo-url> my-awesome-app
cd my-awesome-app
```

### 2. Modify Project Metadata

Edit these files to customize for your project:

#### `package.json`
```json
{
  "name": "my-awesome-app",
  "version": "1.0.0"
}
```

#### `nativescript.config.ts`
```typescript
export default {
  id: 'com.yourcompany.myawesomeapp',
  appResourcesPath: 'App_Resources',
  // ...
}
```

#### `src/config/settings.ts`
```typescript
{
  id: 'app.version',
  type: 'link',
  title: '版本',
  description: 'v1.0.0', // ← Change this
}
```

### 3. Replace App Resources

Replace icons and splash screens in `App_Resources/`:
- `App_Resources/iOS/` - iOS icons and splash
- `App_Resources/Android/` - Android icons and splash

### 4. Install Dependencies

```bash
bun install
# or
npm install
```

### 5. Run the App

```bash
# iOS
bun run ns run ios

# Android
bun run ns run android
```

## 📖 Documentation

- **[USAGE.md](docs/USAGE.md)** - Detailed usage guide
- **[TEMPLATES.md](docs/TEMPLATES.md)** - How to use page templates
- **[IMPLEMENTATION_PLAN_V2.md](docs/IMPLEMENTATION_PLAN_V2.md)** - Full implementation details

## 🏗️ Project Structure

```
ns-vue-lsf-template/
├── src/
│   ├── app.ts                      # App entry (with theme init)
│   ├── app.css                     # Light theme styles
│   ├── app-dark.css                # Dark theme styles
│   ├── config/
│   │   ├── navigation.ts           # Bottom nav configuration
│   │   └── settings.ts             # Settings configuration
│   ├── composables/
│   │   ├── useDialog.ts            # Dialog utilities
│   │   ├── useSettings.ts          # Settings management
│   │   └── ...
│   ├── components/
│   │   ├── MainContainer.vue       # Main app container
│   │   ├── pages/
│   │   │   ├── HomePage.vue        # Example: Home page
│   │   │   ├── SettingsPage.vue    # Settings page
│   │   │   └── templates/          # 📄 Page templates
│   │   │       ├── ListPage.vue
│   │   │       ├── FormPage.vue
│   │   │       ├── DetailPage.vue
│   │   │       └── EmptyPage.vue
│   │   ├── settings/
│   │   │   └── SettingsRenderer.vue # Auto settings renderer
│   │   ├── showcase/               # Component showcases
│   │   └── ui/                     # UI components (15+)
│   ├── utils/
│   │   └── theme.ts                # SimpleThemeManager
│   └── themes/                     # Theme CSS files
│       ├── tokens.css
│       ├── light.css
│       ├── dark.css
│       └── utilities.css
├── App_Resources/                  # Native app resources
├── docs/                           # Documentation
├── package.json
├── nativescript.config.ts
└── README.md
```

## 💡 Common Tasks

### Add a New Setting

Edit `src/config/settings.ts`:

```typescript
{
  id: 'notifications',
  title: '通知',
  items: [
    {
      id: 'app.notifications.sound',
      type: 'switch',
      title: '声音提醒',
      default: true,
      onChange: async (value: boolean) => {
        console.log('Sound:', value);
      }
    }
  ]
}
```

`SettingsRenderer` will automatically render it!

### Create a New Page

```bash
# 1. Copy a template
cp src/components/pages/templates/ListPage.vue \
   src/components/pages/MyListPage.vue

# 2. Modify the content
# 3. Add to navigation config (if needed)
```

### Customize Theme Colors

Edit `src/themes/light.css` and `src/themes/dark.css`:

```css
/* Light theme */
.ns-light {
  --color-primary: #3b82f6;  /* Change primary color */
  --color-background: #ffffff;
  /* ... */
}
```

## 🎯 NativeScript vs Web Development

### Key Differences

| Feature | Web | NativeScript |
|---------|-----|--------------|
| Layout | `<div>` + flexbox | `<StackLayout>`, `<GridLayout>` |
| Scroll | `overflow: scroll` | `<ScrollView>` |
| Text | `<p>`, `<span>` | `<Label>` |
| Input | `<input>` | `<TextField>` |
| CSS Variables | ✅ Full support | ⚠️ Limited (use classes) |
| Gap | `gap: 16px` | ❌ Use margin instead |

### Example: List Item

```vue
<!-- ❌ Web way (won't work in NS) -->
<div style="display: flex; gap: 16px;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- ✅ NativeScript way -->
<StackLayout orientation="horizontal">
  <Label text="Item 1" class="mr-4" />
  <Label text="Item 2" />
</StackLayout>
```

See [USAGE.md](docs/USAGE.md) for more examples.

## 🔧 Development

### Build Commands

```bash
# Clean build
bun run clean

# iOS build
bun run ios:build:dev      # Development
bun run ios:build          # Release

# Android build
bun run android:build      # Development
bun run android:release    # Release APK
bun run android:bundle     # Release AAB
```

### Theme Development

When modifying themes:
1. Edit `src/themes/*.css`
2. Use `.ns-light` and `.ns-dark` prefixes
3. Avoid CSS variables for colors (use fixed values)
4. Test in both light and dark modes

## 📦 What's Included

- ✅ 15+ UI Components
- ✅ Theme System (Light/Dark/Auto)
- ✅ Settings System
- ✅ 4 Page Templates
- ✅ Navigation System
- ✅ Composables (useDialog, useSettings, etc.)
- ✅ Showcase Components
- ✅ Example Pages
- ✅ TypeScript Support
- ✅ Tailwind CSS
- ✅ FontAwesome Icons

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [NativeScript](https://nativescript.org/)
- Powered by [Vue 3](https://vuejs.org/)

## 📄 License

This template is provided as-is for you to use in your projects. Feel free to modify and customize as needed.

---

**Happy Coding!** 🚀

If you find this template helpful, please star the repository!
