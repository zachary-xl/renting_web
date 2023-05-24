<template>
  <el-header
    :style="{'padding-left':settingStore[GET_IS_EXPAND_WIDTH] + 'px', position:settingStore[GET_IS_FIXED_HEADER_POSITION]}"
    class="page flex justify-between items-center bg-white w-full">
    <div class="pl-4 cursor-pointer">
      <el-icon size="20" @click="settingStore[TOGGlE_EXPAND_ACTION]">
        <component :is="isExpand ? Expand : Fold" />
      </el-icon>
    </div>
    <div class="flex items-center">
      <i :class="['iconfont', 'text-2xl', 'cursor-pointer', 'pr-3', settingStore[GET_IS_FULLSCREEN]]"
         @click="settingStore[TOGGlE_FULLSCREEN_ACTION]" />
      <strong class="pr-5">{{ user.username }}</strong>
      <el-avatar :size="36" :src="getAvatar(user.avatar)" shape="square" />
    </div>
  </el-header>
</template>

<script lang="ts" name="NavBar" setup>
import { computed } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import { useSettingStoreToRefs, useUserStoreToRefs } from "@/hooks";
import {
  GET_IS_EXPAND_WIDTH,
  GET_IS_FULLSCREEN,
  GET_IS_FIXED_HEADER_POSITION,
  TOGGlE_EXPAND_ACTION,
  TOGGlE_FULLSCREEN_ACTION
} from "@/model";

const { user } = useUserStoreToRefs();
const { settingStore, isExpand } = useSettingStoreToRefs();
const avatar = computed(() => new URL("@/assets/images/icons/avatar.gif", import.meta.url).href);
const getAvatar = (source: string) => {
  return source || avatar.value;
};
</script>

<style lang="scss" scoped>
.page {
  z-index: 1;
  transition: all .28s;
  top: 0;
  right: 0;
}
</style>
