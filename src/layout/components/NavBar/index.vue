<template>
  <div
    :style="{ 'padding-left': settingStore[GET_IS_EXPAND_WIDTH] + 'px', position: settingStore[GET_IS_FIXED_HEADER_POSITION] }"
    class="page w-full"
  >
    <el-header class="flex w-full items-center justify-between bg-white" style="box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08); height: 50px">
      <div class="cursor-pointer">
        <el-icon size="20" @click="settingStore[TOGGlE_EXPAND_ACTION]">
          <component :is="isExpand ? Expand : Fold" />
        </el-icon>
      </div>
      <div class="flex items-center">
        <i
          :class="['iconfont', 'text-2xl', 'cursor-pointer', 'pr-3', settingStore[GET_IS_FULLSCREEN]]"
          @click="settingStore[TOGGlE_FULLSCREEN_ACTION]"
        />
        <strong class="pr-5">管理员</strong>
        <el-dropdown @command="onHandleCommand" class="right-menu-item hover-effect" trigger="click">
          <el-avatar :size="36" :src="getAvatar(avatar)" shape="square" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <TagsView />
  </div>
</template>

<script lang="ts" name="NavBar" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { Fold, Expand } from "@element-plus/icons-vue";
import TagsView from "./TagsView.vue";
import { useSettingStoreToRefs, useUserStoreToRefs } from "@/hooks";
import {
  GET_IS_EXPAND_WIDTH,
  GET_IS_FULLSCREEN,
  GET_IS_FIXED_HEADER_POSITION,
  TOGGlE_EXPAND_ACTION,
  TOGGlE_FULLSCREEN_ACTION
} from "@/model";
import { getAssets } from "@/utils";
const router = useRouter();
const { userStore } = useUserStoreToRefs();
const { settingStore, isExpand } = useSettingStoreToRefs();
const avatar = computed(() => getAssets("images", "icons/avatar.gif"));

const getAvatar = (source: string | undefined) => {
  return source || avatar.value;
};

const logout = () => {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      userStore.logoutAction().then(() => {
        location.href = "/index";
        router.replace("/login");
      });
    })
    .catch(() => {});
};

const onHandleCommand = command => {
  switch (command) {
    case "logout":
      logout();
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.page {
  z-index: 1;
  transition: all 0.28s;
  top: 0;
  right: 0;
}
.right-menu-item {
  display: inline-block;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;

  &.hover-effect {
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
