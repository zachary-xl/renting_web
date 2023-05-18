<template>
  <el-header :style="{'padding-left':appStore[GET_IS_EXPAND_WIDTH] + 'px'}"
             class="page flex justify-between items-center bg-white w-full">
    <div class="pl-4 cursor-pointer">
      <el-icon size="20" @click="appStore[TOGGlE_EXPAND_ACTION]">
        <component :is="isExpand ? Expand : Fold" />
      </el-icon>
    </div>
    <div class="flex items-center">
      <i :class="['iconfont', 'text-2xl', 'cursor-pointer', 'pr-3', appStore[GET_IS_FULLSCREEN]]"
         @click="appStore[TOGGlE_FULLSCREEN_ACTION]" title="全屏"/>
      <strong class="pr-5">超级管理员</strong>
      <el-avatar :icon="UserFilled" :size="36" shape="square" />
    </div>
  </el-header>
</template>

<script lang="ts" name="NavBar" setup>
import { Fold, Expand, UserFilled } from "@element-plus/icons-vue";
import { useAppStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH, GET_IS_FULLSCREEN, TOGGlE_EXPAND_ACTION, TOGGlE_FULLSCREEN_ACTION } from "@/model";

const { appStore, isExpand } = useAppStoreToRefs();

</script>

<style lang="scss" scoped>
.page {
  z-index: 1;
  transition: all .3s;
}
</style>
