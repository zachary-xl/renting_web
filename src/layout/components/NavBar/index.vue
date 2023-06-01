<template>
  <div :style="{'padding-left':settingStore[GET_IS_EXPAND_WIDTH] + 'px', position:settingStore[GET_IS_FIXED_HEADER_POSITION]}"
       class="w-full page">
    <el-header
      class=" w-full bg-white flex justify-between items-center"
      style="box-shadow: 0 1px 4px rgba(0,21,41,.08);height: 50px;">
      <div class="cursor-pointer">
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
    <TagsView />
  </div>

</template>

<script lang="ts" name="NavBar" setup>
import { computed } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import TagsView from "./TagsView.vue";
import { useSettingStoreToRefs, useAuthStoreToRefs } from "@/hooks";
import {
  GET_IS_EXPAND_WIDTH,
  GET_IS_FULLSCREEN,
  GET_IS_FIXED_HEADER_POSITION,
  TOGGlE_EXPAND_ACTION,
  TOGGlE_FULLSCREEN_ACTION
} from "@/model";
import { getAssets } from "@/utils";

const { user } = useAuthStoreToRefs();
const { settingStore, isExpand } = useSettingStoreToRefs();
const avatar = computed(() => getAssets("images", "icons/avatar.gif"));

const getAvatar = (source: string | undefined) => {
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
