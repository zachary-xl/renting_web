<template>
  <div class="tags-view-container">
    <ScrollPanel ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link to="/" v-for="item of 10">
        <button class="tags-view-item">
          首页
          <span class="close"></span>
        </button>
      </router-link>
      <!--      <router-link-->
      <!--        v-for="tag in visitedViews"-->
      <!--        :key="tag.path"-->
      <!--        :class="isActive(tag) ? 'active' : ''"-->
      <!--        :data-path="tag.path"-->
      <!--        :style="activeStyle(tag)"-->
      <!--        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"-->
      <!--        class="tags-view-item"-->
      <!--        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"-->
      <!--        @contextmenu.prevent="openMenu(tag, $event)"-->
      <!--      >-->
      <!--        {{ tag.title }}-->
      <!--        <span v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">-->
      <!--          <close class="el-icon-close" style="width: 1em; height: 1em;vertical-align: middle;" />-->
      <!--        </span>-->
      <!--      </router-link>-->
    </ScrollPanel>
  </div>
</template>

<script lang="ts" name="TagsView" setup>
import ScrollPanel from "./ScrollPane.vue";

const handleScroll = (e) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    .close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
    }
  }
}
</style>
