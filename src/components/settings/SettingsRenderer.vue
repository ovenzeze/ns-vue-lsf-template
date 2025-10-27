<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { useSettings } from '../../composables/useSettings';
import { type SettingGroup, type SettingItem } from '../../config/settings';
import NSSwitch from '../ui/NSSwitch.vue';
import NSLabel from '../ui/NSLabel.vue';
import { useDialog } from '../../composables/useDialog';

/**
 * 设置渲染器组件
 *
 * 通用的设置页面渲染组件，根据配置自动生成 UI
 * 支持的设置类型：
 * - switch: 开关设置
 * - select: 选择设置（点击显示选项对话框）
 * - link: 链接设置（点击触发 onTap 回调）
 * - button: 按钮设置（点击触发 onTap 回调）
 *
 * 使用方式：
 * ```vue
 * <SettingsRenderer :groups="settingsConfig" />
 * ```
 */

interface Props {
  groups: SettingGroup[];
}

const props = defineProps<Props>();
const { getSetting } = useSettings();
const { showActionDialog } = useDialog();

// 为每个设置项创建响应式引用
const settingRefs = computed(() => {
  const refs: Record<string, any> = {};
  for (const group of props.groups) {
    for (const item of group.items) {
      if (item.default !== undefined &&
          (item.type === 'switch' || item.type === 'select')) {
        refs[item.id] = getSetting(item.id, item.default);
      }
    }
  }
  return refs;
});

/**
 * 处理设置变化
 */
async function handleSettingChange(item: SettingItem, value: any) {
  if (item.onChange) {
    try {
      await item.onChange(value);
    } catch (error) {
      console.error(`[SettingsRenderer] Error in onChange for ${item.id}:`, error);
    }
  }
}

/**
 * 处理点击事件
 */
async function handleTap(item: SettingItem) {
  if (item.onTap) {
    try {
      await item.onTap();
    } catch (error) {
      console.error(`[SettingsRenderer] Error in onTap for ${item.id}:`, error);
    }
  }
}

/**
 * 处理 Select 类型设置项的点击
 */
async function handleSelectTap(item: SettingItem) {
  if (!item.options || item.options.length === 0) {
    console.warn(`[SettingsRenderer] No options for select item: ${item.id}`);
    return;
  }

  const currentValue = settingRefs.value[item.id]?.value || item.default;
  const actions = item.options.map(option => option.label);

  try {
    const result = await showActionDialog({
      title: item.title,
      message: item.description,
      actions,
      cancelButtonText: '取消',
    });

    if (result !== '取消') {
      const selectedOption = item.options.find(opt => opt.label === result);
      if (selectedOption && settingRefs.value[item.id]) {
        settingRefs.value[item.id].value = selectedOption.value;
        await handleSettingChange(item, selectedOption.value);
      }
    }
  } catch (error) {
    console.error(`[SettingsRenderer] Error showing select dialog:`, error);
  }
}
</script>

<template>
  <ScrollView class="bg-background">
    <StackLayout class="p-4">
      <!-- 设置分组 -->
      <StackLayout
        v-for="group in groups"
        :key="group.id"
        class="mb-6"
      >
        <!-- 分组标题 -->
        <GridLayout columns="auto, *" class="mb-3">
          <Label
            v-if="group.icon"
            :text="group.icon"
            col="0"
            class="fas text-lg text-primary mr-2"
          />
          <NSLabel
            :text="group.title"
            :col="group.icon ? '1' : '0'"
            :colSpan="group.icon ? '1' : '2'"
            class="text-lg font-semibold"
          />
        </GridLayout>

        <!-- 设置项卡片 -->
        <StackLayout
          class="bg-card rounded-lg"
          style="androidElevation: 2;"
        >
          <StackLayout
            v-for="(item, index) in group.items"
            :key="item.id"
            class="p-4"
            :class="{ 'border-t border-border': index > 0 }"
          >
            <!-- Switch 类型 -->
            <GridLayout
              v-if="item.type === 'switch'"
              columns="auto, *, auto"
            >
              <Label
                v-if="item.icon"
                :text="item.icon"
                col="0"
                class="fas text-lg text-muted-foreground mr-3"
                verticalAlignment="center"
              />
              <StackLayout :col="item.icon ? '1' : '0'" verticalAlignment="center">
                <NSLabel :text="item.title" class="font-medium" />
                <NSLabel
                  v-if="item.description"
                  :text="item.description"
                  class="text-sm text-muted-foreground mt-1"
                  textWrap="true"
                />
              </StackLayout>
              <NSSwitch
                :col="item.icon ? '2' : '1'"
                v-model="settingRefs[item.id].value"
                @checkedChange="handleSettingChange(item, $event)"
              />
            </GridLayout>

            <!-- Select 类型 -->
            <GridLayout
              v-else-if="item.type === 'select'"
              columns="auto, *, auto"
              @tap="handleSelectTap(item)"
            >
              <Label
                v-if="item.icon"
                :text="item.icon"
                col="0"
                class="fas text-lg text-muted-foreground mr-3"
                verticalAlignment="center"
              />
              <StackLayout :col="item.icon ? '1' : '0'" verticalAlignment="center">
                <NSLabel :text="item.title" class="font-medium" />
                <NSLabel
                  v-if="item.description"
                  :text="item.description"
                  class="text-sm text-muted-foreground mt-1"
                  textWrap="true"
                />
              </StackLayout>
              <StackLayout :col="item.icon ? '2' : '1'" orientation="horizontal" verticalAlignment="center">
                <NSLabel
                  :text="item.options?.find(opt => opt.value === (settingRefs[item.id]?.value || item.default))?.label || ''"
                  class="text-primary mr-2"
                />
                <Label
                  text="&#xf054;"
                  class="fas text-xs text-muted-foreground"
                />
              </StackLayout>
            </GridLayout>

            <!-- Link 类型 -->
            <GridLayout
              v-else-if="item.type === 'link'"
              columns="auto, *, auto"
              @tap="handleTap(item)"
            >
              <Label
                v-if="item.icon"
                :text="item.icon"
                col="0"
                class="fas text-lg text-muted-foreground mr-3"
                verticalAlignment="center"
              />
              <StackLayout :col="item.icon ? '1' : '0'" verticalAlignment="center">
                <NSLabel :text="item.title" class="font-medium" />
                <NSLabel
                  v-if="item.description"
                  :text="item.description"
                  class="text-sm text-muted-foreground mt-1"
                  textWrap="true"
                />
              </StackLayout>
              <Label
                :col="item.icon ? '2' : '1'"
                text="&#xf054;"
                class="fas text-sm text-muted-foreground"
                verticalAlignment="center"
              />
            </GridLayout>

            <!-- Button 类型 -->
            <GridLayout
              v-else-if="item.type === 'button'"
              columns="auto, *"
              @tap="handleTap(item)"
            >
              <Label
                v-if="item.icon"
                :text="item.icon"
                col="0"
                class="fas text-lg text-primary mr-3"
                verticalAlignment="center"
              />
              <StackLayout :col="item.icon ? '1' : '0'" verticalAlignment="center">
                <NSLabel :text="item.title" class="font-medium text-primary" />
                <NSLabel
                  v-if="item.description"
                  :text="item.description"
                  class="text-sm text-muted-foreground mt-1"
                  textWrap="true"
                />
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/**
 * NativeScript 样式注意事项：
 * - 优先使用 Tailwind 类名
 * - 不支持所有 CSS 属性
 * - 某些属性需要使用特定格式（如 androidElevation）
 */
</style>
