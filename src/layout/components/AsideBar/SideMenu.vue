<template>
  <el-menu
    :collapse="!isExpand"
    :default-active="tagsViewStore[GET_CURRENT_TAG]"
    :collapse-transition="false"
    active-text-color="#106bfe"
    background-color="#fff"
    class="menu-container"
    text-color="#000"
    mode="vertical"
    unique-opened
    router
  >
    <SideBarItem v-for="(route, index) of menusList" :key="route.path + index" :item="route" />
  </el-menu>
</template>

<script lang="ts" name="MenuList" setup>
import { onUnmounted } from "vue";
import { useRoute } from "vue-router";
import SideBarItem from "./SideBarItem.vue";
import { useSettingStoreToRefs, useAuthStoreToRefs } from "@/hooks";
import { useTagsViewStoreToRefs } from "@/hooks";
import { GET_CURRENT_TAG } from "@/model";

const route = useRoute();
const { isExpand } = useSettingStoreToRefs();
const { menusList } = useAuthStoreToRefs();
const { tagsViewStore } = useTagsViewStoreToRefs();

const unwatch = watch(
  () => route,
  (newVal) => {
    // console.info(tagsViewStore[GET_CURRENT_TAG]);
  },
  {
    deep: true,
    flush: "pre",
    immediate: true
  }
);

onUnmounted(() => {
  unwatch();
});
</script>

<style lang="scss" scoped>
.menu-container {
  border: none;
}
</style>
