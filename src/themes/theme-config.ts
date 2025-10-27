/**
 * 主题配置文件
 * 集中管理所有主题颜色，便于维护和更新
 */

export const lightTheme = {
  // 基础背景色
  background: {
    base: '#fafafa',      // --color-base-100
    elevated: '#f4f4f5',  // --color-base-200
    muted: '#e4e4e7',     // --color-base-300
  },
  
  // 文字颜色
  text: {
    primary: '#18181b',   // --color-text-primary
    secondary: '#71717a', // --color-text-secondary
    tertiary: '#71717a',  // --color-text-tertiary
    muted: '#71717a',
  },
  
  // 品牌色
  brand: {
    primary: '#3b82f6',   // --color-primary (Blue 500)
    secondary: '#8b5cf6', // --color-secondary (Violet 500)
  },
  
  // 边框和分隔线
  border: '#e4e4e7',      // --color-border
};

export const darkTheme = {
  // 基础背景色
  background: {
    base: '#1a1a1a',      // --color-base-100
    elevated: '#262626',  // --color-base-200
    muted: '#404040',     // --color-base-300
  },
  
  // 文字颜色
  text: {
    primary: '#fafafa',   // --color-text-primary (更亮，确保可读性)
    secondary: '#d4d4d8', // --color-text-secondary (提高对比度，从 #a1a1aa 改为 #d4d4d8)
    tertiary: '#d4d4d8',  // --color-text-tertiary (提高对比度)
    muted: '#d4d4d8',     // 次要文字，提高可读性
  },
  
  // 品牌色
  brand: {
    primary: '#60a5fa',   // --color-primary (Blue 400, brighter for dark)
    secondary: '#a78bfa', // --color-secondary (Violet 400)
  },
  
  // 边框和分隔线
  border: '#404040',      // --color-border
};

export type Theme = typeof lightTheme;
export type ThemeColors = keyof Theme;
