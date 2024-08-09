<template>
  <div class="wrapper">
    <button @click="settingStore[TOGGLE_THEME_ACTION](isThemed)">切换</button>
  </div>
</template>

<script lang="ts" name="Mains" setup>
import { useSettingStoreToRefs } from "@/hooks";
import { TOGGLE_THEME_ACTION } from "@/model";

const { settingStore, isThemed } = useSettingStoreToRefs();
</script>

<style scoped>
.wrapper {
}
</style>
