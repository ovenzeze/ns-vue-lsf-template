# NativeScript Vue LSF 脚手架详细实施方案 v2.0

> **版本**: v2.0.0
> **日期**: 2025-10-26
> **基于**: Template.md v0.1.0 + 用户反馈
> **项目定位**: shadcn/ui 风格的复制粘贴组件库

---

## 📋 目录

- [核心理念](#核心理念)
- [项目现状评估](#项目现状评估)
- [NativeScript vs Web 开发差异](#nativescript-vs-web-开发差异)
- [主题系统详解](#主题系统详解)
- [架构设计](#架构设计)
- [实施步骤](#实施步骤)
- [可复制的页面模板](#可复制的页面模板)
- [测试验收标准](#测试验收标准)

---

## 核心理念

### 🎯 项目定位：NativeScript 版的 shadcn/ui

与传统的 npm 包不同，本项目采用 **"复制即拥有"** 的理念：

```
┌─────────────────────────────────────────────┐
│   传统 npm 包方式（❌ 我们不这样做）           │
│   - npm install @some/ui-lib                │
│   - 代码在 node_modules，无法修改            │
│   - 升级困难，可能破坏现有代码                │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│   shadcn/ui 方式（✅ 我们的方式）             │
│   - 直接复制组件源码到项目中                  │
│   - 代码在 src/components/ui，完全可控       │
│   - 需要定制？直接修改源码即可                 │
│   - 开发者拥有代码的所有权                    │
└─────────────────────────────────────────────┘
```

### 💡 为什么选择这种方式？

1. **完全的控制权** - 组件代码在你的项目中，想改就改
2. **零依赖风险** - 不依赖外部 npm 包，不会因为包作者停止维护而受影响
3. **学习友好** - 可以直接阅读和学习组件源码
4. **定制灵活** - 不需要通过复杂的配置项，直接改代码最直接

### 🎓 降低新开发者上手成本

NativeScript 与 Web 开发有诸多差异，通过提供**完整的页面示例**帮助开发者：

- ✅ 看示例就能理解 NativeScript 的最佳实践
- ✅ 复制示例页面作为起点，快速开始开发
- ✅ 避免常见的 NativeScript 陷阱（如 CSS gap、flexbox 等）
- ✅ 理解平台差异（iOS/Android）的处理方式

---

## 项目现状评估

### ✅ 已完成且优秀的部分

#### 1. **UI 组件库**（15+ 组件）
```
src/components/ui/
├── NSButton.vue          ✅ 多变体按钮
├── NSInput.vue           ✅ 表单输入
├── NSCard.vue            ✅ 卡片容器
├── NSBottomNavigation    ✅ 底部导航
├── NSBadge.vue           ✅ 徽章
├── NSAvatar.vue          ✅ 头像
├── NSSwitch.vue          ✅ 开关
├── NSLabel.vue           ✅ 文本标签
└── ... (更多组件)
```

#### 2. **Showcase 示例**（教学价值高）
```
src/components/showcase/
├── ButtonsShowcase.vue   ✅ 按钮组件示例
├── InputsShowcase.vue    ✅ 表单输入示例
├── DisplayShowcase.vue   ✅ 数据展示示例
├── FeedbackShowcase.vue  ✅ 反馈组件示例
├── LayoutShowcase.vue    ✅ 布局示例
└── CardShowcase.vue      ✅ 卡片示例
```

这些 showcase 非常有价值，因为它们展示了：
- 每个组件的各种用法
- NativeScript 特有的属性和限制
- 平台差异的处理方式

#### 3. **主题系统**（完整的设计 Token）
```
src/themes/
├── tokens.css      ✅ 设计 Token（字体、间距、圆角等）
├── light.css       ✅ 亮色主题
├── dark.css        ✅ 暗色主题
├── variants.css    ✅ 平台变体
└── utilities.css   ✅ 工具类
```

#### 4. **页面示例**（可作为模板）
```
src/components/pages/
├── HomePage.vue        ✅ 完整的首页示例（列表、统计、CTA）
├── DiscoverPage.vue    ✅ 标签页导航示例
├── ProfilePage.vue     ✅ 个人资料页示例
└── AboutPage.vue       ✅ 关于页面示例
```

特别是 **HomePage.vue** 展示了很多实用技巧：
- 动态获取主题颜色（通过 `getCategoryColor` 函数）
- 使用 `inject` 进行跨组件通信
- GridLayout 布局最佳实践
- 平台特定样式（`androidElevation`）

### ⚠️ 待改进部分

#### 1. **主题初始化缺失**
- `src/app.ts` 未调用主题初始化
- 首屏可能出现主题闪烁

#### 2. **硬编码颜色残留**
- `NSBottomNavigation.vue` 中的 badge 颜色硬编码
- 部分组件还在使用十六进制颜色

#### 3. **缺少统一设置系统**
- 无配置驱动的设置页面
- 无统一的持久化存储方案

---

## NativeScript vs Web 开发差异

### 关键差异点（新开发者必读）

#### 1. **布局系统**

```vue
<!-- ❌ Web 开发习惯（在 NS 中不工作） -->
<div style="display: flex; gap: 16px;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- ✅ NativeScript 方式 -->
<StackLayout orientation="horizontal" class="p-4">
  <Label text="Item 1" class="mr-4" />
  <Label text="Item 2" />
</StackLayout>
```

**关键点**:
- ❌ 不支持 `display: flex`、`gap` 属性
- ✅ 使用 `StackLayout`、`GridLayout`、`FlexboxLayout`
- ✅ 用 `margin` 替代 `gap`

#### 2. **CSS 变量限制**

```css
/* ❌ 在某些属性上不工作 */
.button {
  background-color: var(--color-primary); /* 可能不生效 */
}

/* ✅ 正确方式：使用类名前缀 */
.ns-light .button-primary {
  background-color: #3b82f6; /* 固定色值 */
}

.ns-dark .button-primary {
  background-color: #60a5fa; /* 暗色主题固定色值 */
}
```

**关键点**:
- ❌ CSS 变量在某些属性上不生效（尤其是 `color`、`background-color`）
- ✅ 使用 `.ns-light` 和 `.ns-dark` 类名前缀
- ✅ 在类名下定义固定的颜色值

#### 3. **动态颜色值**

```typescript
// ✅ 示例：HomePage.vue 中的动态颜色获取
function getCategoryColor(colorClass: string): string {
  const { SimpleThemeManager } = require('../../utils/theme');
  const isDark = SimpleThemeManager.isDarkTheme();

  if (isDark) {
    const darkColorMap = {
      'text-primary': '#60a5fa',    // Blue 400
      'text-success': '#34d399',    // Green 400
      // ...
    };
    return darkColorMap[colorClass] || '#9ca3af';
  } else {
    const lightColorMap = {
      'text-primary': '#3b82f6',    // Blue 500
      'text-success': '#10b981',    // Green 500
      // ...
    };
    return lightColorMap[colorClass] || '#6b7280';
  }
}
```

**关键点**:
- ✅ 当需要在 `style` 属性中使用动态颜色时，用函数返回固定色值
- ✅ 根据当前主题返回不同的颜色值
- ✅ 提供回退颜色

#### 4. **阴影和 Elevation**

```vue
<!-- iOS 使用 shadow，Android 使用 elevation -->
<StackLayout
  class="ios:shadow-lg"
  style="androidElevation: 2;"
>
  <!-- 内容 -->
</StackLayout>
```

**关键点**:
- iOS 使用 `class="shadow-lg"`
- Android 使用 `style="androidElevation: 2;"`
- 两者需要同时定义以保证跨平台一致性

#### 5. **文本换行**

```vue
<!-- ❌ Web 方式 -->
<div style="word-wrap: break-word;">Long text...</div>

<!-- ✅ NativeScript 方式 -->
<Label text="Long text..." textWrap="true" />
```

#### 6. **滚动容器**

```vue
<!-- ❌ Web 方式 -->
<div style="overflow-y: scroll;">
  <!-- 内容 -->
</div>

<!-- ✅ NativeScript 方式 -->
<ScrollView>
  <StackLayout>
    <!-- 内容 -->
  </StackLayout>
</ScrollView>
```

---

## 主题系统详解

### 主题切换的工作原理

#### 1. **类名驱动的主题系统**

NativeScript 中，由于 CSS 变量的限制，我们使用**类名前缀**来实现主题切换：

```typescript
// src/utils/theme.ts - SimpleThemeManager
static async switchTheme(themeId: string): Promise<void> {
  // 1. 切换 CSS 文件
  const cssFileName = targetTheme === 'dark' ? '~/app-dark.css' : '~/app.css';
  Application.setCssFileName(cssFileName);

  // 2. 设置根视图类名
  const rootView = Application.getRootView();
  rootView.className = `ns-${targetTheme}`; // 'ns-light' 或 'ns-dark'
}
```

#### 2. **CSS 文件组织**

```
app.css (亮色主题入口)
├── @import 'tailwindcss';
├── @import './themes/tokens.css';      # 设计 Token
├── @import './themes/light.css';       # 亮色主题颜色
├── @import './themes/variants.css';    # 平台变体
└── └─ 全局样式（.ns-light 前缀）

app-dark.css (暗色主题入口)
├── @import 'tailwindcss';
├── @import './themes/tokens.css';      # 设计 Token
├── @import './themes/dark.css';        # 暗色主题颜色
├── @import './themes/variants.css';    # 平台变体
└── └─ 全局样式（.ns-dark 前缀）
```

#### 3. **正确的颜色定义方式**

```css
/* src/app.css */

/* ✅ 正确：使用类名前缀 + 固定色值 */
.ns-light .btn-primary {
  background-color: #3b82f6;  /* Blue 500 */
  color: #ffffff;
}

.ns-dark .btn-primary {
  background-color: #60a5fa;  /* Blue 400 (更亮，适合暗色背景) */
  color: #0c0a09;             /* 深色文字 */
}

.ns-light .text-primary {
  color: #3b82f6;
}

.ns-dark .text-primary {
  color: #60a5fa;
}

/* ❌ 错误：直接使用 CSS 变量（在某些场景不生效） */
.btn-primary {
  background-color: var(--color-primary); /* ⚠️ 可能不生效 */
}
```

#### 4. **为什么要这样做？**

NativeScript 对 CSS 变量的支持有限：

1. **某些属性不支持 CSS 变量**
   - `color`、`background-color` 在某些情况下不识别 CSS 变量
   - 需要使用固定的颜色值（十六进制、rgb 等）

2. **类名前缀确保一致性**
   - 当根元素类名从 `ns-light` 切换到 `ns-dark` 时
   - 所有带有 `.ns-light`/`.ns-dark` 前缀的样式会自动切换
   - 这种方式在 NativeScript 中最可靠

3. **动态颜色的处理**
   - 当需要在 `style` 属性中使用动态颜色时
   - 使用 TypeScript 函数返回对应的固定色值
   - 参考 HomePage.vue 中的 `getCategoryColor` 函数

### 主题颜色映射表

```typescript
// 亮色主题颜色
const lightThemeColors = {
  'text-primary': '#3b82f6',      // Blue 500
  'text-secondary': '#8b5cf6',    // Violet 500
  'text-success': '#10b981',      // Green 500
  'text-warning': '#f59e0b',      // Amber 500
  'text-destructive': '#ef4444',  // Red 500
  'text-accent': '#06b6d4',       // Cyan 500
  'text-foreground': '#18181b',   // 主文本色
  'text-muted-foreground': '#71717a', // 次要文本色
};

// 暗色主题颜色（稍微调亮以确保在暗色背景下可见）
const darkThemeColors = {
  'text-primary': '#60a5fa',      // Blue 400
  'text-secondary': '#a78bfa',    // Violet 400
  'text-success': '#34d399',      // Green 400
  'text-warning': '#fbbf24',      // Amber 400
  'text-destructive': '#f87171',  // Red 400
  'text-accent': '#22d3ee',       // Cyan 400
  'text-foreground': '#fafafa',   // 主文本色
  'text-muted-foreground': '#d4d4d8', // 次要文本色
};
```

---

## 架构设计

### 目录结构

```
src/
├── app.ts                          # ✨ 应用入口（需添加主题初始化）
├── app.css                         # 亮色主题样式
├── app-dark.css                    # 暗色主题样式
├── config/                         # 🆕 配置层
│   ├── navigation.ts               # 导航配置（迁移自 navigation.config.ts）
│   └── settings.ts                 # 🆕 设置配置
├── composables/                    # Composables
│   ├── useDialog.ts                # ✅ 对话框工具
│   ├── useFormValidation.ts        # ✅ 表单验证
│   ├── useBottomSheet.ts           # ✅ 底部抽屉
│   ├── useSideDrawer.ts            # ✅ 侧边抽屉
│   └── useSettings.ts              # 🆕 设置管理
├── components/
│   ├── MainContainer.vue           # ✨ 主容器（需小幅修改）
│   ├── pages/                      # 📄 页面组件（可作为模板复制）
│   │   ├── HomePage.vue            # ✅ 首页示例（列表、统计、导航）
│   │   ├── DiscoverPage.vue        # ✅ 标签页示例
│   │   ├── ProfilePage.vue         # ✅ 个人资料示例
│   │   ├── SettingsPage.vue        # 🆕 设置页面
│   │   ├── templates/              # 🆕 页面模板集合
│   │   │   ├── ListPage.vue        # 🆕 列表页模板
│   │   │   ├── FormPage.vue        # 🆕 表单页模板
│   │   │   ├── DetailPage.vue      # 🆕 详情页模板
│   │   │   └── EmptyPage.vue       # 🆕 空页面模板
│   ├── settings/                   # 🆕 设置相关组件
│   │   └── SettingsRenderer.vue    # 🆕 通用设置渲染器
│   ├── showcase/                   # ✅ 组件展示（教学价值高）
│   │   ├── ButtonsShowcase.vue
│   │   ├── InputsShowcase.vue
│   │   └── ... (其他 showcase)
│   └── ui/                         # ✅ UI 组件库（15+ 组件）
│       ├── NSButton.vue
│       ├── NSInput.vue
│       └── ... (其他组件)
├── utils/
│   └── theme.ts                    # ✅ SimpleThemeManager
└── themes/                         # ✅ 主题系统
    ├── tokens.css                  # 设计 Token
    ├── light.css                   # 亮色主题
    ├── dark.css                    # 暗色主题
    ├── variants.css                # 平台变体
    └── utilities.css               # 工具类
```

---

## 实施步骤

### 第一阶段：基础设施完善（1天）

#### Step 1.1: 主题初始化修复

**文件**: `src/app.ts`

```typescript
import { createApp } from 'nativescript-vue';
import MainContainer from './components/MainContainer.vue';
import { SimpleThemeManager } from './utils/theme';

// 🔥 关键：在创建应用前初始化主题
SimpleThemeManager.initializeTheme()
  .then(() => {
    console.log('[App] Theme initialized');
    createApp(MainContainer).start();
  })
  .catch((error) => {
    console.error('[App] Theme initialization failed:', error);
    // 降级方案：即使失败也启动应用
    createApp(MainContainer).start();
  });
```

**验收标准**:
- [ ] 应用启动无主题闪烁
- [ ] Console 显示主题初始化日志

---

#### Step 1.2: 创建 useSettings Composable

**文件**: `src/composables/useSettings.ts`

```typescript
import { ApplicationSettings } from '@nativescript/core';
import { ref, watch, type Ref } from 'nativescript-vue';

export type SettingValue = string | number | boolean;

/**
 * 响应式设置管理 Composable
 *
 * 特性：
 * - 自动持久化到 ApplicationSettings
 * - 响应式更新
 * - 类型安全
 */
export function useSettings() {
  /**
   * 获取响应式设置
   */
  function getSetting<T extends SettingValue>(
    key: string,
    defaultValue: T
  ): Ref<T> {
    const initialValue = readFromStorage(key, defaultValue);
    const setting = ref(initialValue) as Ref<T>;

    // 监听变化并自动保存
    watch(setting, (newValue) => {
      writeToStorage(key, newValue);
    });

    return setting;
  }

  /**
   * 设置值（非响应式）
   */
  function setSetting(key: string, value: SettingValue): void {
    writeToStorage(key, value);
  }

  /**
   * 获取设置值（非响应式）
   */
  function getSettingValue<T extends SettingValue>(
    key: string,
    defaultValue: T
  ): T {
    return readFromStorage(key, defaultValue);
  }

  // 私有辅助方法
  function readFromStorage<T extends SettingValue>(
    key: string,
    defaultValue: T
  ): T {
    if (typeof defaultValue === 'boolean') {
      return ApplicationSettings.getBoolean(key, defaultValue) as T;
    } else if (typeof defaultValue === 'number') {
      return ApplicationSettings.getNumber(key, defaultValue) as T;
    } else {
      return ApplicationSettings.getString(key, defaultValue as string) as T;
    }
  }

  function writeToStorage(key: string, value: SettingValue): void {
    if (typeof value === 'boolean') {
      ApplicationSettings.setBoolean(key, value);
    } else if (typeof value === 'number') {
      ApplicationSettings.setNumber(key, value);
    } else {
      ApplicationSettings.setString(key, String(value));
    }
  }

  return {
    getSetting,
    setSetting,
    getSettingValue,
  };
}
```

---

#### Step 1.3: 创建设置配置

**文件**: `src/config/settings.ts`

```typescript
import { SimpleThemeManager } from '@/utils/theme';

export type SettingType = 'switch' | 'select' | 'link' | 'button';

export interface SettingOption {
  label: string;
  value: string;
}

export interface SettingItem {
  id: string;
  type: SettingType;
  title: string;
  description?: string;
  icon?: string;
  default?: string | boolean;
  options?: SettingOption[];
  onChange?: (value: any) => void | Promise<void>;
  onTap?: () => void | Promise<void>;
}

export interface SettingGroup {
  id: string;
  title: string;
  icon?: string;
  items: SettingItem[];
}

/**
 * 设置配置
 * 新增设置项只需在此处添加
 */
export const settingsConfig: SettingGroup[] = [
  {
    id: 'appearance',
    title: '外观',
    icon: '\uf53f', // fa-palette
    items: [
      {
        id: 'app.theme',
        type: 'select',
        title: '主题模式',
        description: '选择浅色、深色或跟随系统',
        icon: '\uf186', // fa-moon
        default: 'auto',
        options: [
          { label: '浅色', value: 'light' },
          { label: '深色', value: 'dark' },
          { label: '跟随系统', value: 'auto' },
        ],
        onChange: async (value: string) => {
          await SimpleThemeManager.switchTheme(value);
        },
      },
    ],
  },
  {
    id: 'notifications',
    title: '通知',
    icon: '\uf0f3', // fa-bell
    items: [
      {
        id: 'app.notifications.enabled',
        type: 'switch',
        title: '启用通知',
        description: '接收应用推送通知',
        default: true,
      },
    ],
  },
  {
    id: 'about',
    title: '关于',
    icon: '\uf05a', // fa-info-circle
    items: [
      {
        id: 'app.version',
        type: 'link',
        title: '版本',
        description: 'v1.0.0',
        onTap: () => {
          console.log('Version info tapped');
        },
      },
    ],
  },
];
```

---

### 第二阶段：设置系统实现（1-2天）

#### Step 2.1: 创建设置渲染器

**文件**: `src/components/settings/SettingsRenderer.vue`

```vue
<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { useSettings } from '@/composables/useSettings';
import { type SettingGroup, type SettingItem } from '@/config/settings';
import NSSwitch from '@/components/ui/NSSwitch.vue';
import NSLabel from '@/components/ui/NSLabel.vue';

interface Props {
  groups: SettingGroup[];
}

const props = defineProps<Props>();
const { getSetting } = useSettings();

// 为每个设置项创建响应式引用
const settingRefs = computed(() => {
  const refs: Record<string, any> = {};
  for (const group of props.groups) {
    for (const item of group.items) {
      if (item.default !== undefined &&
          (item.type === 'switch' || item.type === 'select')) {
        refs[item.id] = getSetting(item.id, item.default);
      }
    }
  }
  return refs;
});

async function handleSettingChange(item: SettingItem, value: any) {
  if (item.onChange) {
    await item.onChange(value);
  }
}

async function handleTap(item: SettingItem) {
  if (item.onTap) {
    await item.onTap();
  }
}
</script>

<template>
  <ScrollView class="bg-background">
    <StackLayout class="p-4">
      <StackLayout
        v-for="group in groups"
        :key="group.id"
        class="mb-6"
      >
        <!-- 分组标题 -->
        <NSLabel
          :text="group.title"
          class="text-lg font-semibold mb-3"
        />

        <!-- 设置项卡片 -->
        <StackLayout class="bg-card rounded-lg" style="androidElevation: 2;">
          <StackLayout
            v-for="(item, index) in group.items"
            :key="item.id"
            class="p-4"
            :class="{ 'border-t border-border': index > 0 }"
          >
            <!-- Switch 类型 -->
            <GridLayout
              v-if="item.type === 'switch'"
              columns="*, auto"
            >
              <StackLayout col="0">
                <NSLabel :text="item.title" class="font-medium" />
                <NSLabel
                  v-if="item.description"
                  :text="item.description"
                  class="text-sm text-muted-foreground mt-1"
                  textWrap="true"
                />
              </StackLayout>
              <NSSwitch
                col="1"
                v-model="settingRefs[item.id].value"
                @checkedChange="handleSettingChange(item, $event)"
              />
            </GridLayout>

            <!-- Select 类型 -->
            <StackLayout
              v-else-if="item.type === 'select'"
              @tap="() => console.log('Select:', item.id)"
            >
              <GridLayout columns="*, auto">
                <StackLayout col="0">
                  <NSLabel :text="item.title" class="font-medium" />
                  <NSLabel
                    v-if="item.description"
                    :text="item.description"
                    class="text-sm text-muted-foreground mt-1"
                    textWrap="true"
                  />
                </StackLayout>
                <NSLabel
                  col="1"
                  :text="String(settingRefs[item.id]?.value || item.default)"
                  class="text-primary"
                />
              </GridLayout>
            </StackLayout>

            <!-- Link 类型 -->
            <GridLayout
              v-else-if="item.type === 'link'"
              columns="*, auto"
              @tap="handleTap(item)"
            >
              <StackLayout col="0">
                <NSLabel :text="item.title" class="font-medium" />
                <NSLabel
                  v-if="item.description"
                  :text="item.description"
                  class="text-sm text-muted-foreground mt-1"
                  textWrap="true"
                />
              </StackLayout>
              <Label
                col="1"
                text="&#xf054;"
                class="fas text-sm text-muted-foreground"
              />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
```

---

#### Step 2.2: 创建设置页面

**文件**: `src/components/pages/SettingsPage.vue`

```vue
<script lang="ts" setup>
import SettingsRenderer from '@/components/settings/SettingsRenderer.vue';
import { settingsConfig } from '@/config/settings';

/**
 * 设置页面
 *
 * 使用方式：
 * 1. 在 src/config/settings.ts 中添加设置项
 * 2. SettingsRenderer 会自动渲染
 * 3. 无需修改此文件
 */
</script>

<template>
  <StackLayout class="bg-background">
    <SettingsRenderer :groups="settingsConfig" />
  </StackLayout>
</template>
```

---

### 第三阶段：修复硬编码颜色（0.5天）

#### Step 3.1: 修复 NSBottomNavigation

**文件**: `src/components/ui/NSBottomNavigation.vue`

找到硬编码的 badge 颜色（第 99 行和 108 行），改为使用类名：

```vue
<!-- ❌ 修改前 -->
<Label
  text="..."
  style="background-color: #FF3B30; ..."
/>

<!-- ✅ 修改后 -->
<Label
  text="..."
  class="badge-dot"
/>
```

然后在 `app.css` 中定义样式：

```css
/* app.css */
.ns-light .badge-dot {
  background-color: #FF3B30;
}

.ns-dark .badge-dot {
  background-color: #f87171;
}
```

---

## 可复制的页面模板

### 为什么提供页面模板？

新开发者在使用 NativeScript 时，最大的困难是：
1. 不知道如何开始
2. 不清楚 NativeScript 的限制和最佳实践
3. 容易踩坑（如使用 flexbox、gap 等）

**解决方案**：提供完整的页面模板，开发者可以直接复制作为起点。

---

### 模板 1：列表页面

**文件**: `src/components/pages/templates/ListPage.vue`

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '@/components/ui/NSLabel.vue';

/**
 * 列表页面模板
 *
 * NativeScript 注意事项：
 * 1. 使用 StackLayout 而非 div
 * 2. 使用 ScrollView 实现滚动
 * 3. 使用 GridLayout 实现复杂布局
 * 4. textWrap="true" 实现文本换行
 */

interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  icon?: string;
}

const items = ref<ListItem[]>([
  { id: 1, title: '项目 1', subtitle: '描述 1', icon: '\uf015' },
  { id: 2, title: '项目 2', subtitle: '描述 2', icon: '\uf007' },
  { id: 3, title: '项目 3', subtitle: '描述 3', icon: '\uf013' },
]);

function handleItemTap(item: ListItem) {
  console.log('Item tapped:', item);
  // TODO: 导航到详情页
}
</script>

<template>
  <!--
    关键点：
    - ScrollView 用于滚动
    - scrollBarIndicatorVisible="false" 隐藏滚动条
  -->
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-4">
      <!-- 页面标题 -->
      <NSLabel
        text="列表页面"
        class="text-2xl font-bold mb-4"
      />

      <!-- 列表项容器 -->
      <StackLayout class="bg-card rounded-lg" style="androidElevation: 2;">
        <!--
          关键点：
          - v-for 遍历列表
          - GridLayout 用于项目布局
          - @tap 绑定点击事件
        -->
        <StackLayout
          v-for="(item, index) in items"
          :key="item.id"
          @tap="handleItemTap(item)"
        >
          <!--
            GridLayout 布局：
            - columns="auto, *, auto" 表示：图标(自适应) | 文本(填充) | 箭头(自适应)
            - rows="auto" 表示高度自适应
          -->
          <GridLayout columns="auto, *, auto" class="p-4" rows="auto">
            <!-- 图标 -->
            <Label
              v-if="item.icon"
              :text="item.icon"
              col="0"
              class="fas text-2xl text-primary mr-4"
              verticalAlignment="center"
            />

            <!-- 文本内容 -->
            <StackLayout col="1" verticalAlignment="center">
              <NSLabel
                :text="item.title"
                class="font-semibold text-base mb-1"
              />
              <NSLabel
                :text="item.subtitle"
                class="text-sm text-muted-foreground"
                textWrap="true"
              />
            </StackLayout>

            <!-- 右箭头 -->
            <Label
              text="&#xf054;"
              col="2"
              class="fas text-sm text-muted-foreground"
              verticalAlignment="center"
            />
          </GridLayout>

          <!-- 分隔线（最后一项不显示） -->
          <StackLayout
            v-if="index < items.length - 1"
            class="bg-border h-px mx-4"
          />
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/*
  注意：
  - NativeScript 不支持所有 CSS 属性
  - 优先使用 Tailwind 类名
  - 特殊需求才使用 <style>
*/
</style>
```

**学习要点**：
- ✅ 使用 `ScrollView` 而非 `overflow: scroll`
- ✅ 使用 `GridLayout` 实现项目布局
- ✅ 使用 `textWrap="true"` 实现文本换行
- ✅ 使用 `verticalAlignment="center"` 实现垂直居中
- ✅ 使用 `androidElevation` 和 `shadow` 实现阴影

---

### 模板 2：表单页面

**文件**: `src/components/pages/templates/FormPage.vue`

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '@/components/ui/NSLabel.vue';
import NSInput from '@/components/ui/NSInput.vue';
import NSButton from '@/components/ui/NSButton.vue';
import { useDialog } from '@/composables/useDialog';

/**
 * 表单页面模板
 *
 * NativeScript 注意事项：
 * 1. 使用 v-model 绑定输入框
 * 2. keyboardType 控制键盘类型
 * 3. 使用 StackLayout 而非 form 标签
 */

const name = ref('');
const email = ref('');
const { showAlert } = useDialog();

async function handleSubmit() {
  if (!name.value || !email.value) {
    await showAlert({
      title: '提示',
      message: '请填写所有字段',
    });
    return;
  }

  console.log('表单提交:', { name: name.value, email: email.value });

  await showAlert({
    title: '成功',
    message: '表单提交成功！',
  });
}
</script>

<template>
  <ScrollView class="bg-background">
    <StackLayout class="p-6">
      <!-- 页面标题 -->
      <NSLabel
        text="表单页面"
        class="text-2xl font-bold mb-6"
      />

      <!-- 表单卡片 -->
      <StackLayout class="bg-card p-6 rounded-lg mb-6" style="androidElevation: 2;">
        <!-- 姓名输入 -->
        <StackLayout class="mb-4">
          <NSLabel text="姓名" class="text-sm font-medium mb-2" />
          <!--
            关键点：
            - v-model 双向绑定
            - placeholder 占位符
            - keyboardType 控制键盘类型
          -->
          <NSInput
            v-model="name"
            placeholder="请输入姓名"
            keyboardType="text"
          />
        </StackLayout>

        <!-- 邮箱输入 -->
        <StackLayout class="mb-4">
          <NSLabel text="邮箱" class="text-sm font-medium mb-2" />
          <NSInput
            v-model="email"
            placeholder="请输入邮箱"
            keyboardType="email"
          />
        </StackLayout>

        <!-- 提交按钮 -->
        <NSButton
          variant="primary"
          text="提交"
          @tap="handleSubmit"
          class="mt-2"
        />
      </StackLayout>

      <!-- 提示信息 -->
      <StackLayout class="bg-card p-4 rounded-lg" style="androidElevation: 1;">
        <NSLabel
          text="💡 提示：表单数据会在提交后显示在控制台"
          class="text-sm text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
```

**学习要点**：
- ✅ 使用 `v-model` 绑定表单数据
- ✅ 使用 `keyboardType` 控制键盘类型（text/email/number/phone）
- ✅ 使用 `useDialog` 显示提示
- ✅ 使用 `StackLayout` 而非 `<form>` 标签

---

### 模板 3：详情页面

**文件**: `src/components/pages/templates/DetailPage.vue`

```vue
<script lang="ts" setup>
import { ref, inject } from 'nativescript-vue';
import NSLabel from '@/components/ui/NSLabel.vue';
import NSButton from '@/components/ui/NSButton.vue';
import NSBadge from '@/components/ui/NSBadge.vue';

/**
 * 详情页面模板
 *
 * NativeScript 注意事项：
 * 1. 使用 inject 获取导航方法
 * 2. 使用 GridLayout 实现复杂布局
 * 3. 使用 androidElevation 实现阴影
 */

interface Props {
  itemId?: number;
}

const props = defineProps<Props>();
const backToParentPage = inject('backToParentPage') as (() => void) | undefined;

const item = ref({
  id: props.itemId || 1,
  title: '项目标题',
  description: '这是一段详细的描述信息，展示如何在 NativeScript 中实现详情页面。',
  status: 'active',
  createdAt: '2025-10-26',
  tags: ['标签1', '标签2', '标签3'],
});

function handleBack() {
  if (backToParentPage) {
    backToParentPage();
  }
}

function handleAction() {
  console.log('Action button tapped');
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-4">
      <!-- 头部信息 -->
      <StackLayout class="bg-card p-6 rounded-lg mb-4" style="androidElevation: 2;">
        <!-- 标题和状态 -->
        <GridLayout columns="*, auto" class="mb-4">
          <NSLabel
            :text="item.title"
            col="0"
            class="text-2xl font-bold"
          />
          <NSBadge
            :text="item.status"
            col="1"
            variant="success"
          />
        </GridLayout>

        <!-- 描述 -->
        <NSLabel
          :text="item.description"
          class="text-base text-muted-foreground mb-4"
          textWrap="true"
        />

        <!-- 元信息 -->
        <GridLayout columns="auto, *" class="mb-2">
          <NSLabel text="创建时间" col="0" class="text-sm text-muted-foreground mr-4" />
          <NSLabel :text="item.createdAt" col="1" class="text-sm" />
        </GridLayout>
      </StackLayout>

      <!-- 标签 -->
      <StackLayout class="bg-card p-6 rounded-lg mb-4" style="androidElevation: 2;">
        <NSLabel text="标签" class="text-lg font-semibold mb-3" />
        <StackLayout orientation="horizontal">
          <NSBadge
            v-for="tag in item.tags"
            :key="tag"
            :text="tag"
            variant="secondary"
            class="mr-2"
          />
        </StackLayout>
      </StackLayout>

      <!-- 操作按钮 -->
      <StackLayout class="mb-4">
        <NSButton
          variant="primary"
          text="执行操作"
          @tap="handleAction"
          class="mb-2"
        />
        <NSButton
          variant="outline"
          text="返回"
          @tap="handleBack"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
```

**学习要点**：
- ✅ 使用 `inject` 获取父组件提供的导航方法
- ✅ 使用 `Props` 接收参数
- ✅ 使用 `GridLayout` 实现左右布局
- ✅ 使用 `NSBadge` 显示状态标签

---

### 模板 4：空页面

**文件**: `src/components/pages/templates/EmptyPage.vue`

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '@/components/ui/NSLabel.vue';
import NSButton from '@/components/ui/NSButton.vue';

/**
 * 空页面模板
 *
 * 用途：
 * - 快速创建新页面的起点
 * - 展示最基本的 NativeScript 页面结构
 */

const message = ref('欢迎来到新页面');

function handleButtonTap() {
  console.log('Button tapped!');
}
</script>

<template>
  <!--
    基础页面结构：
    1. ScrollView - 滚动容器（可选，如果内容可能超出屏幕）
    2. StackLayout - 垂直堆叠布局
    3. NSLabel - 文本组件
    4. NSButton - 按钮组件
  -->
  <ScrollView class="bg-background">
    <StackLayout class="p-6 items-center justify-center h-full">
      <!-- 图标 -->
      <Label
        text="&#xf1c0;"
        class="fas text-6xl text-primary mb-6"
      />

      <!-- 标题 -->
      <NSLabel
        :text="message"
        class="text-2xl font-bold text-center mb-4"
      />

      <!-- 描述 -->
      <NSLabel
        text="这是一个空白页面模板，你可以在此基础上开始开发。"
        class="text-base text-muted-foreground text-center mb-6"
        textWrap="true"
      />

      <!-- 操作按钮 -->
      <NSButton
        variant="primary"
        text="开始使用"
        @tap="handleButtonTap"
      />
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/*
  NativeScript 样式注意事项：
  - 优先使用 Tailwind 类名
  - 不支持所有 CSS 属性
  - 某些属性需要使用特定格式（如 androidElevation）
*/
</style>
```

---

### 如何使用这些模板？

#### 方式 1：直接复制文件

```bash
# 1. 复制模板文件
cp src/components/pages/templates/ListPage.vue \
   src/components/pages/MyListPage.vue

# 2. 修改文件内容
# 3. 在导航配置中添加路由
```

#### 方式 2：复制代码片段

```vue
<!-- 从模板中复制需要的部分 -->
<GridLayout columns="auto, *, auto" class="p-4" rows="auto">
  <!-- ... -->
</GridLayout>
```

---

## 测试验收标准

### 功能测试

#### 1. 主题系统
- [ ] 应用启动无主题闪烁
- [ ] 切换主题立即生效
- [ ] auto 模式跟随系统
- [ ] 主题持久化生效
- [ ] 所有组件正确响应主题

#### 2. 设置系统
- [ ] 设置页面正常渲染
- [ ] Switch 设置正常切换
- [ ] 设置值持久化
- [ ] onChange 回调触发
- [ ] 主题设置联动正常

#### 3. 页面模板
- [ ] 所有模板可以正常运行
- [ ] 代码注释清晰易懂
- [ ] 展示了 NS 最佳实践

### 平台兼容性

- [ ] iOS 测试通过
- [ ] Android 测试通过
- [ ] 平台特定样式正确

---

## 总结

### 核心变更点

1. **项目定位明确** - shadcn/ui 风格的复制粘贴组件库
2. **主题系统正确** - 使用类名前缀（`.ns-light`/`.ns-dark`）而非 CSS 变量
3. **页面模板丰富** - 提供完整的可复制示例，降低上手成本
4. **差异说明清晰** - 标注 NativeScript vs Web 的关键差异

### 实施时间估算

- **第一阶段**（基础设施）：1 天
- **第二阶段**（设置系统）：1-2 天
- **第三阶段**（修复硬编码）：0.5 天

**总计**: 2.5-3.5 天

### 后续可扩展方向

1. **更多页面模板**
   - 搜索页面
   - 聊天页面
   - 地图页面

2. **组件文档**
   - 为每个组件添加使用说明
   - 提供代码示例

3. **国际化支持**
   - 集成 i18n
   - 多语言示例

---

**文档维护者**: Claude Code
**最后更新**: 2025-10-26
