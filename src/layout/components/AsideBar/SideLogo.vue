<template>
  <div class="logo-container">
    <router-link to="/" class="logo-container-link">
      <el-image :src="logo" fit="contain" alt="logo" class="logo-container-link-img" />
      <h1 class="logo-container-link-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script name="SideLogo" lang="ts" setup>
import {computed} from "vue"
const logo = computed(() => new URL("@/assets/images/icons/logo.png", import.meta.url).href);
const title = "";
</script>

<style scoped lang="scss">
.logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  &-link {
    width: 100%;
    height: 100%;

    &-img {
      width: 30px;
      height: 30px;
      margin-right: 12px;
      display: inline-block;
      vertical-align: middle;
    }

    &-title {
      line-height: 50px;
      font-weight: 600;
      font-size: 16px;
      display: inline-block;
      color: #fff;
      vertical-align: middle;
    }
  }
}
</style>
