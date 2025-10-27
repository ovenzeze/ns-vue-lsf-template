<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '../../ui/NSLabel.vue';

/**
 * 列表页面模板
 *
 * 📚 NativeScript 关键概念：
 * 1. 使用 ScrollView 而非 overflow: scroll
 * 2. 使用 StackLayout 代替 div 进行垂直堆叠
 * 3. 使用 GridLayout 实现复杂的项目布局
 * 4. textWrap="true" 实现文本换行
 * 5. verticalAlignment="center" 实现垂直居中
 * 6. androidElevation 和 ios:shadow 实现阴影效果
 *
 * 🎯 使用场景：
 * - 任务列表
 * - 文章列表
 * - 通知列表
 * - 用户列表
 *
 * ⚡ 快速开始：
 * 1. 复制此文件到 src/components/pages/
 * 2. 修改 ListItem 接口定义
 * 3. 修改 items 数据源
 * 4. 修改 handleItemTap 处理逻辑
 * 5. 根据需要调整样式
 */

interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  icon?: string;
  badge?: string;
  showChevron?: boolean;
}

const items = ref<ListItem[]>([
  {
    id: 1,
    title: '项目 1',
    subtitle: '这是项目 1 的描述信息，可以很长很长，NativeScript 会自动换行。',
    icon: '\uf015', // fa-home
    badge: 'NEW',
    showChevron: true,
  },
  {
    id: 2,
    title: '项目 2',
    subtitle: '这是项目 2 的描述信息。',
    icon: '\uf007', // fa-user
    showChevron: true,
  },
  {
    id: 3,
    title: '项目 3',
    subtitle: '这是项目 3 的描述信息。',
    icon: '\uf013', // fa-cog
    badge: '99+',
    showChevron: true,
  },
  {
    id: 4,
    title: '项目 4',
    subtitle: '这是项目 4 的描述信息。',
    icon: '\uf0f3', // fa-bell
    showChevron: false,
  },
]);

/**
 * 处理列表项点击
 */
function handleItemTap(item: ListItem) {
  console.log('Item tapped:', item);
  // TODO: 导航到详情页
  // 示例: navigateTo(DetailPage, { props: { itemId: item.id } });
}

/**
 * 处理刷新
 */
function handleRefresh() {
  console.log('Refreshing...');
  // TODO: 实现下拉刷新逻辑
}
</script>

<template>
  <!--
    关键点：
    - ScrollView 用于滚动
    - scrollBarIndicatorVisible="false" 隐藏滚动条（可选）
  -->
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-4">
      <!-- 页面标题 -->
      <NSLabel
        text="列表页面模板"
        class="text-2xl font-bold mb-2"
      />
      <NSLabel
        text="演示如何在 NativeScript 中创建列表页面"
        class="text-sm text-muted-foreground mb-4"
        textWrap="true"
      />

      <!-- 列表项容器 -->
      <StackLayout
        class="bg-card rounded-lg"
        style="androidElevation: 2;"
      >
        <!--
          关键点：
          - v-for 遍历列表
          - :class 动态添加样式
          - @tap 绑定点击事件
        -->
        <StackLayout
          v-for="(item, index) in items"
          :key="item.id"
        >
          <!--
            GridLayout 布局说明：
            - columns="auto, *, auto, auto"
              - 第1列(auto): 图标，宽度自适应
              - 第2列(*): 文本内容，填充剩余空间
              - 第3列(auto): 徽章，宽度自适应
              - 第4列(auto): 箭头，宽度自适应
            - rows="auto" 表示高度自适应内容
          -->
          <GridLayout
            columns="auto, *, auto, auto"
            class="p-4"
            rows="auto"
            @tap="handleItemTap(item)"
          >
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

            <!-- 徽章 -->
            <StackLayout
              v-if="item.badge"
              col="2"
              class="bg-destructive rounded-full px-2 py-1 mr-2"
              verticalAlignment="center"
            >
              <NSLabel
                :text="item.badge"
                class="text-xs text-white font-bold"
              />
            </StackLayout>

            <!-- 右箭头 -->
            <Label
              v-if="item.showChevron"
              text="&#xf054;"
              :col="item.badge ? '3' : '2'"
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

      <!-- 空状态示例 -->
      <StackLayout
        v-if="items.length === 0"
        class="items-center justify-center py-12"
      >
        <Label
          text="&#xf1c0;"
          class="fas text-6xl text-muted-foreground mb-4"
        />
        <NSLabel
          text="暂无数据"
          class="text-lg text-muted-foreground"
        />
      </StackLayout>

      <!-- 提示信息 -->
      <StackLayout class="bg-card p-4 rounded-lg mt-4" style="androidElevation: 1;">
        <NSLabel
          text="💡 提示：这是一个列表页面模板，展示了 NativeScript 中创建列表的最佳实践。"
          class="text-sm text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/**
 * NativeScript 样式注意事项：
 * - 不支持所有 CSS 属性（如 display: flex, gap 等）
 * - 优先使用 Tailwind 类名
 * - 特殊需求才使用 <style> 标签
 * - iOS 使用 class="shadow-lg"
 * - Android 使用 style="androidElevation: 2;"
 */
</style>
