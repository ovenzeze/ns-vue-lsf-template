import { SimpleThemeManager } from '../utils/theme';

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
 *
 * 如何添加新设置：
 * 1. 在相应的分组中添加新的 SettingItem
 * 2. 设置 id (用于持久化存储)
 * 3. 设置 type ('switch' | 'select' | 'link' | 'button')
 * 4. 设置 default 默认值
 * 5. 如果是 select 类型，提供 options 数组
 * 6. 如果需要响应变化，提供 onChange 回调
 * 7. 如果是 link/button 类型，提供 onTap 回调
 *
 * 示例：
 * {
 *   id: 'app.notifications.sound',
 *   type: 'switch',
 *   title: '声音提醒',
 *   description: '接收通知时播放声音',
 *   icon: '\uf028', // fa-volume-up
 *   default: true,
 *   onChange: async (value: boolean) => {
 *     console.log('Sound setting changed:', value);
 *   }
 * }
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
        default: 'light',
        options: [
          { label: '浅色', value: 'light' },
          { label: '深色', value: 'dark' },
          { label: '跟随系统', value: 'auto' },
        ],
        onChange: async (value: string) => {
          console.log('[Settings] Theme changing to:', value);
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
        icon: '\uf0a2', // fa-bell-on
        default: true,
        onChange: async (value: boolean) => {
          console.log('[Settings] Notifications enabled:', value);
          // TODO: 实现通知开关逻辑
        },
      },
      {
        id: 'app.notifications.sound',
        type: 'switch',
        title: '声音提醒',
        description: '接收通知时播放声音',
        icon: '\uf028', // fa-volume-up
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
        icon: '\uf02d', // fa-book
        onTap: () => {
          console.log('[Settings] Version info tapped');
          // TODO: 显示版本详情或更新日志
        },
      },
      {
        id: 'app.privacy',
        type: 'link',
        title: '隐私政策',
        icon: '\uf21b', // fa-shield-alt
        onTap: () => {
          console.log('[Settings] Privacy policy tapped');
          // TODO: 打开隐私政策页面
        },
      },
      {
        id: 'app.terms',
        type: 'link',
        title: '服务条款',
        icon: '\uf0f6', // fa-file-contract
        onTap: () => {
          console.log('[Settings] Terms of service tapped');
          // TODO: 打开服务条款页面
        },
      },
    ],
  },
];
