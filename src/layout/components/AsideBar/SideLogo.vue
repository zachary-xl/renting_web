<template>
  <div class="logo-container">
    <router-link class="logo-container-link" to="/">
      <el-image :src="logo" alt="logo" class="logo-container-link-img" fit="contain" />
      <h1 :style="style" class="logo-container-link-title">{{ configSource.projectName }}</h1>
    </router-link>
  </div>
</template>

<script lang="ts" name="SideLogo" setup>
import { computed } from "vue";
import { useSettingStoreToRefs } from "@/hooks";
import { configSource } from "@/config";

const { isExpand } = useSettingStoreToRefs();
const logo = computed(() => new URL("@/assets/images/icons/logo.png", import.meta.url).href);
const style = computed(() => {
  return {
    "text-indent": isExpand ? "0" : "-9999px",
    "padding-left": isExpand ? "12px" : "0"
  };
});
</script>

<style lang="scss" scoped>
.logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  &-link {
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 100%;

    &-img {
      display: inline-block;
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }

    &-title {
      line-height: 50px;
      font-weight: 600;
      font-size: 14px;
      display: inline-block;
      color: #fff;
      vertical-align: middle;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }
}
</style>
