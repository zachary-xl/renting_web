<template>
  <div :style="{'padding-left':settingStore[GET_IS_EXPAND_WIDTH] + 'px', 'padding-top':settingStore[GET_IS_FIXED_HEADER_TOP]}"
       class="page">
    <el-main class="w-full h-full">
      <RouterView>
        <template v-slot="{ Component }">
          <component :is="Component" />
        </template>
      </RouterView>
    </el-main>
  </div>
</template>

<script lang="ts" name="MainPage" setup>
import { useSettingStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH, GET_IS_FIXED_HEADER_TOP } from "@/model";

const { settingStore } = useSettingStoreToRefs();
</script>

<style lang="scss" scoped>
.page {
  transition: padding .28s;
}
</style>
