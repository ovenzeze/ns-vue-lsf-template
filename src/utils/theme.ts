import { Application, ApplicationSettings } from '@nativescript/core';

/**
 * 简单的主题切换工具
 * 基于已验证有效的切换方式
 */
export class SimpleThemeManager {
  private static currentTheme: string = 'light';

  /**
   * 切换主题
   * @param themeId 'light' | 'dark' | 'auto'
   */
  static async switchTheme(themeId: string): Promise<void> {
    console.log(`[SimpleThemeManager] Switching to theme: ${themeId}`);
    
    let targetTheme = themeId;
    
    // 处理自动主题
    if (themeId === 'auto') {
      const systemAppearance = Application.systemAppearance();
      targetTheme = systemAppearance === 'dark' ? 'dark' : 'light';
      console.log(`[SimpleThemeManager] Auto theme resolved to: ${targetTheme} (system: ${systemAppearance})`);
    }
    
    try {
      // 1. 切换 CSS 文件
      const cssFileName = targetTheme === 'dark' ? '~/app-dark.css' : '~/app.css';
      console.log(`[SimpleThemeManager] Switching to CSS file: ${cssFileName}`);
      Application.setCssFileName(cssFileName);
      
      // 2. 强制重新加载 CSS
      console.log(`[SimpleThemeManager] Forcing CSS reload...`);
      Application.loadAppCss();
      
      // 3. 设置根视图类名（用于 CSS 变量和类选择器）
      const rootView = Application.getRootView();
      if (rootView) {
        console.log(`[SimpleThemeManager] Current rootView className: ${rootView.className}`);
        
        // 确保 className 存在，如果不存在则初始化为空字符串
        const currentClassName = rootView.className || '';
        
        // 先移除所有主题类
        const cleanedClassName = currentClassName.replace(/ns-(light|dark)/g, '').trim();
        
        // 添加新主题类
        rootView.className = `${cleanedClassName} ns-${targetTheme}`.trim();
        
        console.log(`[SimpleThemeManager] New rootView className: ${rootView.className}`);
        
        // 4. 强制刷新所有页面以应用新的 CSS 变量
        setTimeout(() => {
          this.forceRefreshAllPages();
        }, 100);
      } else {
        console.warn('[SimpleThemeManager] Root view not found, CSS file switching should still work');
      }
      
      // 4. 保存主题偏好
      this.currentTheme = targetTheme;
      ApplicationSettings.setString('app_theme', targetTheme);
      
      console.log(`[SimpleThemeManager] Theme successfully switched to: ${targetTheme}`);
    } catch (error) {
      console.error('[SimpleThemeManager] Error switching theme:', error);
      throw error;
    }
  }

  /**
   * 获取当前主题
   */
  static getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * 初始化主题（应用启动时调用）
   */
  static async initializeTheme(): Promise<void> {
    const savedTheme = ApplicationSettings.getString('app_theme', 'light');
    console.log(`[SimpleThemeManager] Initializing with saved theme: ${savedTheme}`);
    
    // 先设置当前主题状态
    this.currentTheme = savedTheme;
    
    // 然后切换主题
    await this.switchTheme(savedTheme);
  }

  /**
   * 检查是否为暗色主题
   */
  static isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * 检查是否为亮色主题
   */
  static isLightTheme(): boolean {
    return this.currentTheme === 'light';
  }

  /**
   * 强制刷新所有页面以应用新的 CSS 变量
   * 注意：由于 View 类型不包含 currentPage 属性，这里仅做基础刷新
   */
  private static forceRefreshAllPages(): void {
    try {
      const rootView = Application.getRootView();
      if (rootView) {
        // 触发 rootView 的重新渲染
        // 通过修改和恢复一个属性来强制视图更新
        const originalOpacity = rootView.opacity;
        rootView.opacity = 0.99;
        setTimeout(() => {
          rootView.opacity = originalOpacity;
        }, 10);
        console.log(`[SimpleThemeManager] Forced rootView refresh`);
      }
    } catch (error) {
      console.warn('[SimpleThemeManager] Could not refresh pages:', error);
    }
  }
}
