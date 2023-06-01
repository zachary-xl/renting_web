<template>
  <el-main
    :style="{'padding-left':settingStore[GET_IS_EXPAND_WIDTH] + 'px', 'padding-top':settingStore[GET_IS_FIXED_HEADER_TOP]}"
    class="page">
    <section class="app-main  w-full h-full">
      <RouterView>
        <template v-slot="{ Component, route }">
          <transition mode="out-in" name="fade-transform">
            <component :is="Component" :key="route.name" />
          </transition>
        </template>
      </RouterView>
    </section>
  </el-main>
</template>

<script lang="ts" name="MainPage" setup>
import { useSettingStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH, GET_IS_FIXED_HEADER_TOP } from "@/model";

const { settingStore } = useSettingStoreToRefs();
</script>

<style lang="scss" scoped>
.page {
  transition: padding .28s;

  .app-main {
    min-height: calc(100vh - 84px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
}

.fade-transform-move,
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-leave-active {
  position: absolute;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
