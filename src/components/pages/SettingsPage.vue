<script lang="ts" setup>
import SettingsRenderer from '../settings/SettingsRenderer.vue';
import { settingsConfig } from '../../config/settings';

/**
 * 设置页面
 *
 * 这是一个配置驱动的设置页面示例。
 *
 * 🎯 如何添加新的设置项：
 * 1. 打开 src/config/settings.ts
 * 2. 在相应的分组中添加新的 SettingItem
 * 3. SettingsRenderer 会自动渲染新的设置项
 * 4. 无需修改此文件
 *
 * 📖 支持的设置类型：
 * - switch: 开关设置（如：启用通知）
 * - select: 选择设置（如：主题模式）
 * - link: 链接设置（如：隐私政策）
 * - button: 按钮设置（如：清除缓存）
 *
 * 💡 使用示例（在 src/config/settings.ts 中添加）：
 * ```typescript
 * {
 *   id: 'appearance',
 *   title: '外观',
 *   items: [
 *     {
 *       id: 'app.theme',
 *       type: 'select',
 *       title: '主题模式',
 *       description: '选择浅色、深色或跟随系统',
 *       default: 'light',
 *       options: [
 *         { label: '浅色', value: 'light' },
 *         { label: '深色', value: 'dark' },
 *       ],
 *       onChange: async (value) => {
 *         await SimpleThemeManager.switchTheme(value);
 *       }
 *     }
 *   ]
 * }
 * ```
 */
</script>

<template>
  <StackLayout class="bg-background">
    <SettingsRenderer :groups="settingsConfig" />
  </StackLayout>
</template>
