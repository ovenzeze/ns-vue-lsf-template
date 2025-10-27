import { NativeScriptConfig } from '@nativescript/core';

export default {
    id: 'com.ovenzeze.nsvuestarter',
    appPath: 'src',
    appResourcesPath: 'App_Resources',
    android: {
        v8Flags: '--expose_gc',
        markingMode: 'none'
    },
    ios: {
        discardUncaughtJsExceptions: false
    },
    // 尝试使用 Bun 作为包管理器（实验性功能）
    cli: {
        packageManager: 'bun'
    }
} as NativeScriptConfig;
