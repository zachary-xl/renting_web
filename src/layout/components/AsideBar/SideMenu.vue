<template>
  <el-menu
    :collapse="!isExpand"
    :default-active="tagsViewStore[GET_CURRENT_TAG]"
    :collapse-transition="false"
    active-text-color="#409eff"
    background-color="#304156"
    class="menu-container"
    text-color="#bfcbd9"
    mode="vertical"
    unique-opened
    router
  >
    <SideBarItem
      v-for="(route, index) of menusList"
      :key="route.path + index"
      :item="route" />
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

const unwatch = watch(() => route, (newVal) => {
  console.log(newVal, "watch");
  console.log(tagsViewStore[GET_CURRENT_TAG]);
}, {
  deep: true,
  flush: "pre",
  immediate: true
});

onUnmounted(() => {
  unwatch();
});
</script>

<style lang="scss" scoped>
:root {
  --bg: #fff;
}

.menu-container {
  border: none;
}
</style>
