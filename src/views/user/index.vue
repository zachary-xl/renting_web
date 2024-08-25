<template>
  <div class="app-container">
    <el-form ref="formHeaderRef" :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="用户名" property="username">
        <el-input v-model="queryParams.username" class="input rounded" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="微信id" property="code">
        <el-input v-model="queryParams.code" class="input rounded" placeholder="请输入微信id" clearable />
      </el-form-item>
      <el-form-item label="创建时间" property="datePickerValue">
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
        <el-button text bg class="h-[30px]" @click="resetHeaderForm">
          <el-icon class="mr-2">
            <RefreshLeft />
          </el-icon>
          重置
        </el-button>
        <el-button type="primary" class="h-[30px]" @click="submitHeaderForm">
          <el-icon class="mr-2">
            <Search />
          </el-icon>
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <div class="line"></div>
    <el-table :data="tableData" class="w-full" header-cell-class-name="table-header">
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
          <el-button
            type="primary"
            link
          >
            提现
          </el-button>
          <el-button
            type="primary"
            link
          >
            充值
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      v-model:page="paginationParams.currentPage"
      v-model:limit="paginationParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { getUserListAPI } from "@/service/user";
import { dateTimeFormat } from "@/utils";
import { TUserList, TUserListParams } from "@/views/user/types";
import type { FormInstance } from "@/views/login/types";

const formHeaderRef = ref<FormInstance>();
const total = ref(10);
const datePickerValue = ref([]);
const paginationParams = reactive({
  noPage: "true",
  currentPage: 1,
  pageSize: 10
});
const queryParams = reactive<Partial<TUserListParams>>({
  search: "",
  nickname: "",
  username: "",
  phone: "",
  email: "",
  code: "",
  createdAtGte: undefined,
  createdAtLte: undefined
});
const tableData = ref<TUserList[]>([]);
const submitHeaderForm = () => {
  console.log(formHeaderRef.value);
  console.log(queryParams);
  getList();
};
const resetHeaderForm = () => {
  formHeaderRef.value?.resetFields();
};

const getList = (queryParams: Partial<TUserListParams> = {}) => {
  getUserListAPI({ ...paginationParams, ...queryParams }).then(res => {
    console.log(res);
    const data = res.data;
    tableData.value = data.list;
    total.value = data.total;
  });
};
const onHandleDatePicker = (date) => {
  if (date) {
    queryParams.createdAtGte = dayjs(date[0]).valueOf() as undefined;
    queryParams.createdAtLte = dayjs(date[1]).valueOf() as undefined;
  } else {
    queryParams.createdAtGte = undefined;
    queryParams.createdAtLte = undefined;
  }
};
onMounted(() => {
  getList();
});
</script>
<style scoped lang="scss">
::v-deep .el-button {
  height: 30px;
  font-size: 12px;
}

::v-deep .el-input {
  .el-input__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}

::v-deep .el-date-editor {
  background-color: rgba(247, 248, 250, 1);
  color: rgba(136, 136, 136, 1);
  width: 220px;
  height: 30px;
  box-shadow: none;
}

::v-deep .table-header {
  .cell {
    font-weight: bolder !important;
    white-space: nowrap !important;
  }
}
</style>
