import { createApp } from 'nativescript-vue';
import MainContainer from './components/MainContainer.vue';
import { SimpleThemeManager } from './utils/theme';

/**
 * NativeScript Vue LSF Template
 *
 * 🔥 关键：在创建应用前初始化主题，避免首屏闪烁
 */
SimpleThemeManager.initializeTheme()
  .then(() => {
    console.log('[App] Theme initialized successfully');
    createApp(MainContainer).start();
  })
  .catch((error) => {
    console.error('[App] Theme initialization failed:', error);
    // 降级方案：即使失败也启动应用
    createApp(MainContainer).start();
  });
