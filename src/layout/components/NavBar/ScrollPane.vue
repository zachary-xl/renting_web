<template>
  <el-scrollbar ref="scrollBarRef" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>
<script lang="ts" name="ScrollPane" setup>
import type { WheelEventCustom } from "../types";
import { ref } from "vue";
import type { ElScrollbar } from "element-plus/lib";

const scrollBarRef = ref<InstanceType<typeof ElScrollbar> | null>(null);
const handleScroll = (e: WheelEventCustom) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  let scrollLeft = scrollBarRef.value?.wrapRef.scrollLeft;
  scrollLeft += eventDelta / 8;
  scrollBarRef.value?.setScrollLeft(scrollLeft);
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0;
  }

  :deep(.el-scrollbar__wrap) {
    height: 100%;
  }
}
</style>
