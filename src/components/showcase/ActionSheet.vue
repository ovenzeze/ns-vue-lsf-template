<template>
  <StackLayout class="p-4 bg-card" @layout="onLayout">
    <Label :text="title" class="text-xl font-bold mb-4" />
    <ScrollView height="200">
      <StackLayout>
        <StackLayout v-for="item in items" :key="item.text" class="p-4 mb-2 bg-muted rounded-lg" @tap="onItemTap(item)">
          <Label :text="item.text" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { CoreTypes, Utils } from '@nativescript/core';

const props = defineProps({
  title: {
    type: String,
    default: 'Choose an Action',
  },
  items: {
    type: Array,
    default: () => [
      { text: 'Take Photo' },
      { text: 'Choose from Library' },
      { text: 'Choose File' },
    ],
  },
});

const onItemTap = (item: any) => {
  console.log(`Tapped: ${item.text}`);
};

const onLayout = (args: any) => {
  if (args.object.ios) {
    args.object.ios.layer.mask = null;
    const shapeLayer = CAShapeLayer.layer();
    const path = UIBezierPath.bezierPathWithRoundedRectByRoundingCornersCornerRadii(
      args.object.ios.bounds,
      UIRectCorner.TopLeft | UIRectCorner.TopRight,
      { width: 20, height: 20 }
    );
    shapeLayer.path = path.CGPath;
    args.object.ios.layer.mask = shapeLayer;
  }
};
</script>
