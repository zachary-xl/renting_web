<template>
  <el-form v-show="showSearch" ref="queryRef" :inline="true" :model="queryParams">
    <el-form-item label="菜单名称" prop="menuName">
      <el-input v-model="queryParams.menuName" clearable placeholder="请输入菜单名称" @keyup.enter="handleQuery" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="queryParams.status" clearable placeholder="菜单状态">
        <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" type="primary" @click="handleQuery">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" name="QueryForm" setup>
import { reactive } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";

const showSearch = ref(true);
const sys_normal_disable = ref([]);
const queryParams = reactive({
  menuName: "",
  status: ""
});

const handleQuery = () => {};

function resetQuery() {}
</script>

<style scoped></style>
