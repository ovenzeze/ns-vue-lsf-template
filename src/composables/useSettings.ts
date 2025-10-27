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
 *
 * 使用示例：
 *
 * ```typescript
 * // 在组件中使用
 * const { getSetting, setSetting } = useSettings();
 *
 * // 获取响应式设置（自动监听变化并保存）
 * const theme = getSetting('app.theme', 'light');
 * theme.value = 'dark'; // 自动保存到 ApplicationSettings
 *
 * // 非响应式设置值
 * setSetting('app.notifications.enabled', true);
 *
 * // 非响应式获取值
 * const notificationsEnabled = getSettingValue('app.notifications.enabled', false);
 * ```
 */
export function useSettings() {
  /**
   * 获取响应式设置
   *
   * @param key 设置键名
   * @param defaultValue 默认值
   * @returns 响应式引用
   *
   * @example
   * const theme = getSetting('app.theme', 'light');
   * watch(theme, (newValue) => {
   *   console.log('Theme changed to:', newValue);
   * });
   */
  function getSetting<T extends SettingValue>(
    key: string,
    defaultValue: T
  ): Ref<T> {
    const initialValue = readFromStorage(key, defaultValue);
    const setting = ref(initialValue) as Ref<T>;

    // 监听变化并自动保存
    watch(setting, (newValue) => {
      console.log(`[useSettings] ${key} changed to:`, newValue);
      writeToStorage(key, newValue);
    });

    return setting;
  }

  /**
   * 设置值（非响应式）
   *
   * @param key 设置键名
   * @param value 设置值
   *
   * @example
   * setSetting('app.version', '1.0.0');
   */
  function setSetting(key: string, value: SettingValue): void {
    console.log(`[useSettings] Setting ${key} to:`, value);
    writeToStorage(key, value);
  }

  /**
   * 获取设置值（非响应式）
   *
   * @param key 设置键名
   * @param defaultValue 默认值
   * @returns 设置值
   *
   * @example
   * const version = getSettingValue('app.version', '1.0.0');
   */
  function getSettingValue<T extends SettingValue>(
    key: string,
    defaultValue: T
  ): T {
    return readFromStorage(key, defaultValue);
  }

  /**
   * 删除设置
   *
   * @param key 设置键名
   *
   * @example
   * removeSetting('app.cache');
   */
  function removeSetting(key: string): void {
    console.log(`[useSettings] Removing ${key}`);
    ApplicationSettings.remove(key);
  }

  /**
   * 清除所有设置
   *
   * ⚠️ 危险操作：会清除所有 ApplicationSettings 数据
   *
   * @example
   * clearAllSettings();
   */
  function clearAllSettings(): void {
    console.warn('[useSettings] Clearing all settings');
    ApplicationSettings.clear();
  }

  /**
   * 检查设置是否存在
   *
   * @param key 设置键名
   * @returns 是否存在
   *
   * @example
   * if (hasSetting('app.theme')) {
   *   console.log('Theme setting exists');
   * }
   */
  function hasSetting(key: string): boolean {
    return ApplicationSettings.hasKey(key);
  }

  // ========== 私有辅助方法 ==========

  /**
   * 从存储中读取值
   */
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

  /**
   * 写入值到存储
   */
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
    removeSetting,
    clearAllSettings,
    hasSetting,
  };
}
