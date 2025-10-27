<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '../../ui/NSLabel.vue';
import NSInput from '../../ui/NSInput.vue';
import NSButton from '../../ui/NSButton.vue';
import { useDialog } from '../../../composables/useDialog';

/**
 * 表单页面模板
 *
 * 📚 NativeScript 表单关键概念：
 * 1. 使用 v-model 进行双向数据绑定
 * 2. keyboardType 控制键盘类型（text/email/number/phone/url）
 * 3. autocapitalizationType 控制自动大写
 * 4. autocorrect 控制自动更正
 * 5. returnKeyType 控制回车键类型
 * 6. 使用 StackLayout 代替 <form> 标签
 *
 * 🎯 使用场景：
 * - 登录表单
 * - 注册表单
 * - 个人资料编辑
 * - 数据提交表单
 *
 * ⚡ 快速开始：
 * 1. 复制此文件到 src/components/pages/
 * 2. 修改表单字段定义
 * 3. 修改 handleSubmit 提交逻辑
 * 4. 添加验证规则（可选）
 * 5. 根据需要调整样式
 */

const name = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const agreeToTerms = ref(false);
const isSubmitting = ref(false);

const { showAlert } = useDialog();

/**
 * 简单的表单验证
 */
function validateForm(): string | null {
  if (!name.value || name.value.trim() === '') {
    return '请输入姓名';
  }

  if (!email.value || email.value.trim() === '') {
    return '请输入邮箱';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    return '请输入有效的邮箱地址';
  }

  if (!agreeToTerms.value) {
    return '请同意服务条款';
  }

  return null;
}

/**
 * 处理表单提交
 */
async function handleSubmit() {
  // 验证表单
  const error = validateForm();
  if (error) {
    await showAlert({
      title: '验证失败',
      message: error,
      okButtonText: '确定',
    });
    return;
  }

  isSubmitting.value = true;

  try {
    // TODO: 实现实际的提交逻辑
    console.log('表单提交:', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      agreeToTerms: agreeToTerms.value,
    });

    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    await showAlert({
      title: '提交成功',
      message: '您的信息已成功提交！',
      okButtonText: '确定',
    });

    // 清空表单
    resetForm();
  } catch (error) {
    console.error('表单提交失败:', error);
    await showAlert({
      title: '提交失败',
      message: '请稍后重试',
      okButtonText: '确定',
    });
  } finally {
    isSubmitting.value = false;
  }
}

/**
 * 重置表单
 */
function resetForm() {
  name.value = '';
  email.value = '';
  phone.value = '';
  message.value = '';
  agreeToTerms.value = false;
}
</script>

<template>
  <ScrollView class="bg-background">
    <StackLayout class="p-6">
      <!-- 页面标题 -->
      <NSLabel
        text="表单页面模板"
        class="text-2xl font-bold mb-2"
      />
      <NSLabel
        text="演示如何在 NativeScript 中创建表单"
        class="text-sm text-muted-foreground mb-6"
        textWrap="true"
      />

      <!-- 表单卡片 -->
      <StackLayout
        class="bg-card p-6 rounded-lg mb-6"
        style="androidElevation: 2;"
      >
        <!-- 姓名输入 -->
        <StackLayout class="mb-4">
          <NSLabel
            text="姓名 *"
            class="text-sm font-medium mb-2"
          />
          <!--
            关键点：
            - v-model 双向绑定
            - placeholder 占位符
            - keyboardType 控制键盘类型
            - returnKeyType 控制回车键类型
          -->
          <NSInput
            v-model="name"
            placeholder="请输入姓名"
            keyboardType="text"
            autocapitalizationType="words"
            returnKeyType="next"
          />
        </StackLayout>

        <!-- 邮箱输入 -->
        <StackLayout class="mb-4">
          <NSLabel
            text="邮箱 *"
            class="text-sm font-medium mb-2"
          />
          <NSInput
            v-model="email"
            placeholder="请输入邮箱"
            keyboardType="email"
            autocapitalizationType="none"
            autocorrect="false"
            returnKeyType="next"
          />
        </StackLayout>

        <!-- 手机号输入 -->
        <StackLayout class="mb-4">
          <NSLabel
            text="手机号（可选）"
            class="text-sm font-medium mb-2"
          />
          <NSInput
            v-model="phone"
            placeholder="请输入手机号"
            keyboardType="phone"
            returnKeyType="next"
          />
        </StackLayout>

        <!-- 多行文本输入 -->
        <StackLayout class="mb-4">
          <NSLabel
            text="留言（可选）"
            class="text-sm font-medium mb-2"
          />
          <TextView
            v-model="message"
            hint="请输入留言"
            class="bg-input text-foreground rounded-lg p-3 min-h-24"
            returnKeyType="done"
          />
        </StackLayout>

        <!-- 复选框示例 -->
        <GridLayout columns="auto, *" class="mb-6">
          <Switch
            col="0"
            v-model="agreeToTerms"
            class="mr-3"
          />
          <StackLayout col="1" verticalAlignment="center">
            <NSLabel
              text="我已阅读并同意服务条款和隐私政策"
              class="text-sm"
              textWrap="true"
            />
          </StackLayout>
        </GridLayout>

        <!-- 提交按钮 -->
        <NSButton
          variant="primary"
          :text="isSubmitting ? '提交中...' : '提交'"
          @tap="handleSubmit"
          :isEnabled="!isSubmitting"
          class="mb-2"
        />

        <!-- 重置按钮 -->
        <NSButton
          variant="outline"
          text="重置"
          @tap="resetForm"
          :isEnabled="!isSubmitting"
        />
      </StackLayout>

      <!-- 提示信息 -->
      <StackLayout
        class="bg-card p-4 rounded-lg"
        style="androidElevation: 1;"
      >
        <NSLabel
          text="💡 提示：这是一个表单页面模板，展示了各种输入类型和验证方式。"
          class="text-sm text-muted-foreground mb-2"
          textWrap="true"
        />
        <NSLabel
          text="支持的键盘类型："
          class="text-sm font-medium mb-1"
        />
        <NSLabel
          text="• text - 默认键盘\n• email - 邮箱键盘\n• phone - 电话键盘\n• number - 数字键盘\n• url - URL键盘"
          class="text-xs text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/**
 * NativeScript 表单样式注意事项：
 * - 使用 Tailwind 类名进行样式化
 * - TextView 需要明确设置 min-height
 * - Switch 组件样式有限，主要依赖平台默认样式
 */
</style>
