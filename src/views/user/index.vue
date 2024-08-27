<template>
  <div class="app-container">
    <el-form ref="formHeaderRef" :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="queryParams.username" @keydown.enter="getList" class="input rounded" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="queryParams.code" @keydown.enter="getList" class="input rounded" placeholder="请输入手机号" clearable />
      </el-form-item>
      <el-form-item label="创建时间" prop="datePickerValue">
        <el-date-picker
          v-model="datePickerValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="small"
          @change="onHandleDatePicker"
        />
      </el-form-item>
      <el-form-item>
        <el-button text bg class="h-[30px]" @click="resetHeaderForm(formHeaderRef)">
          <el-icon class="mr-2">
            <RefreshLeft />
          </el-icon>
          重置
        </el-button>
        <el-button type="primary" class="h-[30px]" @click="getList">
          <el-icon class="mr-2">
            <Search />
          </el-icon>
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <div class="line"></div>
    <el-table :data="tableData" v-loading="loading" class="w-full" header-cell-class-name="table-header">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column label="用户名" align="center" prop="username" />
      <el-table-column label="微信id" align="center" prop="wxId" />
      <el-table-column label="余额" align="center" prop="balance" />
      <el-table-column label="充电桩数量" align="center" prop="chargeStationNum" />
      <el-table-column label="注册时间" align="center" prop="createdAt">
        <template #default="{ row }">
          <span>{{ dateTimeFormat((row as TUserList).createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button type="primary" link> 提现 </el-button>
          <el-button type="primary" link> 充值 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="relative float-right"
      v-model:current-page="paginationParams.currentPage"
      v-model:page-size="paginationParams.pageSize"
      :page-sizes="[10, 30, 50, 100]"
      background
      :total="5"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="val => (paginationParams.pageSize = val)"
      @current-change="val => (paginationParams.currentPage = val)"
      @change="getList"
    />
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { getUserListAPI } from "@/service/user";
import { dateTimeFormat, excludingFakeObject } from "@/utils";
import type { TUserList, TUserListParams } from "@/views/user/types";
import type { FormInstance } from "element-plus";

const formHeaderRef = ref<FormInstance>();
const total = ref(10);
const loading = ref(true);
const datePickerValue = ref([]);
const paginationParams = reactive({
  currentPage: 1,
  pageSize: 10
});
const queryParams = reactive<Partial<TUserListParams>>({
  username: "",
  phone: "",
  createdAtGte: undefined,
  createdAtLte: undefined
});
const tableData = ref<TUserList[]>([]);
const resetHeaderForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  datePickerValue.value = [];
  queryParams.createdAtGte = undefined;
  queryParams.createdAtLte = undefined;
  formEl.resetFields();
};
const getList = () => {
  loading.value = true;
  getUserListAPI({ ...paginationParams, ...excludingFakeObject(queryParams) }).then(res => {
    const data = res.data;
    tableData.value = data.list;
    total.value = data.total;
    loading.value = false;
  });
};
const onHandleDatePicker = date => {
  if (date) {
    queryParams.createdAtGte = dayjs(date[0]).valueOf() as undefined;
    queryParams.createdAtLte = dayjs(date[1]).valueOf() as undefined;
  } else {
    queryParams.createdAtGte = undefined;
    queryParams.createdAtLte = undefined;
  }
};
getList();
</script>
<style scoped lang="scss">
:deep(.el-button) {
  height: 30px;
  font-size: 12px;
}
:deep(.el-select) {
  width: 100px !important;
}
:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}

:deep(.el-date-editor) {
  background-color: rgba(247, 248, 250, 1);
  color: rgba(136, 136, 136, 1);
  width: 220px;
  height: 30px;
  box-shadow: none;
}

:deep(.table-header) {
  .cell {
    font-weight: bolder !important;
    white-space: nowrap !important;
  }
}
</style>
