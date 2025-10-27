<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '../../ui/NSLabel.vue';
import NSButton from '../../ui/NSButton.vue';

/**
 * 空页面模板
 *
 * 📚 这是一个最小化的页面模板，适合作为新页面的起点
 *
 * 🎯 使用场景：
 * - 快速创建新页面
 * - 学习 NativeScript 基础结构
 * - 作为其他模板的参考
 *
 * ⚡ 快速开始：
 * 1. 复制此文件到 src/components/pages/
 * 2. 重命名文件（如：MyNewPage.vue）
 * 3. 修改页面内容
 * 4. 在导航配置中添加路由（如果需要）
 *
 * 🔑 关键 NativeScript 概念：
 * - ScrollView: 滚动容器（当内容超出屏幕时）
 * - StackLayout: 垂直堆叠布局
 * - Label/NSLabel: 文本组件
 * - NSButton: 按钮组件
 * - class: Tailwind 样式类名
 */

const message = ref('欢迎来到新页面');
const counter = ref(0);

/**
 * 按钮点击处理
 */
function handleButtonTap() {
  counter.value++;
  console.log('Button tapped! Counter:', counter.value);
  message.value = `按钮已点击 ${counter.value} 次`;
}

/**
 * 重置计数器
 */
function handleReset() {
  counter.value = 0;
  message.value = '欢迎来到新页面';
  console.log('Counter reset');
}
</script>

<template>
  <!--
    基础页面结构：
    1. ScrollView - 滚动容器（可选，如果内容可能超出屏幕）
    2. StackLayout - 垂直堆叠布局
    3. 组件内容
  -->
  <ScrollView class="bg-background">
    <StackLayout class="p-6 items-center justify-center min-h-screen">
      <!-- 图标 -->
      <Label
        text="&#xf1c0;"
        class="fas text-6xl text-primary mb-6"
      />

      <!-- 主标题 -->
      <NSLabel
        :text="message"
        class="text-2xl font-bold text-center mb-4"
        textWrap="true"
      />

      <!-- 描述文本 -->
      <NSLabel
        text="这是一个空白页面模板，你可以在此基础上开始开发。"
        class="text-base text-muted-foreground text-center mb-2"
        textWrap="true"
      />

      <NSLabel
        text="已包含基础的 NativeScript 页面结构和常用组件。"
        class="text-sm text-muted-foreground text-center mb-8"
        textWrap="true"
      />

      <!-- 计数器显示 -->
      <StackLayout
        v-if="counter > 0"
        class="bg-card p-4 rounded-lg mb-6"
        style="androidElevation: 1;"
      >
        <NSLabel
          :text="`计数器: ${counter}`"
          class="text-lg font-semibold text-center"
        />
      </StackLayout>

      <!-- 操作按钮 -->
      <StackLayout class="w-full" horizontalAlignment="center">
        <NSButton
          variant="primary"
          text="点击测试"
          @tap="handleButtonTap"
          class="mb-2 w-48"
        />

        <NSButton
          v-if="counter > 0"
          variant="outline"
          text="重置"
          @tap="handleReset"
          class="w-48"
        />
      </StackLayout>

      <!-- 开发提示 -->
      <StackLayout class="bg-card p-4 rounded-lg mt-8" style="androidElevation: 1;">
        <NSLabel
          text="📖 开发提示"
          class="text-sm font-semibold mb-2"
        />
        <NSLabel
          text="• 修改 message 变量来改变标题\n• 添加更多响应式数据\n• 使用 NSLabel, NSButton 等组件\n• 使用 Tailwind 类名进行样式化\n• 使用 composables 复用逻辑"
          class="text-xs text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/**
 * NativeScript 样式注意事项：
 * - 优先使用 Tailwind 类名
 * - 不支持所有 CSS 属性（如 display: flex, gap 等）
 * - 某些属性需要使用特定格式（如 androidElevation）
 * - iOS 使用 class="shadow-lg"
 * - Android 使用 style="androidElevation: 2;"
 *
 * 常用 Tailwind 类名：
 * - 文本: text-sm, text-base, text-lg, text-xl, text-2xl
 * - 颜色: text-primary, text-foreground, text-muted-foreground
 * - 字重: font-normal, font-medium, font-semibold, font-bold
 * - 间距: p-4, m-4, mb-2, mt-4
 * - 布局: items-center, justify-center, text-center
 * - 背景: bg-background, bg-card, bg-primary
 * - 圆角: rounded-lg, rounded-full
 */
</style>
