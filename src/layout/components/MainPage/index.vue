<template>
  <el-main :style="{'padding-left':appStore[GET_IS_EXPAND_WIDTH] + 20 + 'px'}" class="page fixed w-full h-full">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </el-main>
</template>

<script lang="ts" name="MainPage" setup>
import { useAppStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH } from "@/model";

const { appStore } = useAppStoreToRefs();
</script>

<style lang="scss" scoped>
.page {
  padding-top: 80px;
  transition: all .3s;
}
</style>
